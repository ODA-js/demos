
import * as log4js from 'log4js';
let logger = log4js.getLogger('api:connector:File');

import { MongooseApi } from 'oda-api-graphql-mongoose';
import { SecurityContext } from 'oda-api-graphql';
import FileSchema from './schema';
import RegisterConnectors from '../../registerConnectors';
import * as Dataloader from 'dataloader';

import { PartialFile } from '../types/model';
import { FileConnector } from './interface';

export default class File extends MongooseApi<RegisterConnectors, PartialFile> implements FileConnector {
  constructor(
    { mongoose, connectors, securityContext }:
      { mongoose: any, connectors: RegisterConnectors, securityContext: SecurityContext<RegisterConnectors> }
  ) {
    logger.trace('constructor');
    super({ name: 'File', mongoose, connectors, securityContext});
    this.initSchema('File', FileSchema());

    this.loaderKeys = {
      byId: 'id',
      byPath: 'path',
    };

    this.updaters = {
      byId: this.updateLoaders('byId'),
      byPath: this.updateLoaders('byPath'),
    };

    const byId = async (keys) => {
      let result = await this._getList({ filter: { id: { in: keys } } });
      let map = result.reduce((_map, item) => {
        _map[item.id] = item;
        return _map;
      }, {});
      return keys.map(id => map[id]);
    };

    const byPath = async (keys) => {
      let result = await this._getList({ filter: { path: { in: keys } } });
      let map = result.reduce((_map, item) => {
        _map[item.path] = item;
        return _map;
      }, {});
      return keys.map(id => map[id]);
    };

    this.loaders = {
      byId: new Dataloader(keys => byId(keys)
        .then(this.updaters.byId), {
          cacheKeyFn: key => typeof key !== 'object' ? key : key.toString(),
        }),
      byPath: new Dataloader(keys => byPath(keys)
        .then(this.updaters.byPath)),
    };
  }

  public async create(payload: PartialFile) {
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

  public async findOneByPathAndUpdate(path: string, payload: any) {
    logger.trace(`findOneByPathAndUpdate`);
    let entity = this.getPayload(payload, true);
    let result = await this.loaders.byPath.load(path);
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

  public async findOneByPathAndRemove(path: string) {
    logger.trace(`findOneByPathAndRemove`);
    let result = await this.loaders.byPath.load(path);
    if (result) {
      result = await this.removeSecure(result);
      this.storeToCache([result]);
      return this.ensureId((result && result.toJSON) ? result.toJSON() : result);
    } else {
      return result;
    }
  }


  public async addToUser(args: {
      file?: string,
      user?: string,
  }) {
    logger.trace(`addToUser`);
    let opposite = await this.connectors.User.findOneById(args.user);
    if (opposite) {
      await this.findOneByIdAndUpdate(args.file,
      { user: opposite.id });
    }
  }

  public async removeFromUser(args: {
      file?: string,
      user?: string,
  }) {
    logger.trace(`removeFromUser`);
    await this.findOneByIdAndUpdate(args.file, { user: null });
  }

  public async findOneById(id?: string) {
    logger.trace(`findOneById with ${id} `);
    let result = await this.loaders.byId.load(id);
    return this.ensureId((result && result.toJSON) ? result.toJSON() : result);
  }

  public async findOneByPath(path?: string) {
    logger.trace(`findOneByPath with ${path} `);
    let result = await this.loaders.byPath.load(path);
    return this.ensureId((result && result.toJSON) ? result.toJSON() : result);
  }

  public getPayload(args: PartialFile, update?: boolean): PartialFile {
    let entity: any = {};
      if (args.id !== undefined) {
        entity.id = args.id;
      }
      if (args.path !== undefined) {
        entity.path = args.path;
      }
      if (args.filename !== undefined) {
        entity.filename = args.filename;
      }
      if (args.mimetype !== undefined) {
        entity.mimetype = args.mimetype;
      }
      if (args.encoding !== undefined) {
        entity.encoding = args.encoding;
      }
      if (args.user !== undefined) {
        entity.user = args.user;
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
