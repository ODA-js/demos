exports.UserUI = {
  name: 'UserUI',
  'entities.User': {
    'metadata.UI': {
      listName: 'userName',
      list: ['enabled', 'isAdmin', 'isSystem'],
      show: ['^password'],
    },
  }
}

exports.ToDoItemUI = {
  name: 'ToDoItem',
  'entities.ToDoItem': {
    'metadata.UI': {
      listName: 'name',
      list: ['name', 'description', 'done', 'dueToDate', 'published'],
      show: ['^password'],
    },
  }
}