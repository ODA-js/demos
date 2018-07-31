import { Schema } from '../../../common';
import deleteFollower from './deleteFollower';
import deleteFollowerInput from './deleteFollowerInput';
import deleteFollowerPayload from './deleteFollowerPayload';

export default new Schema({
  name: 'Follower.mutation.delete',
  items: [deleteFollower, deleteFollowerInput, deleteFollowerPayload],
});
