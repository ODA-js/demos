import { Union } from '../common';
import gql from 'graphql-tag';

export default new Union({
  schema: gql`
    union nodes = ToDoItem | User
  `,
  resolver: (obj, context, info) => {
    return obj.__type;
  },
});
