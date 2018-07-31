import connections from './connections';
import mutations from './mutations';
import query from './query';
import subscription from './subscription';
import type from './type';
import { Schema } from '../typedef';

export { connections, mutations, query, subscription, type };

export default new Schema({
  name: 'ToDoItem',
  items: [connections, mutations, query, subscription, type],
});