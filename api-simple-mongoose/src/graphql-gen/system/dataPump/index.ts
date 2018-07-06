import * as _ from 'lodash';
import User from './User';
import ToDoItem from './ToDoItem';
import File from './File';
import Follower from './Follower';

const result = _.merge (
    User,
    ToDoItem,
    File,
    Follower,
)

export default {
  ...result
};
