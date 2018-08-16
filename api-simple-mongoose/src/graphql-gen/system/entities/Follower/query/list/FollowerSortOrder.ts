import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    enum FollowerSortOrder {
      followerAsc
      followerDesc
      followingAsc
      followingDesc
      idAsc
      idDesc
    }
  `,
});
