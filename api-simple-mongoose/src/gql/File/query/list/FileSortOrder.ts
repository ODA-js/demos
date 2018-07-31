import { Input } from '../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    enum FileSortOrder {
      pathAsc
      pathDesc
      filenameAsc
      filenameDesc
      mimetypeAsc
      mimetypeDesc
      encodingAsc
      encodingDesc
      idAsc
      idDesc
    }
  `,
});
