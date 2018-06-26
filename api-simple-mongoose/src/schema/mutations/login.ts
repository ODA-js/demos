export default {
  name: 'loginUser',
  description: 'make user login',
  args: [
    {
      name: 'userName',
      required: true,
    },
    {
      name: 'password',
      required: true,
    },
  ],
  payload: [
    {
      name: 'token',
    },
    {
      name: 'role',
    },
  ],
};
