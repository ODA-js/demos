export default {
  import: {
    queries: {
      File: {
        filter: `
          id
          path
          filename
          mimetype
          encoding`,
        uploader: {
          findQuery: {
            id: 'File/findById.graphql',
            path: 'File/findByPath.graphql',
          },
          // createQuery: 'File/create.graphql',
          // updateQuery: 'File/update.graphql',
          // dataPropName: 'file',
          findVars: {
            id: f => (f.hasOwnProperty('id') ? { id: f.id } : null),
            path: f => (f.hasOwnProperty('path') ? { path: f.path } : null),
          },
        },
      },
    },
    relate: {
      File: {
        filter: `
          id
          user`,
        uploader: {
          findQuery: {
            id: 'File/findById.graphql',
            path: 'File/findByPath.graphql',
          },
          // createQuery: 'File/create.graphql',
          // updateQuery: 'File/update.graphql',
          // dataPropName: 'file',
          findVars: {
            id: f => (f.hasOwnProperty('id') ? { id: f.id } : null),
            path: f => (f.hasOwnProperty('path') ? { path: f.path } : null),
          },
        },
      },
    },
  },
};
