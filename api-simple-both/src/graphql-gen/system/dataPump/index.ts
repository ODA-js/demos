import * as _ from 'lodash';
import User from './User';
import ToDoItem from './ToDoItem';

const result = _.merge (
    User,
    ToDoItem,
)

export default {
  ...result
};
