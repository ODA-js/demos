import create from './create';
import _delete from './delete';
import update from './update';
import embedFollowerInput from './embedFollowerInput';

import { Schema } from '../../../common';

export default new Schema({
  name: 'Follower.mutations',
  items: [create, _delete, update, embedFollowerInput],
});
