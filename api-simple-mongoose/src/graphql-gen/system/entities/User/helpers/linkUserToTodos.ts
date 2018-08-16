import gql from 'graphql-tag';

export default async function linkUserToTodos({ context, todos, user }) {
  if (todos) {
    await context.userGQL({
      query: gql`
        mutation addToUserHasManyTodos($input: addToUserHasManyTodosInput!) {
          addToUserHasManyTodos(input: $input) {
            user {
              id
            }
          }
        }
      `,
      variables: {
        input: {
          user: user.id,
          toDoItem: todos.id,
        },
      },
    });
  }
}
