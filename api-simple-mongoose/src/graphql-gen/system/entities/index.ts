import User from './User';
import ToDoItem from './ToDoItem';
import File from './File';
import Follower from './Follower';
import { Schema } from 'oda-gen-common';

export default new Schema({
  name: 'System.entities',
  items: [User, ToDoItem, File, Follower],
});
