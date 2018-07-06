import { ModelType, Input } from '../../../common';
import gql from 'graphql-tag';

export default new Input({
  type: ModelType.input,
  schema: gql`
    enum ToDoItemSortOrder {
      nameAsc
      nameDesc
      descriptionAsc
      descriptionDesc
      doneAsc
      doneDesc
      dueToDateAsc
      dueToDateDesc
      publishedAsc
      publishedDesc
      idAsc
      idDesc
      updatedByAsc
      updatedByDesc
      updatedAtAsc
      updatedAtDesc
    }
  `,
});
