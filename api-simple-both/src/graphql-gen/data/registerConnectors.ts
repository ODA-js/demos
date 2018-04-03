
import User from './User/adapter/connector';
import { UserConnector } from './User/adapter/interface';

import ToDoItem from './ToDoItem/adapter/connector';
import { ToDoItemConnector } from './ToDoItem/adapter/interface';


import { acl, ACLCheck, SecurityContext } from 'oda-api-graphql';

export default class RegisterConnectors {
  public get User(): UserConnector {
    return this.InitUser();
  }

  public InitUser(): UserConnector {
    if (!this._User) {
      this._User = new User({ sequelize: this.sequelize, connectors: this, securityContext: this.securityContext });
    }
    return this._User;
  }

  public get ToDoItem(): ToDoItemConnector {
    return this.InitToDoItem();
  }

  public InitToDoItem(): ToDoItemConnector {
    if (!this._ToDoItem) {
      this._ToDoItem = new ToDoItem({ mongoose: this.mongoose, connectors: this, securityContext: this.securityContext });
    }
    return this._ToDoItem;
  }


  protected _User: UserConnector;
  protected _ToDoItem: ToDoItemConnector;

  public mongoose;
  public sequelize;
  public userGQL;
  public systemGQL;

  public securityContext: SecurityContext<RegisterConnectors>

  public initGQL({
    userGQL,
    systemGQL
  }: {
      userGQL?,
      systemGQL?,
    }) {
    this.userGQL = userGQL ? userGQL : this.userGQL;
    this.systemGQL = systemGQL ? systemGQL : this.systemGQL;
  }

  protected _defaultAccess(context, obj: {
    source?: any,
    payload?: any;
  }): object {
    let result = obj.source;
    return result;
  };

  protected _defaultCreate(context, obj: {
    source?: any,
    payload?: any;
  }): object {
    let result = obj.payload;
    return result;
  };

  constructor({
    user,
    owner,
    mongoose,
    sequelize,
    acls,
    userGroup,
    userGQL,
    systemGQL,
  }:
    {
      user?: any,
      owner?: any,
      mongoose?: any,
      sequelize?: any,
      acls?: {
        read?: acl.secureAny.Acls<ACLCheck>;
        update?: acl.secureAny.Acls<ACLCheck>;
        create?: acl.secureAny.Acls<ACLCheck>;
        remove?: acl.secureAny.Acls<ACLCheck>;
      }
      userGroup?: string;
      userGQL?,
      systemGQL?,
    }) {
    this.securityContext = acls && {
      user,
      group: userGroup,
      acls: {
        read: new acl.secureAny.Secure<ACLCheck>({
          acls: acls ? {
            "*": this._defaultAccess,
            ...acls.read
          } : undefined
        }),
        update: new acl.secureAny.Secure<ACLCheck>({
          acls: acls ? {
            "*": this._defaultAccess,
            ...acls.update
          } : undefined
        }),
        create: new acl.secureAny.Secure<ACLCheck>({
          acls: acls ? {
            "*": this._defaultCreate,
            ...acls.create
          } : undefined
        }),
        remove: new acl.secureAny.Secure<ACLCheck>({
          acls: acls ? {
            "*": this._defaultAccess,
            ...acls.remove
          } : undefined
        }),
      }
    }
    this.mongoose = mongoose;
    this.sequelize = sequelize;
    this.initGQL({ userGQL, systemGQL });
  }

  async syncDb(force: boolean = false) {
    this.InitUser();
    await this.sequelize.sync({force});
  }

  async close() {
    if (this.sequelize && typeof this.sequelize.close === 'function') {
      await this.sequelize.close();
    }
    if (this.mongoose && typeof this.mongoose.close === 'function') {
      await this.mongoose.close();
    }
  }
};
