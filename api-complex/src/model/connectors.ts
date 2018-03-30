import RegisterConnectors from '../graphql-gen/data/registerConnectors';

import User from '../graphql-gen/data/User/adapter/connector';
import ToDoItem from '../graphql-gen/data/ToDoItem/adapter/connector';
import { UserConnector } from '../graphql-gen/data/User/adapter/interface';
import { ToDoItemConnector } from '../graphql-gen/data/ToDoItem/adapter/interface';

export class ToDoItemUpdate extends ToDoItem {
  protected initOwner() {
    const userName = this.user.userName;
    return function (next) {
      if (this.isNew && !this.get('user')) {
        this.set('user', userName);
      }
      next();
    };
  }
}

export default class DataConnectors extends RegisterConnectors {
  public get Viewer(): UserConnector {
    if (!this._Viewer) {
      this._Viewer = new User({ mongoose: this.mongoose, connectors: this, user: this.user, owner: this.owner, acls: this.acls, userGroup: this.userGroup });
    }
    return this._Viewer;
  }
  protected _Viewer: User;

  public get ToDoItem(): ToDoItemConnector {
    if (!this._ToDoItem) {
      this._ToDoItem = new ToDoItemUpdate({ mongoose: this.mongoose, connectors: this, user: this.user, owner: this.owner, acls: this.acls, userGroup: this.userGroup });
    }
    return this._ToDoItem;
  }
}
