import { Scalar } from '../common';
import gql from 'graphql-tag';

export default new Scalar({
  schema: gql`
    scalar timestamp
  `,
});
