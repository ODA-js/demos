
import User from './User/adapter/connector';
import { UserConnector } from './User/adapter/interface';

import ToDoItem from './ToDoItem/adapter/connector';
import { ToDoItemConnector } from './ToDoItem/adapter/interface';


import { acl, ACLCheck } from 'oda-api-graphql';

export default class RegisterConnectors {
  public get User(): UserConnector {
    return this.InitUser();
  }

  public InitUser(): UserConnector {
    if (!this._User) {
      this._User = new User({ mongoose: this.mongoose, connectors: this, user: this.user, owner: this.owner, acls: this.acls, userGroup: this.userGroup });
    }
    return this._User;
  }

  public get ToDoItem(): ToDoItemConnector {
    return this.InitToDoItem();
  }

  public InitToDoItem(): ToDoItemConnector {
    if (!this._ToDoItem) {
      this._ToDoItem = new ToDoItem({ mongoose: this.mongoose, connectors: this, user: this.user, owner: this.owner, acls: this.acls, userGroup: this.userGroup });
    }
    return this._ToDoItem;
  }


  protected _User: UserConnector;
  protected _ToDoItem: ToDoItemConnector;

  public mongoose;
  public sequelize;
  public user;
  public owner;
  public acls: acl.secureAny.ACLCRUD<ACLCheck>;
  public userGroup;
  public userGQL;
  public systemGQL;

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
    this.user = user;
    this.owner = owner;
    this.mongoose = mongoose;
    this.sequelize = sequelize;
    this.acls = {
      read: new acl.secureAny.Secure<ACLCheck>({ acls: acls ? acls.read: undefined }),
      update: new acl.secureAny.Secure<ACLCheck>({ acls: acls ? acls.update: undefined }),
      create: new acl.secureAny.Secure<ACLCheck>({ acls: acls ? acls.create: undefined }),
      remove: new acl.secureAny.Secure<ACLCheck>({ acls: acls ? acls.remove: undefined }),
    };
    this.userGroup = userGroup;
    this.initGQL({ userGQL, systemGQL });
  }

  async syncDb(force: boolean = false) {
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
