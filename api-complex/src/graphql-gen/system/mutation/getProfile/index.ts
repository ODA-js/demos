import { common } from 'oda-gen-graphql';
import { resolver } from './resolver';
let { fillDefaults } = common.lib;

export class GetProfileMutation extends common.types.GQLModule {
  constructor(_args) {
    super(_args);
    this._name = 'GetProfileMutation';
    this._typeDef = fillDefaults(this._typeDef, {
      types: [
        `input getProfileInput {
  clientMutationId: String
}

type getProfilePayload {
  clientMutationId: String
  viewer: Viewer
  role: String
}
`,
      ],
    });

    this._mutationEntry = fillDefaults(this._mutationEntry, {
      entry: [
        `getProfile(input: getProfileInput!): getProfilePayload`,
      ],
    });

    this._mutation = fillDefaults(this._mutation, resolver);
  }
}
