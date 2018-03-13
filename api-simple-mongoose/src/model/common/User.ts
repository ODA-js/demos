import { common } from 'oda-gen-graphql';

export class User extends common.types.GQLModule {
  protected _name = 'UserEntity';
  protected _query = {
    'queryEntry': [`
      users(
        after: String,
        first: Int,
        before: String,
        last: Int,
        limit: Int,
        skip: Int,
        orderBy: [UserSortOrder],
        filter: UserComplexFilter
  ): UsersConnection
    user(id: ID, userName: String): User`],
  };
}