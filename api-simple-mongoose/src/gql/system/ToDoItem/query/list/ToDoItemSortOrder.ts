import { Input } from '../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    enum ToDoItemSortOrder {
      nameAsc
      nameDesc
      descriptionAsc
      descriptionDesc
      doneAsc
      doneDesc
      locationAsc
      locationDesc
      fileAsc
      fileDesc
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
