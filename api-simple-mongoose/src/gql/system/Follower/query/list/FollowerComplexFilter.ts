import { Input } from '../../../common';
import gql from 'graphql-tag';
export default new Input({
  schema: gql`
    input FollowerComplexFilter {
      or: [FollowerComplexFilter]
      and: [FollowerComplexFilter]
      follower: WhereString
      following: WhereString
      id: WhereID
    }
  `,
});
