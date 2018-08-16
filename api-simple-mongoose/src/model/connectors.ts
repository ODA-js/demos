import RegisterConnectors from '../graphql-gen/system/data/registerConnectors';

import User from '../graphql-gen/system/data/User/adapter/connector';

export default class DataConnectors extends RegisterConnectors {
  public get Viewer(): User {
    if (!this._Viewer) {
      this._Viewer = new User({
        mongoose: this.mongoose,
        connectors: this,
        securityContext: this.securityContext,
      });
    }
    return this._Viewer;
  }
  protected _Viewer: User;
}
