import * as log4js from 'log4js';
let logger = log4js.getLogger('api:connector:ToDoItem');

import { MongooseApi } from 'oda-api-graphql-mongoose';
import { SecurityContext } from 'oda-api-graphql';
import ToDoItemSchema from './schema';
import RegisterConnectors from '../../registerConnectors';
import * as Dataloader from 'dataloader';

import { PartialToDoItem, ToDoItem as DTO } from '../types/model';
import { ToDoItemConnector } from './interface';

export default class ToDoItem
  extends MongooseApi<RegisterConnectors, PartialToDoItem>
  implements ToDoItemConnector {
  constructor({
    mongoose,
    connectors,
    securityContext,
  }: {
    mongoose: any;
    connectors: RegisterConnectors;
    securityContext: SecurityContext<RegisterConnectors>;
  }) {
    logger.trace('constructor');
    super({ name: 'ToDoItem', mongoose, connectors, securityContext });
    this.initSchema('ToDoItem', ToDoItemSchema());

    this.loaderKeys = {
      byId: 'id',
    };

    this.updaters = {
      byId: this.updateLoaders('byId'),
    };

    const byId = async keys => {
      let result = await this._getList({ filter: { id: { in: keys } } });
      let map = result.reduce((_map, item) => {
        _map[item.id] = item;
        return _map;
      }, {});
      return keys.map(id => map[id]);
    };

    this.loaders = {
      byId: new Dataloader(keys => byId(keys).then(this.updaters.byId), {
        cacheKeyFn: key => (typeof key !== 'object' ? key : key.toString()),
      }),
    };
  }

  public async create(payload: PartialToDoItem) {
    logger.trace('create');
    let entity = this.getPayload(payload);
    let result = await this.createSecure(entity);
    this.storeToCache([result]);
    return this.ensureId(result && result.toJSON ? result.toJSON() : result);
  }

  public async findOneByIdAndUpdate(id: string, payload: any) {
    logger.trace(`findOneByIdAndUpdate`);
    let entity = this.getPayload(payload, true);
    let result = await this.loaders.byId.load(id);
    if (result) {
      result = await this.updateSecure(result, entity);
      this.storeToCache([result]);
    }
    return this.ensureId(result && result.toJSON ? result.toJSON() : result);
  }

  public async findOneByIdAndRemove(id: string) {
    logger.trace(`findOneByIdAndRemove`);
    let result = await this.loaders.byId.load(id);
    if (result) {
      result = await this.removeSecure(result);
      this.storeToCache([result]);
    }
    return this.ensureId(result && result.toJSON ? result.toJSON() : result);
  }

  public async addToUser(args: { toDoItem?: string; user?: string }) {
    logger.trace(`addToUser`);
    let opposite = await this.connectors.User.findOneById(args.user);
    if (opposite) {
      await this.findOneByIdAndUpdate(args.toDoItem, {
        user: opposite.userName,
      });
    }
  }

  public async removeFromUser(args: { toDoItem?: string; user?: string }) {
    logger.trace(`removeFromUser`);
    await this.findOneByIdAndUpdate(args.toDoItem, { user: null });
  }

  public async findOneById(id?: string) {
    logger.trace(`findOneById with ${id} `);
    let result = await this.loaders.byId.load(id);
    return this.ensureId(result && result.toJSON ? result.toJSON() : result);
  }

  public getPayload(args: PartialToDoItem, update?: boolean): PartialToDoItem {
    let entity: any = {};
    if (args.id !== undefined) {
      entity.id = args.id;
    }
    if (args.name !== undefined) {
      entity.name = args.name;
    }
    if (args.description !== undefined) {
      entity.description = args.description;
    }
    if (args.done !== undefined) {
      entity.done = args.done;
    }
    if (args.location !== undefined) {
      entity.location = args.location;
    }
    if (args.file !== undefined) {
      entity.file = args.file;
    }
    if (args.dueToDate !== undefined) {
      entity.dueToDate = args.dueToDate;
    }
    if (args.published !== undefined) {
      entity.published = args.published;
    }
    if (args.user !== undefined) {
      entity.user = args.user;
    }
    if (args.updatedBy !== undefined) {
      entity.updatedBy = args.updatedBy;
    }
    if (args.updatedAt !== undefined) {
      entity.updatedAt = args.updatedAt;
    }
    if (update) {
      delete entity.id;
      delete entity._id;
    } else {
      if (entity.id) {
        entity._id = entity.id;
        delete entity.id;
      }
    }
    return entity;
  }

  public ensureId(obj) {
    let result = super.ensureId(obj);
    return new DTO(result);
  }
}
