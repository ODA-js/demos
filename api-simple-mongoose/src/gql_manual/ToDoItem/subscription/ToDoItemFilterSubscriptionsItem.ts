import { ModelType, Input } from '../../common';
import gql from 'graphql-tag';

export default new Input({
  type: ModelType.input,
  schema: gql`
    input ToDoItemFilterSubscriptionsItem {
      name: WhereString
      description: WhereString
      done: WhereBoolean
      dueToDate: WhereDate
      published: WhereBoolean
      location: WhereJSON
      user: WhereString
      id: WhereID
      updatedBy: WhereID
      updatedAt: WhereDate
    }
  `,
});
