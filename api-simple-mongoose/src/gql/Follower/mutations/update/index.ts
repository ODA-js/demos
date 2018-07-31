import { Schema } from '../../../common';
import updateFollower from './updateFollower';
import updateFollowerInput from './updateFollowerInput';
import updateFollowerPayload from './updateFollowerPayload';

export default new Schema({
  name: 'Follower.mutation.update',
  items: [updateFollower, updateFollowerInput, updateFollowerPayload],
});
