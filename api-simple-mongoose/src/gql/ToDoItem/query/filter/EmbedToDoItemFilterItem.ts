import { ModelType, Input } from '../../../common';
import gql from 'graphql-tag';

export default new Input({
  type: ModelType.input,
  schema: gql`
    input EmbedToDoItemFilterItem {
      some: ToDoItemFilter
      none: ToDoItemFilter
      every: ToDoItemFilter
    }
  `,
});
