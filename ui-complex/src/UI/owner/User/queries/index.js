import { data } from 'oda-aor-rest';
import { fragments, queries } from './queries';
import set from 'lodash/set';

export default {
  queries,
  fragments,
  name: 'owner/User',
  role: 'owner',
  fields: {
    id: { type: 'string' },
    userName: { type: 'string' },
    password: { type: 'string' },
    isAdmin: { type: 'boolean' },
    isSystem: { type: 'boolean' },
    enabled: { type: 'boolean' },
    todos: {
      ref: {
        resource: 'owner/ToDoItem',
        type: data.resource.interfaces.refType.HasMany,
      },
    },
  },
  operations: {
    GET_LIST: {
      filterBy: (params) => Object.keys(params.filter).reduce((acc, key) => {
        if (key === 'ids') {
          return { ...acc, id: { in: params.filter[key] } };
        }
        if (key === 'q') {
          return { ...acc,
            or: [
              { userName: { imatch: params.filter[key] } },
            ]
          };
        }
        return set(acc, key.replace('-', '.'), params.filter[key]);
      }, {}),
    },
    // GET_ONE: {},
    // GET_MANY: {},
    // GET_MANY_REFERENCE: {},
    // CREATE: {},
    // UPDATE: {},
    // DELETE: {},
  },
};

export const extension = [
];
