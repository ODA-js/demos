import gql from 'graphql-tag';

export default async function linkToDoItemToUser({ context, user, toDoItem }) {
  if (user) {
    await context.userGQL({
      query: gql`
        mutation addToToDoItemBelongsToUser(
          $input: addToToDoItemBelongsToUserInput!
        ) {
          addToToDoItemBelongsToUser(input: $input) {
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
