import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input FollowerFilterSubscriptionsItem {
      follower: WhereString
      following: WhereString
      id: WhereID
    }
  `,
});
