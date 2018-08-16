import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input FollowerFilter {
      or: [FollowerFilterItem]
      and: [FollowerFilterItem]
      follower: WhereString
      following: WhereString
      id: WhereID
    }
  `,
});
