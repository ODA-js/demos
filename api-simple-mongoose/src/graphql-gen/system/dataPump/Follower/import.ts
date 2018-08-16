export default {
  import: {
    queries: {
      Follower: {
        filter: `
          id
          follower
          following`,
        uploader: {
          findQuery: {
            id: 'Follower/findById.graphql',
          },
          // createQuery: 'Follower/create.graphql',
          // updateQuery: 'Follower/update.graphql',
          // dataPropName: 'follower',
          findVars: {
            id: f => (f.hasOwnProperty('id') ? { id: f.id } : null),
          },
        },
      },
    },
    relate: {
      Follower: {
        filter: `
          id`,
        uploader: {
          findQuery: {
            id: 'Follower/findById.graphql',
          },
          // createQuery: 'Follower/create.graphql',
          // updateQuery: 'Follower/update.graphql',
          // dataPropName: 'follower',
          findVars: {
            id: f => (f.hasOwnProperty('id') ? { id: f.id } : null),
          },
        },
      },
    },
  },
};
