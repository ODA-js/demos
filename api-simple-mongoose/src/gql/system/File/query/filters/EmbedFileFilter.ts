import { Input } from '../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input EmbedFileFilter {
      or: [EmbedFileFilterItem]
      and: [EmbedFileFilterItem]
      some: FileFilter
      none: FileFilter
      every: FileFilter
    }
  `,
});
