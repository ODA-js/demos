import users from './users';
import UserComplexFilter from './UserComplexFilter';
import UserSortOrder from './UserSortOrder';
import UsersConnection from './UsersConnection';
import UsersEdge from './UsersEdge';

import { Schema } from '../../../common';
export default new Schema({
  name: 'User.queries.list',
  items: [users, UserComplexFilter, UserSortOrder, UsersConnection, UsersEdge],
});
