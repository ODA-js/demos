import { Input } from '../../../common';
import gql from 'graphql-tag';

export default new Input({
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
