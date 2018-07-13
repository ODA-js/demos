export default {
  resources: {
    User: {
      summary: 'Summary',
      name: 'The User |||| The Users',
      listName: 'User |||| Users',
      fields: {
        userName: 'User email',
        updatedBy: 'Updated by',
        password: 'Password',
        updatedAt: 'Updated at',
        isAdmin: 'Is administrator',
        isSystem: 'Is system user',
        enabled: 'Allow to login',
        todos: 'Todo list',
        files: 'User files',
        followings: 'Followings',
        followers: 'Followers',
        id: 'Id',
      },
    },
  },
};
