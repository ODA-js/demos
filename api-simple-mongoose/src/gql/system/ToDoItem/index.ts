import connections from './connections';
import * as helpers from './helpers';
import mutations from './mutations';
import query from './query';
import subscription from './subscription';
import type from './type';
import { Schema } from 'oda-gen-common';

export { connections, mutations, query, subscription, type, helpers };

export default new Schema({
  name: 'ToDoItem',
  items: [connections, mutations, query, subscription, type],
});