import gql from 'graphql-tag';

export default {
  queries: {
    update: ({ fullFragment }) => gql`
      mutation updateToDoItem($input: updateToDoItemInput!, $files: [Upload]) {
        item: updateToDoItem(input: $input, files: $files) {
          node: toDoItem {
            ...ToDoItemFull
          }
        }
      }
      ${fullFragment}
    `,
    create: ({ fullFragment }) => gql`
      mutation createToDoItem($input: createToDoItemInput!, $files: [Upload]) {
        item: createToDoItem(input: $input, files: $files) {
          edge: toDoItem {
            node {
              ...ToDoItemFull
            }
          }
        }
      }
      ${fullFragment}
    `,
  },
};
