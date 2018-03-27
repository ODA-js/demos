
import { common } from 'oda-gen-graphql';

let { fillDefaults, deepMerge } = common.lib;

import { query } from './query/resolver';
import { viewer } from './viewer/resolver';
import { resolver } from './type/resolver';
import { mutation as connectionMutation } from './connections/mutations/resolver';
import { mutation as entityMutation } from './mutations/resolver';
import { subscriptions as entitySubscription, resolver as subscriptionsUnions } from './subscriptions/resolver';

export class ToDoItem extends common.types.GQLModule {
  constructor(_args) {
    super(_args);
    this._name = 'ToDoItem';
    this._query = fillDefaults(this._query, query);
    this._viewer = fillDefaults(this._viewer, viewer);
    this._resolver = fillDefaults(this._resolver, resolver, subscriptionsUnions);

    this._typeDef = fillDefaults(this._typeDef, {
      'enums': [`enum ToDoItemSortOrder {
  nameAsc
  nameDesc
  descriptionAsc
  descriptionDesc
  doneAsc
  doneDesc
  dueToDateAsc
  dueToDateDesc
  publishedAsc
  publishedDesc
  idAsc
  idDesc
  createdAtAsc
  createdAtDesc
  updatedAtAsc
  updatedAtDesc
  removedAsc
  removedDesc
  ownerAsc
  ownerDesc
}`],
      'type': [`
# # To Do Item


input EmbedToDoItemFilter {
  or: [EmbedToDoItemFilterItem]
  and: [EmbedToDoItemFilterItem]
  some: ToDoItemFilter
  none: ToDoItemFilter
  every: ToDoItemFilter
}

input EmbedToDoItemFilterItem {
  some: ToDoItemFilter
  none: ToDoItemFilter
  every: ToDoItemFilter
}

input ToDoItemFilter {
  or: [ToDoItemFilterItem]
  and: [ToDoItemFilterItem]
  name: WhereString
  description: WhereString
  done: WhereBoolean
  dueToDate: WhereDate
  published: WhereBoolean
  user: WhereString
  id: WhereID
  createdBy: WhereID
  updateBy: WhereID
  createdAt: WhereDate
  updatedAt: WhereDate
  removed: WhereBoolean
  owner: WhereString
}

input ToDoItemComplexFilter {
  or: [ToDoItemComplexFilter]
  and: [ToDoItemComplexFilter]
  name: WhereString
  description: WhereString
  done: WhereBoolean
  dueToDate: WhereDate
  published: WhereBoolean
  user: WhereString
  id: WhereID
  createdBy: WhereID
  updateBy: WhereID
  createdAt: WhereDate
  updatedAt: WhereDate
  removed: WhereBoolean
  owner: WhereString
}

input ToDoItemFilterItem {
  name: WhereString
  description: WhereString
  done: WhereBoolean
  dueToDate: WhereDate
  published: WhereBoolean
  user: WhereString
  id: WhereID
  createdBy: WhereID
  updateBy: WhereID
  createdAt: WhereDate
  updatedAt: WhereDate
  removed: WhereBoolean
  owner: WhereString
}

input ToDoItemFilterSubscriptionsItem {
  name: WhereString
  description: WhereString
  done: WhereBoolean
  dueToDate: WhereDate
  published: WhereBoolean
  user: WhereString
  id: WhereID
  createdBy: WhereID
  updateBy: WhereID
  createdAt: WhereDate
  updatedAt: WhereDate
  removed: WhereBoolean
  owner: WhereString
}

input ToDoItemFilterSubscriptions {
  or: [ToDoItemFilterSubscriptions]
  and: [ToDoItemFilterSubscriptions]
  mutation: WhereMutationKind
  node: ToDoItemFilterSubscriptionsItem
  previous: ToDoItemFilterSubscriptionsItem
  updatedFields: WhereListOfStrings
}

type ToDoItem implements Node{
  # # Name
  name: String
  # # Description
  description: String
  # # Done
  done: Boolean
  # # Due To Date
  dueToDate: Date
  # # Published
  published: Boolean
  # # Id
  id: ID!
  # # Created At
  createdAt: Date
  # # Updated At
  updatedAt: Date
  # # Removed
  removed: Boolean
  # # Owner
  owner: String
  # # User
  user: User

  # # Created By
  createdBy: User

  # # Update By
  updateBy: User

}


`],
      'mutationTypes': [`# Input types for basic CUD

# input type for ToDoItem
input createToDoItemInput {
  clientMutationId: String
  id: ID
  name: String
  description: String
  done: Boolean
  dueToDate: Date
  published: Boolean
  createdAt: Date
  updatedAt: Date
  removed: Boolean
  owner: String
  user: embedUserInput
  createdBy: embedUserInput
  updateBy: embedUserInput
}


input embedToDoItemInput {
  clientMutationId: String
  id: ID
  name: String
  description: String
  done: Boolean
  dueToDate: Date
  published: Boolean
  createdAt: Date
  updatedAt: Date
  removed: Boolean
  owner: String
  user: embedUserInput
  createdBy: embedUserInput
  updateBy: embedUserInput
}


# Payload type for ToDoItem
type createToDoItemPayload {
  clientMutationId: String
  viewer: Viewer
  toDoItem: ToDoItemsEdge
}

# input type for ToDoItem
input updateToDoItemInput {
  clientMutationId: String
  id: ID
  name: String
  description: String
  done: Boolean
  dueToDate: Date
  published: Boolean
  createdAt: Date
  updatedAt: Date
  removed: Boolean
  owner: String
  user: embedUserInput
  userUnlink: embedUserInput
  userCreate: createUserInput
  createdBy: embedUserInput
  createdByUnlink: embedUserInput
  createdByCreate: createUserInput
  updateBy: embedUserInput
  updateByUnlink: embedUserInput
  updateByCreate: createUserInput
}

# Payload type for ToDoItem
type updateToDoItemPayload {
  clientMutationId: String
  viewer: Viewer
  toDoItem: ToDoItem
}

# input type for ToDoItem
input deleteToDoItemInput {
  clientMutationId: String
  id: ID
}

# Payload type for ToDoItem
type deleteToDoItemPayload {
  clientMutationId: String
  viewer: Viewer
  deletedItemId: ID
  toDoItem: ToDoItem
}
`],
      'subscriptionsTypes': [`# Input types for basic CUD

# input type for ToDoItem

type UpdateToDoItemSubscriptionPayload {

  id: ID
  name: String
  description: String
  done: Boolean
  dueToDate: Date
  published: Boolean
  createdAt: Date
  updatedAt: Date
  removed: Boolean
  owner: String
}

type ToDoItemSubscription {
  mutation: MutationKind!
  node: ToDoItem!
  payload: ToDoItemSubscriptionPayload
  updatedFields: [String]
  previous: UpdateToDoItemSubscriptionPayload
}

type ToDoItemBelongsToUserArgsSubscriptionPayload {
  toDoItem:ID!
  user:ID!
}

type ToDoItemBelongsToUserSubscriptionPayload {
  args:ToDoItemBelongsToUserArgsSubscriptionPayload
  relation: String
}

type ToDoItemBelongsToCreatedByArgsSubscriptionPayload {
  toDoItem:ID!
  user:ID!
}

type ToDoItemBelongsToCreatedBySubscriptionPayload {
  args:ToDoItemBelongsToCreatedByArgsSubscriptionPayload
  relation: String
}

type ToDoItemBelongsToUpdateByArgsSubscriptionPayload {
  toDoItem:ID!
  user:ID!
}

type ToDoItemBelongsToUpdateBySubscriptionPayload {
  args:ToDoItemBelongsToUpdateByArgsSubscriptionPayload
  relation: String
}

union ToDoItemSubscriptionPayload = UpdateToDoItemSubscriptionPayload | ToDoItemBelongsToUserSubscriptionPayload | ToDoItemBelongsToCreatedBySubscriptionPayload | ToDoItemBelongsToUpdateBySubscriptionPayload`],
      'connectionsTypes': [`type ToDoItemsConnection {
  pageInfo: PageInfo!
  edges: [ToDoItemsEdge]
  # put here your additional connection fields
}

type ToDoItemsEdge {
  node: ToDoItem
  cursor: String!
  # put here your additiona edge fields
}


`],
      'connectionsMutation': [`
input addToToDoItemBelongsToUserInput {
  clientMutationId: String
  toDoItem:ID!
  user:ID!
  #additional Edge fields
}

type addToToDoItemBelongsToUserPayload {
  clientMutationId: String
  viewer: Viewer
  toDoItem: ToDoItem
 }

input removeFromToDoItemBelongsToUserInput {
  clientMutationId: String
  user:ID!
  toDoItem:ID!
 }

type removeFromToDoItemBelongsToUserPayload {
  clientMutationId: String
  viewer: Viewer
  toDoItem: ToDoItem
 }

input addToToDoItemBelongsToCreatedByInput {
  clientMutationId: String
  toDoItem:ID!
  user:ID!
  #additional Edge fields
}

type addToToDoItemBelongsToCreatedByPayload {
  clientMutationId: String
  viewer: Viewer
  toDoItem: ToDoItem
 }

input removeFromToDoItemBelongsToCreatedByInput {
  clientMutationId: String
  user:ID!
  toDoItem:ID!
 }

type removeFromToDoItemBelongsToCreatedByPayload {
  clientMutationId: String
  viewer: Viewer
  toDoItem: ToDoItem
 }

input addToToDoItemBelongsToUpdateByInput {
  clientMutationId: String
  toDoItem:ID!
  user:ID!
  #additional Edge fields
}

type addToToDoItemBelongsToUpdateByPayload {
  clientMutationId: String
  viewer: Viewer
  toDoItem: ToDoItem
 }

input removeFromToDoItemBelongsToUpdateByInput {
  clientMutationId: String
  user:ID!
  toDoItem:ID!
 }

type removeFromToDoItemBelongsToUpdateByPayload {
  clientMutationId: String
  viewer: Viewer
  toDoItem: ToDoItem
 }
`],
    });

    this._mutationEntry = fillDefaults(this._mutationEntry, {
      'mutationEntry': [`createToDoItem(input: createToDoItemInput!): createToDoItemPayload
updateToDoItem(input: updateToDoItemInput!): updateToDoItemPayload
deleteToDoItem(input: deleteToDoItemInput!): deleteToDoItemPayload`],
      'connectionsMutationEntry': [`addToToDoItemBelongsToUser(input: addToToDoItemBelongsToUserInput):addToToDoItemBelongsToUserPayload
removeFromToDoItemBelongsToUser(input: removeFromToDoItemBelongsToUserInput):removeFromToDoItemBelongsToUserPayload
addToToDoItemBelongsToCreatedBy(input: addToToDoItemBelongsToCreatedByInput):addToToDoItemBelongsToCreatedByPayload
removeFromToDoItemBelongsToCreatedBy(input: removeFromToDoItemBelongsToCreatedByInput):removeFromToDoItemBelongsToCreatedByPayload
addToToDoItemBelongsToUpdateBy(input: addToToDoItemBelongsToUpdateByInput):addToToDoItemBelongsToUpdateByPayload
removeFromToDoItemBelongsToUpdateBy(input: removeFromToDoItemBelongsToUpdateByInput):removeFromToDoItemBelongsToUpdateByPayload
`],
    });

    this._subscriptionEntry = fillDefaults(this._subscriptionEntry, {
      'subscriptionEntry': [`ToDoItem(filter: ToDoItemFilterSubscriptions): ToDoItemSubscription
`],
    });

    this._queryEntry = fillDefaults(this._queryEntry, {
      'queryEntry': [`  toDoItems( after: String, first: Int, before: String, last: Int, limit: Int, skip: Int, orderBy: [ToDoItemSortOrder], filter: ToDoItemComplexFilter): ToDoItemsConnection

  toDoItem(id: ID): ToDoItem`],
    });

    this._mutation = fillDefaults(this._mutation, deepMerge(entityMutation, connectionMutation));
    this._subscription = fillDefaults(this._subscription, entitySubscription);

    this._viewerEntry = fillDefaults(this._viewerEntry, {
      'viewerEntry': [`  toDoItems( after: String, first: Int, before: String, last: Int, limit: Int, skip: Int, orderBy: [ToDoItemSortOrder], filter: ToDoItemFilter): ToDoItemsConnection
  toDoItem(id: ID): ToDoItem`],
    });
  }
}
