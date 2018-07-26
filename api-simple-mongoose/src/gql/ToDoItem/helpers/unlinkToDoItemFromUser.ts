import { toGlobalId } from '../../../common';
import gql from 'graphql-tag';

export default async function unlinkFromUser({ context, user, toDoItem }) {
  if (user) {
    await context.userGQL({
      query: gql`
        mutation removeFromToDoItemBelongsToUser(
          $input: removeFromToDoItemBelongsToUserInput!
        ) {
          removeFromToDoItemBelongsToUser(input: $input) {
            toDoItem {
              id
            }
          }
        }
      `,
      variables: {
        input: {
          toDoItem: toGlobalId('ToDoItem', toDoItem.id),
          user: user.id,
        },
      },
    });
  }
}
