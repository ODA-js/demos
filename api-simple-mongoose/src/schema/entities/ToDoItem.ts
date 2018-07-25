export default {
  name: 'ToDoItem',
  title: 'todo Item',
  implements: ['IUpdated'],
  fields: {
    name: {
      indexed: true,
    },
    description: {
      indexed: true,
    },
    done: {
      type: 'boolean',
      indexed: true,
    },
    location: {
      type: 'JSON',
      indexed: '2dsphere',
    },
    file: {
      type: 'string',
    },
    dueToDate: {
      type: 'Date',
      indexed: true,
    },
    published: {
      type: 'boolean',
      indexed: true,
    },
    user: {
      indexed: true,
      relation: {
        belongsTo: 'User#userName',
      },
    },
  },
};
