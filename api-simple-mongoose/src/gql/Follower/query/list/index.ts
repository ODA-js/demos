import followers from './followers';
import { Schema } from '../../../common';

export default new Schema({
  name: 'Follower.queries.list',
  items: [followers],
});
