export default {
  import: {
    queries: {
      ToDoItem: {
        filter: `
          id
          name
          description
          done
          location
          file
          dueToDate
          published
          updatedBy
          updatedAt`,
        uploader: {
          findQuery: {
            id: 'ToDoItem/findById.graphql',
          },
          // createQuery: 'ToDoItem/create.graphql',
          // updateQuery: 'ToDoItem/update.graphql',
          // dataPropName: 'toDoItem',
          findVars: {
            id: f => (f.hasOwnProperty('id') ? { id: f.id } : null),
          },
        },
      },
    },
    relate: {
      ToDoItem: {
        filter: `
          id
          user`,
        uploader: {
          findQuery: {
            id: 'ToDoItem/findById.graphql',
          },
          // createQuery: 'ToDoItem/create.graphql',
          // updateQuery: 'ToDoItem/update.graphql',
          // dataPropName: 'toDoItem',
          findVars: {
            id: f => (f.hasOwnProperty('id') ? { id: f.id } : null),
          },
        },
      },
    },
  },
};
