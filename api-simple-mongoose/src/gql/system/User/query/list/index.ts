import UsersEdge from './UsersEdge';
import UsersConnection from './UsersConnection';
import UserHasManyTodosConnection from './UserHasManyTodosConnection';
import UserHasManyTodosEdge from './UserHasManyTodosEdge';
import UserHasManyFilesConnection from './UserHasManyFilesConnection';
import UserHasManyFilesEdge from './UserHasManyFilesEdge';
import UserBelongsToManyFollowingsConnection from './UserBelongsToManyFollowingsConnection';
import UserBelongsToManyFollowingsEdge from './UserBelongsToManyFollowingsEdge';
import UserBelongsToManyFollowersConnection from './UserBelongsToManyFollowersConnection';
import UserBelongsToManyFollowersEdge from './UserBelongsToManyFollowersEdge';
import users from './users';
import UserSortOrder from './UserSortOrder';
import UserComplexFilter from './UserComplexFilter';
import { Schema } from '../../../common';
export default new Schema({
  name: 'User.queries.list',
  items: [
    UsersEdge,
    UsersConnection,
    UserHasManyTodosConnection,
    UserHasManyTodosEdge,
    UserHasManyFilesConnection,
    UserHasManyFilesEdge,
    UserBelongsToManyFollowingsConnection,
    UserBelongsToManyFollowingsEdge,
    UserBelongsToManyFollowersConnection,
    UserBelongsToManyFollowersEdge,
    users,
    UserSortOrder,
    UserComplexFilter,
  ],
});
