import { data } from 'oda-ra-data-provider';
import { fragments, queries } from './queries';
import set from 'lodash/set';

export default {
  queries,
  fragments,
  name: 'system/ToDoItem',
  role: 'system',
  fields: {
    name: { type: 'string' },
    updatedBy: { type: 'string' },
    description: { type: 'string' },
    updatedAt: { type: 'date' },
    done: { type: 'boolean' },
    location: { type: 'JSON' },
    dueToDate: { type: 'date' },
    published: { type: 'boolean' },
    id: { type: 'string' },
    user: {
      ref: {
        resource: 'system/User',
        type: data.resource.interfaces.refType.BelongsTo,
      },
    },
  },
  operations: {
    GET_LIST: {
      filterBy: params =>
        Object.keys(params.filter).reduce((acc, key) => {
          if (key === 'ids') {
            return { ...acc, id: { in: params.filter[key] } };
          }
          if (key === 'q') {
            return {
              ...acc,
              or: [{ name: { imatch: params.filter[key] } }],
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

export const extension = [];
