export default {
  name: 'ToDoItem',
  metadata: {
    storage: {
      adapter: 'mongoose',
    }
  },
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
    published: {
      type: 'boolean',
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
