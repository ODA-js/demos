import users from './users';
import { Schema } from '../../../common';

export default new Schema({
  name: 'User.queries.list',
  items: [users],
});
