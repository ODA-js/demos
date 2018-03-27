
export default {
  export: {
    queries: {
      User: {
        query: 'User/list.graphql',
        /*process: (f) => ({
          User: f.viewer.users ? f.viewer.users.edges.map(e => ({
            ...e.node,
            todos : e.node.todos ? e.node.todos.edges.map(s => ({
              ...s.node,
            })) : [],
          })) : [],
        }),*/
      }
    }
  }
}