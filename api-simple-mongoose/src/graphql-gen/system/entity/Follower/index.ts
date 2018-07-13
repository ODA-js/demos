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

export class Follower extends common.types.GQLModule {
  constructor(_args) {
    super(_args);
    this._name = 'Follower';
    this._query = fillDefaults(this._query, query);
    this._viewer = fillDefaults(this._viewer, viewer);
    this._resolver = fillDefaults(
      this._resolver,
      resolver,
      subscriptionsUnions,
    );

    this._typeDef = fillDefaults(this._typeDef, {
      enums: [
        `enum FollowerSortOrder {
  followerAsc
  followerDesc
  followingAsc
  followingDesc
  idAsc
  idDesc
}`,
      ],
      type: [
        `
# # Follower


input EmbedFollowerFilter {
  or: [EmbedFollowerFilterItem]
  and: [EmbedFollowerFilterItem]
  some: FollowerFilter
  none: FollowerFilter
  every: FollowerFilter
}

input EmbedFollowerFilterItem {
  some: FollowerFilter
  none: FollowerFilter
  every: FollowerFilter
}

input FollowerFilter {
  or: [FollowerFilterItem]
  and: [FollowerFilterItem]
  follower: WhereString
  following: WhereString
  id: WhereID
}

input FollowerComplexFilter {
  or: [FollowerComplexFilter]
  and: [FollowerComplexFilter]
  follower: WhereString
  following: WhereString
  id: WhereID
}

input FollowerFilterItem {
  follower: WhereString
  following: WhereString
  id: WhereID
}

input FollowerFilterSubscriptionsItem {
  follower: WhereString
  following: WhereString
  id: WhereID
}

input FollowerFilterSubscriptions {
  or: [FollowerFilterSubscriptions]
  and: [FollowerFilterSubscriptions]
  mutation: WhereMutationKind
  node: FollowerFilterSubscriptionsItem
  previous: FollowerFilterSubscriptionsItem
  updatedFields: WhereListOfStrings
}

type Follower implements Node{
  # # Follower
  follower: String
  # # Following
  following: String
  # # Id
  id: ID!
}


`,
      ],
      mutationTypes: [
        `# Input types for basic CUD

# input type for Follower
input createFollowerInput {
  clientMutationId: String
  id: ID
  follower: String
  following: String
}

input embedFollowerInput {
  clientMutationId: String
  id: ID
  follower: String
  following: String
}


# Payload type for Follower
type createFollowerPayload {
  clientMutationId: String
  viewer: Viewer
  follower: FollowersEdge
}

# input type for Follower
input updateFollowerInput {
  clientMutationId: String
  id: ID
  follower: String
  following: String
}

# Payload type for Follower
type updateFollowerPayload {
  clientMutationId: String
  viewer: Viewer
  follower: Follower
}

# input type for Follower
input deleteFollowerInput {
  clientMutationId: String
  id: ID
}

# Payload type for Follower
type deleteFollowerPayload {
  clientMutationId: String
  viewer: Viewer
  deletedItemId: ID
  follower: Follower
}
`,
      ],
      subscriptionsTypes: [
        `# Input types for basic CUD

# input type for Follower

type FollowerSubscriptionPayload {

  id: ID
  follower: String
  following: String
}

type FollowerSubscription {
  mutation: MutationKind!
  node: Follower!
  payload: FollowerSubscriptionPayload
  updatedFields: [String]
  previous: FollowerSubscriptionPayload
}
`,
      ],
      connectionsTypes: [
        `type FollowersConnection {
  pageInfo: PageInfo!
  edges: [FollowersEdge]
  # put here your additional connection fields
}

type FollowersEdge {
  node: Follower
  cursor: String!
  # put here your additiona edge fields
}


`,
      ],
      connectionsMutation: [``],
    });

    this._mutationEntry = fillDefaults(this._mutationEntry, {
      mutationEntry: [
        `createFollower(input: createFollowerInput!): createFollowerPayload
updateFollower(input: updateFollowerInput!): updateFollowerPayload
deleteFollower(input: deleteFollowerInput!): deleteFollowerPayload`,
      ],
      connectionsMutationEntry: [``],
    });

    this._subscriptionEntry = fillDefaults(this._subscriptionEntry, {
      subscriptionEntry: [
        `Follower(filter: FollowerFilterSubscriptions): FollowerSubscription
`,
      ],
    });

    this._queryEntry = fillDefaults(this._queryEntry, {
      queryEntry: [
        `  followers( after: String, first: Int, before: String, last: Int, limit: Int, skip: Int, orderBy: [FollowerSortOrder], filter: FollowerComplexFilter): FollowersConnection

  follower(id: ID): Follower`,
      ],
    });

    this._mutation = fillDefaults(
      this._mutation,
      deepMerge(entityMutation, connectionMutation),
    );
    this._subscription = fillDefaults(this._subscription, entitySubscription);

    this._viewerEntry = fillDefaults(this._viewerEntry, {
      viewerEntry: [
        `followers( after: String, first: Int, before: String, last: Int, limit: Int, skip: Int, orderBy: [FollowerSortOrder], filter: FollowerFilter): FollowersConnection
  follower(id: ID): Follower`,
      ],
    });
  }
}
