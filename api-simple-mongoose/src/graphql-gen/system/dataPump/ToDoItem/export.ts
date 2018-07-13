export default {
  export: {
    queries: {
      ToDoItem: {
        query: 'ToDoItem/list.graphql',
        /*process: (f) => ({
          ToDoItem: f.viewer.toDoItems ? f.viewer.toDoItems.edges.map(e => ({
            ...e.node,
          })) : [],
        }),*/
      },
    },
  },
};
