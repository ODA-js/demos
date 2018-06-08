export default {
  name: 'IUpdated',
  fields: {
    updatedBy: {
      type:'ID',
      indexed: true,
    },
    updatedAt: {
      type: 'Date',
      indexed: true,
    },
  },
};
