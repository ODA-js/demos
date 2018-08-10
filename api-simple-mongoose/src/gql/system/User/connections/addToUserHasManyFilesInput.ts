import { Input } from '../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input addToUserHasManyFilesInput {
      user: ID!
      file: ID!
      #additional Edge fields
    }
  `,
});
