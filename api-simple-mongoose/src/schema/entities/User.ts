export default {
  name: 'User',
  title: 'The User',
  titlePlural: 'The Users',
  implements: ['IUser', 'IUpdated'],
  fields: {
    userName: {
      title: 'user/email',
      identity: true,
    },
    password: {
      required: true,
    },
    isAdmin: {
      title: ' is Administrator',
      type: 'boolean',
      defaultValue: 'false',
    },
    isSystem: {
      title: ' is System User',
      defaultValue: 'false',
      type: 'boolean',
    },
    enabled: {
      title: 'Allow to login',
      defaultValue: 'true',
      type: 'boolean',
    },
    todos: {
      title: 'todo list',
      relation: {
        hasMany: 'userName@ToDoItem#user',
      },
    },
    files: {
      title: 'user files',
      relation: {
        hasMany: 'File#user',
      },
    },
    followings: {
      relation: {
        belongsToMany: 'User#',
        using: 'Follower#following',
      },
    },
    followers: {
      relation: {
        belongsToMany: 'User#',
        using: 'Follower#follower',
      },
    },
  },
};
