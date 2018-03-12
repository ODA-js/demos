export default {
  name: 'ToDoItem',
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
    dueToDate: {
      type: 'Date',
      indexed: true,
    },
    user: {
      indexed: true,
      relation: {
        belongsTo: 'User#userName',
      }
    }
  },
};
