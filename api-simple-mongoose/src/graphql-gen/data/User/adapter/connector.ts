
import * as log4js from 'log4js';
let logger = log4js.getLogger('api:connector:User');

import { MongooseApi } from 'oda-api-graphql-mongoose';
import { SecurityContext } from 'oda-api-graphql';
import UserSchema from './schema';
import RegisterConnectors from '../../registerConnectors';
import * as Dataloader from 'dataloader';

import { PartialUser } from '../types/model';
import { UserConnector } from './interface';

export default class User extends MongooseApi<RegisterConnectors, PartialUser> implements UserConnector {
  constructor(
    { mongoose, connectors, securityContext }:
      { mongoose: any, connectors: RegisterConnectors, securityContext: SecurityContext<RegisterConnectors> }
  ) {
    logger.trace('constructor');
    super({ name: 'User', mongoose, connectors, securityContext});
    this.initSchema('User', UserSchema());

    this.loaderKeys = {
      byId: 'id',
      byUserName: 'userName',
    };

    this.updaters = {
      byId: this.updateLoaders('byId'),
      byUserName: this.updateLoaders('byUserName'),
    };

    const byId = async (keys) => {
      let result = await this._getList({ filter: { id: { in: keys } } });
      let map = result.reduce((_map, item) => {
        _map[item.id] = item;
        return _map;
      }, {});
      return keys.map(id => map[id]);
    };

    const byUserName = async (keys) => {
      let result = await this._getList({ filter: { userName: { in: keys } } });
      let map = result.reduce((_map, item) => {
        _map[item.userName] = item;
        return _map;
      }, {});
      return keys.map(id => map[id]);
    };

    this.loaders = {
      byId: new Dataloader(keys => byId(keys)
        .then(this.updaters.byId), {
          cacheKeyFn: key => typeof key !== 'object' ? key : key.toString(),
        }),
      byUserName: new Dataloader(keys => byUserName(keys)
        .then(this.updaters.byUserName)),
    };
  }

  public async create(payload: PartialUser) {
    logger.trace('create');
    let entity = this.getPayload(payload);
    let result = await this.createSecure(entity);
    this.storeToCache([result]);
    return this.ensureId((result && result.toJSON) ? result.toJSON() : result);
  }

  public async findOneByIdAndUpdate(id: string, payload: any) {
    logger.trace(`findOneByIdAndUpdate`);
    let entity = this.getPayload(payload, true);
    let result = await this.loaders.byId.load(id);
    if (result) {
      result = await this.updateSecure(result, entity);
      this.storeToCache([result]);
      return this.ensureId((result && result.toJSON) ? result.toJSON() : result);
    } else {
      return result;
    }
  }

  public async findOneByUserNameAndUpdate(userName: string, payload: any) {
    logger.trace(`findOneByUserNameAndUpdate`);
    let entity = this.getPayload(payload, true);
    let result = await this.loaders.byUserName.load(userName);
    if (result) {
      result = await this.updateSecure(result, entity);
      this.storeToCache([result]);
      return this.ensureId((result && result.toJSON) ? result.toJSON() : result);
    } else {
      return result;
    }
  }



  public async findOneByIdAndRemove(id: string) {
    logger.trace(`findOneByIdAndRemove`);
    let result = await this.loaders.byId.load(id);
    if (result) {
      result = await this.removeSecure(result);
      this.storeToCache([result]);
      return this.ensureId((result && result.toJSON) ? result.toJSON() : result);
    } else {
      return result;
    }
  }

  public async findOneByUserNameAndRemove(userName: string) {
    logger.trace(`findOneByUserNameAndRemove`);
    let result = await this.loaders.byUserName.load(userName);
    if (result) {
      result = await this.removeSecure(result);
      this.storeToCache([result]);
      return this.ensureId((result && result.toJSON) ? result.toJSON() : result);
    } else {
      return result;
    }
  }


  public async addToTodos(args: {
      user?: string,
      toDoItem?: string,
  }) {
    logger.trace(`addToTodos`);
    let current = await this.findOneById(args.user);
    if (current) {
      await this.connectors.ToDoItem.findOneByIdAndUpdate(
        args.toDoItem,
        { user: current.userName });
    }
  }

  public async removeFromTodos(args: {
      user?: string,
      toDoItem?: string,
  }) {
    logger.trace(`removeFromTodos`);
    await this.connectors.ToDoItem.findOneByIdAndUpdate(args.toDoItem,
    { user: null });
  }

  public async addToFiles(args: {
      user?: string,
      file?: string,
  }) {
    logger.trace(`addToFiles`);
    let current = await this.findOneById(args.user);
    if (current) {
      await this.connectors.File.findOneByIdAndUpdate(
        args.file,
        { user: current.id });
    }
  }

  public async removeFromFiles(args: {
      user?: string,
      file?: string,
  }) {
    logger.trace(`removeFromFiles`);
    await this.connectors.File.findOneByIdAndUpdate(args.file,
    { user: null });
  }

  public async findOneById(id?: string) {
    logger.trace(`findOneById with ${id} `);
    let result = await this.loaders.byId.load(id);
    return this.ensureId((result && result.toJSON) ? result.toJSON() : result);
  }

  public async findOneByUserName(userName?: string) {
    logger.trace(`findOneByUserName with ${userName} `);
    let result = await this.loaders.byUserName.load(userName);
    return this.ensureId((result && result.toJSON) ? result.toJSON() : result);
  }

  public getPayload(args: PartialUser, update?: boolean): PartialUser {
    let entity: any = {};
      if (args.id !== undefined) {
        entity.id = args.id;
      }
      if (args.userName !== undefined) {
        entity.userName = args.userName;
      }
      if (args.password !== undefined) {
        entity.password = args.password;
      }
      if (args.isAdmin !== undefined) {
        entity.isAdmin = args.isAdmin;
      }
      if (args.isSystem !== undefined) {
        entity.isSystem = args.isSystem;
      }
      if (args.enabled !== undefined) {
        entity.enabled = args.enabled;
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
};
