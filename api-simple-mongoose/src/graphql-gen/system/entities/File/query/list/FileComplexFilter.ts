import { Input } from '../../../../common';
import gql from 'graphql-tag';
export default new Input({
  schema: gql`
    input FileComplexFilter {
      or: [FileComplexFilter]
      and: [FileComplexFilter]
      path: WhereString
      filename: WhereString
      mimetype: WhereString
      encoding: WhereString
      user: WhereID
      id: WhereID
    }
  `,
});
