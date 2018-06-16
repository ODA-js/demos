
import { common } from 'oda-gen-graphql';

let { fillDefaults, deepMerge } = common.lib;

import { query } from './query/resolver';
import { viewer } from './viewer/resolver';
import { resolver } from './type/resolver';
import { mutation as connectionMutation } from './connections/mutations/resolver';
import { mutation as entityMutation } from './mutations/resolver';
import { subscriptions as entitySubscription, resolver as subscriptionsUnions } from './subscriptions/resolver';

export class User extends common.types.GQLModule {
  constructor(_args) {
    super(_args);
    this._name = 'User';
    this._query = fillDefaults(this._query, query);
    this._viewer = fillDefaults(this._viewer, viewer);
    this._resolver = fillDefaults(this._resolver, resolver, subscriptionsUnions);

    this._typeDef = fillDefaults(this._typeDef, {
      'enums': [`enum UserSortOrder {
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
}`],
      'type': [`
# # User


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
}

input UserFilterItem {
  userName: WhereString
  password: WhereString
  isAdmin: WhereBoolean
  isSystem: WhereBoolean
  enabled: WhereBoolean
  id: WhereID
}

input UserFilterSubscriptionsItem {
  userName: WhereString
  password: WhereString
  isAdmin: WhereBoolean
  isSystem: WhereBoolean
  enabled: WhereBoolean
  id: WhereID
}

input UserFilterSubscriptions {
  or: [UserFilterSubscriptions]
  and: [UserFilterSubscriptions]
  mutation: WhereMutationKind
  node: UserFilterSubscriptionsItem
  previous: UserFilterSubscriptionsItem
  updatedFields: WhereListOfStrings
}

type User implements Node{
  # # User Name
  userName: String!
  # # Password
  password: String!
  # # Is Admin
  isAdmin: Boolean
  # # Is System
  isSystem: Boolean
  # # Enabled
  enabled: Boolean
  # # Id
  id: ID!
  # # Todos  
  todos(after: String, first: Int, before: String, last: Int, limit: Int, skip: Int, orderBy: [ToDoItemSortOrder], filter:ToDoItemComplexFilter ): UserHasManyTodosConnection  
  # # Files  
  files(after: String, first: Int, before: String, last: Int, limit: Int, skip: Int, orderBy: [FileSortOrder], filter:FileComplexFilter ): UserHasManyFilesConnection  
}


`],
      'mutationTypes': [`# Input types for basic CUD

# input type for User
input createUserInput {
  clientMutationId: String
  id: ID
  userName: String!
  password: String!
  isAdmin: Boolean
  isSystem: Boolean
  enabled: Boolean
  todos: [embedToDoItemInput]
  files: [embedFileInput]
}


input embedUserInput {
  clientMutationId: String
  id: ID
  userName: String
  password: String
  isAdmin: Boolean
  isSystem: Boolean
  enabled: Boolean
  todos: [embedToDoItemInput]
  files: [embedFileInput]
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
  todos: [embedToDoItemInput]
  todosUnlink: [embedToDoItemInput]
  todosCreate: [createToDoItemInput]
  files: [embedFileInput]
  filesUnlink: [embedFileInput]
  filesCreate: [createFileInput]
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
`],
      'subscriptionsTypes': [`# Input types for basic CUD

# input type for User

type UpdateUserSubscriptionPayload {

  id: ID
  userName: String
  password: String
  isAdmin: Boolean
  isSystem: Boolean
  enabled: Boolean
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

union UserSubscriptionPayload = UpdateUserSubscriptionPayload | UserHasManyTodosSubscriptionPayload | UserHasManyFilesSubscriptionPayload`],
      'connectionsTypes': [`type UsersConnection {
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

`],
      'connectionsMutation': [`
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
`],
    });

    this._mutationEntry = fillDefaults(this._mutationEntry, {
      'mutationEntry': [`createUser(input: createUserInput!): createUserPayload
updateUser(input: updateUserInput!): updateUserPayload
deleteUser(input: deleteUserInput!): deleteUserPayload`],
      'connectionsMutationEntry': [`addToUserHasManyTodos(input: addToUserHasManyTodosInput):addToUserHasManyTodosPayload
removeFromUserHasManyTodos(input: removeFromUserHasManyTodosInput):removeFromUserHasManyTodosPayload
addToUserHasManyFiles(input: addToUserHasManyFilesInput):addToUserHasManyFilesPayload
removeFromUserHasManyFiles(input: removeFromUserHasManyFilesInput):removeFromUserHasManyFilesPayload
`],
    });

    this._subscriptionEntry = fillDefaults(this._subscriptionEntry, {
      'subscriptionEntry': [`User(filter: UserFilterSubscriptions): UserSubscription
`],
    });

    this._queryEntry = fillDefaults(this._queryEntry, {
      'queryEntry': [`  users( after: String, first: Int, before: String, last: Int, limit: Int, skip: Int, orderBy: [UserSortOrder], filter: UserComplexFilter): UsersConnection

  user(id: ID, userName: String): User`],
    });

    this._mutation = fillDefaults(this._mutation, deepMerge(entityMutation, connectionMutation));
    this._subscription = fillDefaults(this._subscription, entitySubscription);

    this._viewerEntry = fillDefaults(this._viewerEntry, {
      'viewerEntry': [`  users( after: String, first: Int, before: String, last: Int, limit: Int, skip: Int, orderBy: [UserSortOrder], filter: UserFilter): UsersConnection
  user(id: ID, userName: String): User`],
    });
  }
}
