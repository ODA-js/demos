import { toGlobalId } from '../../../common';
import gql from 'graphql-tag';

export default async function linkToTodos({ context, todos, user }) {
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
          user: toGlobalId('User', user.id),
          toDoItem: todos.id,
        },
      },
    });
  }
}
