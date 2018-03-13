
import User from './User/adapter/connector';
import { UserConnector } from './User/adapter/interface';

import ToDoItem from './ToDoItem/adapter/connector';
import { ToDoItemConnector } from './ToDoItem/adapter/interface';


import { acl } from 'oda-api-graphql';

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
  public acls: acl.secureAny.ACLCRUD<(object) => object>;
  public userGroup;
  public userGQL;
  public systemGQL;

  public initGQL({
      userGQL,
      systemGQL
    }:{
      userGQL?,
      systemGQL?,}){
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
      acls?: acl.secureAny.Acls<(object) => object>;
      userGroup?: string;
      userGQL?,
      systemGQL?,
    }) {
    this.user = user;
    this.owner = owner;
    this.mongoose = mongoose;
    this.sequelize = sequelize;
    this.acls = { read: new acl.secureAny.Secure<(object) => object>({ acls }) };
    this.userGroup = userGroup;
    this.initGQL({userGQL, systemGQL});
  }

  async syncDb(force: boolean = false) {
    await this.sequelize.sync({force});
  }

  async close(){
    await this.sequelize.close();
    await this.mongoose.close();
  }
};
