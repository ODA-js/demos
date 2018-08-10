import { Type } from '../../common';
import gql from 'graphql-tag';

export default new Type({
  schema: gql`
    type removeFromUserHasManyTodosPayload {
      user: User
    }
  `,
});
