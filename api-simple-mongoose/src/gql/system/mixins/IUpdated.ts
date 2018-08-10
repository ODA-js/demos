import { Union } from '../common';
import gql from 'graphql-tag';

export default new Union({
  schema: gql`
    interface IUpdated {
      # # Updated By
      updatedBy: ID
      # # Updated At
      updatedAt: Date
      # # Id
      id: ID!
    }
  `,
  resolver: (obj, context, info) => {
    return obj.__type;
  },
});
