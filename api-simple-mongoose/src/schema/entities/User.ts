export default {
  name: 'User',
  implements:['IUser', 'IUpdated'],
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
    },
    files: {
      relation: {
        hasMany: 'File#user',
      }
    }
  },
};
