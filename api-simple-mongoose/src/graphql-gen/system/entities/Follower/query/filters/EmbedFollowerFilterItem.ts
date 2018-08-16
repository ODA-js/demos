import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input EmbedFollowerFilterItem {
      some: FollowerFilter
      none: FollowerFilter
      every: FollowerFilter
    }
  `,
});
