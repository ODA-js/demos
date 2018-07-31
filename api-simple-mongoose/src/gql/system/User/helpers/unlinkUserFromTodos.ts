import { toGlobalId } from '../../common';
import gql from 'graphql-tag';

export default async function unlinkUserFromTodos({ context, todos, user }) {
  if (todos) {
    await context.userGQL({
      query: gql`
        mutation removeFromUserHasManyTodos(
          $input: removeFromUserHasManyTodosInput!
        ) {
          removeFromUserHasManyTodos(input: $input) {
            user {
              id
            }
          }
        }
      `,
      variables: {
        input: {
          user: toGlobalId('User', user.id),
          toDoItem: todos.id,
        },
      },
    });
  }
}
