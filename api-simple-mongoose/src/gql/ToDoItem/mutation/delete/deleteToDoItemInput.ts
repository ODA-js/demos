import { ModelType, Input, Type } from '../../../common';
import gql from 'graphql-tag';

export default new Input({
  type: ModelType.input,
  schema: gql`
    input deleteToDoItemInput {
      clientMutationId: String
      id: ID
    }
  `,
});
