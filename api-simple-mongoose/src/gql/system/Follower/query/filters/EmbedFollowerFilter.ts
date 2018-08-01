import { Input } from '../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input EmbedFollowerFilter {
      or: [EmbedFollowerFilterItem]
      and: [EmbedFollowerFilterItem]
      some: FollowerFilter
      none: FollowerFilter
      every: FollowerFilter
    }
  `,
});
