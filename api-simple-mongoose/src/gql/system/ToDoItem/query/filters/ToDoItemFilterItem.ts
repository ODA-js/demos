import { Input } from '../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input ToDoItemFilterItem {
      name: WhereString
      description: WhereString
      done: WhereBoolean
      location: WhereJSON
      file: WhereString
      dueToDate: WhereDate
      published: WhereBoolean
      user: WhereString
      id: WhereID
      updatedBy: WhereID
      updatedAt: WhereDate
    }
  `,
});
