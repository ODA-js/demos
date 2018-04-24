import * as _ from 'lodash';
import User from './User';
import ToDoItem from './ToDoItem';
import File from './File';

const result = _.merge (
    User,
    ToDoItem,
    File,
)

export default {
  ...result
};
