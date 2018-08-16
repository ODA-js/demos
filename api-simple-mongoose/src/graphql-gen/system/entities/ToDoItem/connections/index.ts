import { Schema } from '../../../common';

import addToToDoItemBelongsToUser from './addToToDoItemBelongsToUser';
import removeFromToDoItemBelongsToUser from './removeFromToDoItemBelongsToUser';
import addToToDoItemBelongsToUserInput from './addToToDoItemBelongsToUserInput';
import addToToDoItemBelongsToUserPayload from './addToToDoItemBelongsToUserPayload';
import removeFromToDoItemBelongsToUserInput from './removeFromToDoItemBelongsToUserInput';
import removeFromToDoItemBelongsToUserPayload from './removeFromToDoItemBelongsToUserPayload';

export default new Schema({
  name: 'ToDoItem.connections',
  items: [
    addToToDoItemBelongsToUser,
    removeFromToDoItemBelongsToUser,
    addToToDoItemBelongsToUserInput,
    addToToDoItemBelongsToUserPayload,
    removeFromToDoItemBelongsToUserInput,
    removeFromToDoItemBelongsToUserPayload,
  ],
});
