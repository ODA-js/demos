export default {
  name: 'acl',
  desciption: 'get user acl',
  args: [{
    name: 'entity',
    required: false,
    type: 'string',
  }],
  payload: [
    {
      name: 'acl',
      type: 'JSON',
    }
  ],
};
