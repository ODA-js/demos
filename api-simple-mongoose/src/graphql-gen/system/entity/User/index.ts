import { common } from 'oda-gen-graphql';

let { fillDefaults, deepMerge } = common.lib;

import { query } from './query/resolver';
import { viewer } from './viewer/resolver';
import { resolver } from './type/resolver';
import { mutation as connectionMutation } from './connections/mutations/resolver';
import { mutation as entityMutation } from './mutations/resolver';
import {
  subscriptions as entitySubscription,
  resolver as subscriptionsUnions,
} from './subscriptions/resolver';

export class User extends common.types.GQLModule {
  constructor(_args) {
    super(_args);
    this._name = 'User';
    this._query = fillDefaults(this._query, query);
    this._viewer = fillDefaults(this._viewer, viewer);
    this._resolver = fillDefaults(
      this._resolver,
      resolver,
      subscriptionsUnions,
    );

    this._typeDef = fillDefaults(this._typeDef, {
      enums: [
        `enum UserSortOrder {
  userNameAsc
  userNameDesc
  passwordAsc
  passwordDesc
  isAdminAsc
  isAdminDesc
  isSystemAsc
  isSystemDesc
  enabledAsc
  enabledDesc
  idAsc
  idDesc
  updatedByAsc
  updatedByDesc
  updatedAtAsc
  updatedAtDesc
}`,
      ],
      type: [
        `
# # The User


input EmbedUserFilter {
  or: [EmbedUserFilterItem]
  and: [EmbedUserFilterItem]
  some: UserFilter
  none: UserFilter
  every: UserFilter
}

input EmbedUserFilterItem {
  some: UserFilter
  none: UserFilter
  every: UserFilter
}

input UserFilter {
  or: [UserFilterItem]
  and: [UserFilterItem]
  userName: WhereString
  password: WhereString
  isAdmin: WhereBoolean
  isSystem: WhereBoolean
  enabled: WhereBoolean
  id: WhereID
  updatedBy: WhereID
  updatedAt: WhereDate
}

input UserComplexFilter {
  or: [UserComplexFilter]
  and: [UserComplexFilter]
  userName: WhereString
  password: WhereString
  isAdmin: WhereBoolean
  isSystem: WhereBoolean
  enabled: WhereBoolean
  id: WhereID
  updatedBy: WhereID
  updatedAt: WhereDate
}

input UserFilterItem {
  userName: WhereString
  password: WhereString
  isAdmin: WhereBoolean
  isSystem: WhereBoolean
  enabled: WhereBoolean
  id: WhereID
  updatedBy: WhereID
  updatedAt: WhereDate
}

input UserFilterSubscriptionsItem {
  userName: WhereString
  password: WhereString
  isAdmin: WhereBoolean
  isSystem: WhereBoolean
  enabled: WhereBoolean
  id: WhereID
  updatedBy: WhereID
  updatedAt: WhereDate
}

input UserFilterSubscriptions {
  or: [UserFilterSubscriptions]
  and: [UserFilterSubscriptions]
  mutation: WhereMutationKind
  node: UserFilterSubscriptionsItem
  previous: UserFilterSubscriptionsItem
  updatedFields: WhereListOfStrings
}

type User implements Node {
  # # User/Email
  userName: String!
  # # Password
  password: String!
  # # Is Administrator
  isAdmin: Boolean
  # # Is System User
  isSystem: Boolean
  # # Allow To Login
  enabled: Boolean
  # # Id
  id: ID!
  # # Updated By
  updatedBy: ID
  # # Updated At
  updatedAt: Date
  # # Todo List  
  todos(after: String, first: Int, before: String, last: Int, limit: Int, skip: Int, orderBy: [ToDoItemSortOrder], filter:ToDoItemComplexFilter ): UserHasManyTodosConnection  
  # # User Files  
  files(after: String, first: Int, before: String, last: Int, limit: Int, skip: Int, orderBy: [FileSortOrder], filter:FileComplexFilter ): UserHasManyFilesConnection  
  # # Followings  
  followings(after: String, first: Int, before: String, last: Int, limit: Int, skip: Int, orderBy: [UserSortOrder], filter:UserComplexFilter ): UserBelongsToManyFollowingsConnection  
  # # Followers  
  followers(after: String, first: Int, before: String, last: Int, limit: Int, skip: Int, orderBy: [UserSortOrder], filter:UserComplexFilter ): UserBelongsToManyFollowersConnection  
}


`,
      ],
      mutationTypes: [
        `# Input types for basic CUD

# input type for User
input createUserInput {
  clientMutationId: String
  id: ID
  userName: String!
  password: String!
  isAdmin: Boolean
  isSystem: Boolean
  enabled: Boolean
  updatedBy: ID
  updatedAt: Date
  todos: [embedToDoItemInput]
  files: [embedFileInput]
  followings: [embedUserInput]
  followers: [embedUserInput]
}

input embedUserInput {
  clientMutationId: String
  id: ID
  userName: String
  password: String
  isAdmin: Boolean
  isSystem: Boolean
  enabled: Boolean
  updatedBy: ID
  updatedAt: Date
  todos: [embedToDoItemInput]
  files: [embedFileInput]
  followings: [embedUserInput]
  followers: [embedUserInput]
}


# Payload type for User
type createUserPayload {
  clientMutationId: String
  viewer: Viewer
  user: UsersEdge
}

# input type for User
input updateUserInput {
  clientMutationId: String
  id: ID
  userName: String
  password: String
  isAdmin: Boolean
  isSystem: Boolean
  enabled: Boolean
  updatedBy: ID
  updatedAt: Date
  todos: [embedToDoItemInput]
  todosUnlink: [embedToDoItemInput]
  todosCreate: [createToDoItemInput]
  files: [embedFileInput]
  filesUnlink: [embedFileInput]
  filesCreate: [createFileInput]
  followings: [embedUserInput]
  followingsUnlink: [embedUserInput]
  followingsCreate: [createUserInput]
  followers: [embedUserInput]
  followersUnlink: [embedUserInput]
  followersCreate: [createUserInput]
}

# Payload type for User
type updateUserPayload {
  clientMutationId: String
  viewer: Viewer
  user: User
}

# input type for User
input deleteUserInput {
  clientMutationId: String
  id: ID
  userName: String
}

# Payload type for User
type deleteUserPayload {
  clientMutationId: String
  viewer: Viewer
  deletedItemId: ID
  user: User
}
`,
      ],
      subscriptionsTypes: [
        `# Input types for basic CUD

# input type for User

type UpdateUserSubscriptionPayload {

  id: ID
  userName: String
  password: String
  isAdmin: Boolean
  isSystem: Boolean
  enabled: Boolean
  updatedBy: ID
  updatedAt: Date
}

type UserSubscription {
  mutation: MutationKind!
  node: User!
  payload: UserSubscriptionPayload
  updatedFields: [String]
  previous: UpdateUserSubscriptionPayload
}

type UserHasManyTodosArgsSubscriptionPayload {
  user:ID!
  toDoItem:ID!
}

type UserHasManyTodosSubscriptionPayload {
  args:UserHasManyTodosArgsSubscriptionPayload
  relation: String
}

type UserHasManyFilesArgsSubscriptionPayload {
  user:ID!
  file:ID!
}

type UserHasManyFilesSubscriptionPayload {
  args:UserHasManyFilesArgsSubscriptionPayload
  relation: String
}

type UserBelongsToManyFollowingsArgsSubscriptionPayload {
  user:ID!
  userFollowings:ID!
}

type UserBelongsToManyFollowingsSubscriptionPayload {
  args:UserBelongsToManyFollowingsArgsSubscriptionPayload
  relation: String
}

type UserBelongsToManyFollowersArgsSubscriptionPayload {
  user:ID!
  userFollowers:ID!
}

type UserBelongsToManyFollowersSubscriptionPayload {
  args:UserBelongsToManyFollowersArgsSubscriptionPayload
  relation: String
}

union UserSubscriptionPayload = UpdateUserSubscriptionPayload | UserHasManyTodosSubscriptionPayload | UserHasManyFilesSubscriptionPayload | UserBelongsToManyFollowingsSubscriptionPayload | UserBelongsToManyFollowersSubscriptionPayload`,
      ],
      connectionsTypes: [
        `type UsersConnection {
  pageInfo: PageInfo!
  edges: [UsersEdge]
  # put here your additional connection fields
}

type UsersEdge {
  node: User
  cursor: String!
  # put here your additiona edge fields
}



type UserHasManyTodosConnection {
  pageInfo: PageInfo!
  edges: [UserHasManyTodosEdge]
  # put here your additional connection fields
}

type UserHasManyTodosEdge {
  node: ToDoItem
  cursor: String!
  # put here your additiona edge fields
}


type UserHasManyFilesConnection {
  pageInfo: PageInfo!
  edges: [UserHasManyFilesEdge]
  # put here your additional connection fields
}

type UserHasManyFilesEdge {
  node: File
  cursor: String!
  # put here your additiona edge fields
}


type UserBelongsToManyFollowingsConnection {
  pageInfo: PageInfo!
  edges: [UserBelongsToManyFollowingsEdge]
  # put here your additional connection fields
}

type UserBelongsToManyFollowingsEdge {
  node: User
  cursor: String!
  # put here your additiona edge fields
}


type UserBelongsToManyFollowersConnection {
  pageInfo: PageInfo!
  edges: [UserBelongsToManyFollowersEdge]
  # put here your additional connection fields
}

type UserBelongsToManyFollowersEdge {
  node: User
  cursor: String!
  # put here your additiona edge fields
}

`,
      ],
      connectionsMutation: [
        `
input addToUserHasManyTodosInput {
  clientMutationId: String
  user:ID!
  toDoItem:ID!
  #additional Edge fields
}

type addToUserHasManyTodosPayload {
  clientMutationId: String
  viewer: Viewer
  user: User
}

input removeFromUserHasManyTodosInput {
  clientMutationId: String
  toDoItem:ID!
  user:ID!
}

type removeFromUserHasManyTodosPayload {
  clientMutationId: String
  viewer: Viewer
  user: User
}

input addToUserHasManyFilesInput {
  clientMutationId: String
  user:ID!
  file:ID!
  #additional Edge fields
}

type addToUserHasManyFilesPayload {
  clientMutationId: String
  viewer: Viewer
  user: User
}

input removeFromUserHasManyFilesInput {
  clientMutationId: String
  file:ID!
  user:ID!
}

type removeFromUserHasManyFilesPayload {
  clientMutationId: String
  viewer: Viewer
  user: User
}

input addToUserBelongsToManyFollowingsInput {
  clientMutationId: String
  user:ID!
  userFollowings:ID!
  #additional Edge fields
}

type addToUserBelongsToManyFollowingsPayload {
  clientMutationId: String
  viewer: Viewer
  user: User
}

input removeFromUserBelongsToManyFollowingsInput {
  clientMutationId: String
  userFollowings:ID!
  user:ID!
}

type removeFromUserBelongsToManyFollowingsPayload {
  clientMutationId: String
  viewer: Viewer
  user: User
}

input addToUserBelongsToManyFollowersInput {
  clientMutationId: String
  user:ID!
  userFollowers:ID!
  #additional Edge fields
}

type addToUserBelongsToManyFollowersPayload {
  clientMutationId: String
  viewer: Viewer
  user: User
}

input removeFromUserBelongsToManyFollowersInput {
  clientMutationId: String
  userFollowers:ID!
  user:ID!
}

type removeFromUserBelongsToManyFollowersPayload {
  clientMutationId: String
  viewer: Viewer
  user: User
}
`,
      ],
    });

    this._mutationEntry = fillDefaults(this._mutationEntry, {
      mutationEntry: [
        `createUser(input: createUserInput!): createUserPayload
updateUser(input: updateUserInput!): updateUserPayload
deleteUser(input: deleteUserInput!): deleteUserPayload`,
      ],
      connectionsMutationEntry: [
        `addToUserHasManyTodos(input: addToUserHasManyTodosInput):addToUserHasManyTodosPayload
removeFromUserHasManyTodos(input: removeFromUserHasManyTodosInput):removeFromUserHasManyTodosPayload
addToUserHasManyFiles(input: addToUserHasManyFilesInput):addToUserHasManyFilesPayload
removeFromUserHasManyFiles(input: removeFromUserHasManyFilesInput):removeFromUserHasManyFilesPayload
addToUserBelongsToManyFollowings(input: addToUserBelongsToManyFollowingsInput):addToUserBelongsToManyFollowingsPayload
removeFromUserBelongsToManyFollowings(input: removeFromUserBelongsToManyFollowingsInput):removeFromUserBelongsToManyFollowingsPayload
addToUserBelongsToManyFollowers(input: addToUserBelongsToManyFollowersInput):addToUserBelongsToManyFollowersPayload
removeFromUserBelongsToManyFollowers(input: removeFromUserBelongsToManyFollowersInput):removeFromUserBelongsToManyFollowersPayload
`,
      ],
    });

    this._subscriptionEntry = fillDefaults(this._subscriptionEntry, {
      subscriptionEntry: [
        `User(filter: UserFilterSubscriptions): UserSubscription
`,
      ],
    });

    this._queryEntry = fillDefaults(this._queryEntry, {
      queryEntry: [
        `  users( after: String, first: Int, before: String, last: Int, limit: Int, skip: Int, orderBy: [UserSortOrder], filter: UserComplexFilter): UsersConnection

  user(id: ID, userName: String): User`,
      ],
    });

    this._mutation = fillDefaults(
      this._mutation,
      deepMerge(entityMutation, connectionMutation),
    );
    this._subscription = fillDefaults(this._subscription, entitySubscription);

    this._viewerEntry = fillDefaults(this._viewerEntry, {
      viewerEntry: [
        `users( after: String, first: Int, before: String, last: Int, limit: Int, skip: Int, orderBy: [UserSortOrder], filter: UserFilter): UsersConnection
  user(id: ID, userName: String): User`,
      ],
    });
  }
}
