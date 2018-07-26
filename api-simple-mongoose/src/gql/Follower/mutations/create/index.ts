import { Schema } from '../../../common';
import createFollower from './createFollower';
import createFollowerInput from './createFollowerInput';
import createFollowerPayload from './createFollowerPayload';

export default new Schema({
  name: 'Follower.mutation.create',
  items: [createFollower, createFollowerInput, createFollowerPayload],
});
