export default {
  name: 'File',
  fields: {
    path: {
      identity: true,
      indexed: true,
    },
    filename: {
      indexed: true,
    },
    mimetype: {
      indexed: true
    },
    encoding: {
      indexed: true,
    },
    user: {
      indexed: true,
      relation: {
        belongsTo: 'User#',
      }
    }
  },
};
