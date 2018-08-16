import { Union } from '../common';
import gql from 'graphql-tag';

export default new Union({
  schema: gql`
    interface IUser {
      # # User Name
      userName: String!
      # # Id
      id: ID!
    }
  `,
  resolver: (obj, context, info) => {
    return obj.__type;
  },
});
