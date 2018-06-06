export default {
  name: 'IUser',
  fields: {
    userName: {
      identity: true,
    },
    todos: {
      relation: {
        hasMany: 'userName@ToDoItem#user',
      }
    },
  },
};
