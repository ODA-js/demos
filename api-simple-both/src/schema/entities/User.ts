export default {
  name: 'User',
  metadata: {
    storage: {
      adapter: 'sequelize',
    }
  },
  fields: {
    userName: {
      identity: true,
    },
    password: {
      required: true,
    },
    isAdmin: {
      type: 'boolean',
    },
    isSystem: {
      type: 'boolean',
    },
    enabled: {
      type: 'boolean',
    },
    todos: {
      relation: {
        hasMany: 'userName@ToDoItem#user',
      }
    }
  },
};
