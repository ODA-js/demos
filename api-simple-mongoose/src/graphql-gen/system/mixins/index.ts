import IUser from './IUser';

import IUpdated from './IUpdated';

import { Schema } from '../common';

export default new Schema({
  name: 'System.mixins',
  items: [IUser, IUpdated],
});
