export default {
  resources: {
    File: {
      summary: 'Summary',
      name: 'User files |||| Files',
      listName: 'File |||| Files',
      fields: {
        user: 'Owner',
        id: 'Id',
        path: 'Path',
        filename: 'Filename',
        mimetype: 'Mimetype',
        encoding: 'Encoding',
      },
    },
  },
};
