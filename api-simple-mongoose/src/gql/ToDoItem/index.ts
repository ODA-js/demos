import connections from './connections';
import mutations from './mutation';
import query from './query';
import subscription from './subscription';
import type from './type';
import { Schema } from '../typedef';
import gql from 'graphql-tag';

export { connections, mutations, query, subscription, type };

export default new Schema({
  name: 'ToDoItem',
  items: [connections, mutations, query, subscription, type],
});
