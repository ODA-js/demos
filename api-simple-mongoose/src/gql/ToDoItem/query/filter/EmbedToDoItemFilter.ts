import { ModelType, Input } from '../../../common';
import gql from 'graphql-tag';

export default new Input({
  type: ModelType.input,
  schema: gql`
    input EmbedToDoItemFilter {
      or: [EmbedToDoItemFilterItem]
      and: [EmbedToDoItemFilterItem]
      some: ToDoItemFilter
      none: ToDoItemFilter
      every: ToDoItemFilter
    }
  `,
});
