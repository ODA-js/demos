export default {
  name: 'test',
  on: ['FIELD', 'QUERY'],
  args: [
    {
      name: 'message',
      required: true,
    },
  ],
};
