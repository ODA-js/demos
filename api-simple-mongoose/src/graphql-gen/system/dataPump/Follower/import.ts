import { fromGlobalId } from 'oda-isomorfic';
import { utils } from 'oda-api-graphql';

const { validId } = utils;

export function getValue(value) {
  if (typeof value === 'string') {
    return validId(value) ? value : fromGlobalId(value).id;
  } else {
    return value;
  }
}

export default {
  import: {
    queries: {
      Follower: {
        filter: `
          id
          follower
          following`,
        uploader: {
          findQuery: {
            id: 'Follower/findById.graphql',
          },
          // createQuery: 'Follower/create.graphql',
          // updateQuery: 'Follower/update.graphql',
          // dataPropName: 'follower',
          findVars: {
            id: f => (f.hasOwnProperty('id') ? { id: getValue(f.id) } : null),
          },
        },
      },
    },
    relate: {
      Follower: {
        filter: `
          id`,
        uploader: {
          findQuery: {
            id: 'Follower/findById.graphql',
          },
          // createQuery: 'Follower/create.graphql',
          // updateQuery: 'Follower/update.graphql',
          // dataPropName: 'follower',
          findVars: {
            id: f => (f.hasOwnProperty('id') ? { id: getValue(f.id) } : null),
          },
        },
      },
    },
  },
};
