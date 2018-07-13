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
            files : e.node.files ? e.node.files.edges.map(s => ({
              ...s.node,
            })) : [],
            followings : e.node.followings ? e.node.followings.edges.map(s => ({
              ...s.node,
            })) : [],
            followers : e.node.followers ? e.node.followers.edges.map(s => ({
              ...s.node,
            })) : [],
          })) : [],
        }),*/
      },
    },
  },
};
