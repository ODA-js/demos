
export default {
  export: {
    queries: {
      File: {
        query: 'File/list.graphql',
        /*process: (f) => ({
          File: f.viewer.files ? f.viewer.files.edges.map(e => ({
            ...e.node,
          })) : [],
        }),*/
      }
    }
  }
}