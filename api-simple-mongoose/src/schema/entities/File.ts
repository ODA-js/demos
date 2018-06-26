export default {
  name: 'File',
  title: 'User files',
  fields: {
    path: {
      identity: true,
      indexed: true,
    },
    filename: {
      indexed: true,
    },
    mimetype: {
      indexed: true,
    },
    encoding: {
      indexed: true,
    },
    user: {
      title: 'Owner',
      indexed: true,
      relation: {
        belongsTo: 'User#',
      },
    },
  },
};
