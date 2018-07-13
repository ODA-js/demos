export default {
  export: {
    queries: {
      Follower: {
        query: 'Follower/list.graphql',
        /*process: (f) => ({
          Follower: f.viewer.followers ? f.viewer.followers.edges.map(e => ({
            ...e.node,
          })) : [],
        }),*/
      },
    },
  },
};
