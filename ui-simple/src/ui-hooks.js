exports.UserUI = {
  name: 'UserUI',
  'entities.User': {
    'metadata.UI': {
      listName: 'userName',
      list: ['enabled', 'isAdmin', 'isSystem'],
      show: ['^password', '^updatedBy', '^updatedAt'],
      // embedded: ['todos', 'followings', 'followers'],
    },
  },
};

exports.ToDoItemUI = {
  name: 'ToDoItem',
  'entities.ToDoItem': {
    'metadata.UI': {
      listName: 'name',
      list: ['name', 'description', 'done', 'dueToDate', 'published'],
      show: ['^updatedBy', '^updatedAt'],
      // show: ['^updatedBy', '^updatedAt', '^location'],
      // edit: ['^location'],
      embedded: ['user'],
    },
  },
};
