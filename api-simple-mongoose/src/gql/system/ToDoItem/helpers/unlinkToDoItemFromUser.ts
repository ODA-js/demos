import gql from 'graphql-tag';

export default async function unlinkToDoItemFromUser({
  context,
  user,
  toDoItem,
}) {
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
          toDoItem: toDoItem.id,
          user: user.id,
        },
      },
    });
  }
}
