import { ModelType, Input, Type } from '../../common';
import gql from 'graphql-tag';

export default new Input({
  type: ModelType.input,
  schema: gql`
    input embedFileInput {
      clientMutationId: String
      id: ID
      path: String
      filename: String
      mimetype: String
      encoding: String
      user: embedUserInput
    }
  `,
});
