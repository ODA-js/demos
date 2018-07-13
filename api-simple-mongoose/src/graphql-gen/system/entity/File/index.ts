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

export class File extends common.types.GQLModule {
  constructor(_args) {
    super(_args);
    this._name = 'File';
    this._query = fillDefaults(this._query, query);
    this._viewer = fillDefaults(this._viewer, viewer);
    this._resolver = fillDefaults(
      this._resolver,
      resolver,
      subscriptionsUnions,
    );

    this._typeDef = fillDefaults(this._typeDef, {
      enums: [
        `enum FileSortOrder {
  pathAsc
  pathDesc
  filenameAsc
  filenameDesc
  mimetypeAsc
  mimetypeDesc
  encodingAsc
  encodingDesc
  idAsc
  idDesc
}`,
      ],
      type: [
        `
# # User Files


input EmbedFileFilter {
  or: [EmbedFileFilterItem]
  and: [EmbedFileFilterItem]
  some: FileFilter
  none: FileFilter
  every: FileFilter
}

input EmbedFileFilterItem {
  some: FileFilter
  none: FileFilter
  every: FileFilter
}

input FileFilter {
  or: [FileFilterItem]
  and: [FileFilterItem]
  path: WhereString
  filename: WhereString
  mimetype: WhereString
  encoding: WhereString
  user: WhereID
  id: WhereID
}

input FileComplexFilter {
  or: [FileComplexFilter]
  and: [FileComplexFilter]
  path: WhereString
  filename: WhereString
  mimetype: WhereString
  encoding: WhereString
  user: WhereID
  id: WhereID
}

input FileFilterItem {
  path: WhereString
  filename: WhereString
  mimetype: WhereString
  encoding: WhereString
  user: WhereID
  id: WhereID
}

input FileFilterSubscriptionsItem {
  path: WhereString
  filename: WhereString
  mimetype: WhereString
  encoding: WhereString
  user: WhereID
  id: WhereID
}

input FileFilterSubscriptions {
  or: [FileFilterSubscriptions]
  and: [FileFilterSubscriptions]
  mutation: WhereMutationKind
  node: FileFilterSubscriptionsItem
  previous: FileFilterSubscriptionsItem
  updatedFields: WhereListOfStrings
}

type File implements Node{
  # # Path
  path: String!
  # # Filename
  filename: String
  # # Mimetype
  mimetype: String
  # # Encoding
  encoding: String
  # # Id
  id: ID!
  # # Owner
  user: User

}


`,
      ],
      mutationTypes: [
        `# Input types for basic CUD

# input type for File
input createFileInput {
  clientMutationId: String
  id: ID
  path: String!
  filename: String
  mimetype: String
  encoding: String
  user: embedUserInput
}

input embedFileInput {
  clientMutationId: String
  id: ID
  path: String
  filename: String
  mimetype: String
  encoding: String
  user: embedUserInput
}


# Payload type for File
type createFilePayload {
  clientMutationId: String
  viewer: Viewer
  file: FilesEdge
}

# input type for File
input updateFileInput {
  clientMutationId: String
  id: ID
  path: String
  filename: String
  mimetype: String
  encoding: String
  user: embedUserInput
  userUnlink: embedUserInput
  userCreate: createUserInput
}

# Payload type for File
type updateFilePayload {
  clientMutationId: String
  viewer: Viewer
  file: File
}

# input type for File
input deleteFileInput {
  clientMutationId: String
  id: ID
  path: String
}

# Payload type for File
type deleteFilePayload {
  clientMutationId: String
  viewer: Viewer
  deletedItemId: ID
  file: File
}
`,
      ],
      subscriptionsTypes: [
        `# Input types for basic CUD

# input type for File

type UpdateFileSubscriptionPayload {

  id: ID
  path: String
  filename: String
  mimetype: String
  encoding: String
}

type FileSubscription {
  mutation: MutationKind!
  node: File!
  payload: FileSubscriptionPayload
  updatedFields: [String]
  previous: UpdateFileSubscriptionPayload
}

type FileBelongsToUserArgsSubscriptionPayload {
  file:ID!
  user:ID!
}

type FileBelongsToUserSubscriptionPayload {
  args:FileBelongsToUserArgsSubscriptionPayload
  relation: String
}

union FileSubscriptionPayload = UpdateFileSubscriptionPayload | FileBelongsToUserSubscriptionPayload`,
      ],
      connectionsTypes: [
        `type FilesConnection {
  pageInfo: PageInfo!
  edges: [FilesEdge]
  # put here your additional connection fields
}

type FilesEdge {
  node: File
  cursor: String!
  # put here your additiona edge fields
}


`,
      ],
      connectionsMutation: [
        `
input addToFileBelongsToUserInput {
  clientMutationId: String
  file:ID!
  user:ID!
  #additional Edge fields
}

type addToFileBelongsToUserPayload {
  clientMutationId: String
  viewer: Viewer
  file: File
 }

input removeFromFileBelongsToUserInput {
  clientMutationId: String
  user:ID!
  file:ID!
 }

type removeFromFileBelongsToUserPayload {
  clientMutationId: String
  viewer: Viewer
  file: File
 }
`,
      ],
    });

    this._mutationEntry = fillDefaults(this._mutationEntry, {
      mutationEntry: [
        `createFile(input: createFileInput!): createFilePayload
updateFile(input: updateFileInput!): updateFilePayload
deleteFile(input: deleteFileInput!): deleteFilePayload`,
      ],
      connectionsMutationEntry: [
        `addToFileBelongsToUser(input: addToFileBelongsToUserInput):addToFileBelongsToUserPayload
removeFromFileBelongsToUser(input: removeFromFileBelongsToUserInput):removeFromFileBelongsToUserPayload
`,
      ],
    });

    this._subscriptionEntry = fillDefaults(this._subscriptionEntry, {
      subscriptionEntry: [
        `File(filter: FileFilterSubscriptions): FileSubscription
`,
      ],
    });

    this._queryEntry = fillDefaults(this._queryEntry, {
      queryEntry: [
        `  files( after: String, first: Int, before: String, last: Int, limit: Int, skip: Int, orderBy: [FileSortOrder], filter: FileComplexFilter): FilesConnection

  file(id: ID, path: String): File`,
      ],
    });

    this._mutation = fillDefaults(
      this._mutation,
      deepMerge(entityMutation, connectionMutation),
    );
    this._subscription = fillDefaults(this._subscription, entitySubscription);

    this._viewerEntry = fillDefaults(this._viewerEntry, {
      viewerEntry: [
        `files( after: String, first: Int, before: String, last: Int, limit: Int, skip: Int, orderBy: [FileSortOrder], filter: FileFilter): FilesConnection
  file(id: ID, path: String): File`,
      ],
    });
  }
}
