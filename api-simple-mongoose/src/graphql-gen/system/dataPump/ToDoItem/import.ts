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
      ToDoItem: {
        filter: `
          id
          name
          description
          done
          location
          dueToDate
          published
          updatedBy
          updatedAt`,
        uploader: {
          findQuery: {
            id: 'ToDoItem/findById.graphql',
          },
          // createQuery: 'ToDoItem/create.graphql',
          // updateQuery: 'ToDoItem/update.graphql',
          // dataPropName: 'toDoItem',
          findVars: {
            id: f => (f.hasOwnProperty('id') ? { id: getValue(f.id) } : null),
          },
        },
      },
    },
    relate: {
      ToDoItem: {
        filter: `
          id
          user`,
        uploader: {
          findQuery: {
            id: 'ToDoItem/findById.graphql',
          },
          // createQuery: 'ToDoItem/create.graphql',
          // updateQuery: 'ToDoItem/update.graphql',
          // dataPropName: 'toDoItem',
          findVars: {
            id: f => (f.hasOwnProperty('id') ? { id: getValue(f.id) } : null),
          },
        },
      },
    },
  },
};
