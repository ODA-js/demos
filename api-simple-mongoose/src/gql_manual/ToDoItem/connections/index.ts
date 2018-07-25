import { Schema } from '../../common';
import addToToDoItemBelongsToUser from './addToToDoItemBelongsToUser';
import addToToDoItemBelongsToUserInput from './addToToDoItemBelongsToUserInput';
import addToToDoItemBelongsToUserPayload from './addToToDoItemBelongsToUserPayload';
import removeFromToDoItemBelongsToUser from './removeFromToDoItemBelongsToUser';
import removeFromToDoItemBelongsToUserInput from './removeFromToDoItemBelongsToUserInput';
import removeFromToDoItemBelongsToUserPayload from './removeFromToDoItemBelongsToUserPayload';

export default new Schema({
  name: 'ToDo.connections',
  items: [
    addToToDoItemBelongsToUser,
    addToToDoItemBelongsToUserInput,
    addToToDoItemBelongsToUserPayload,
    removeFromToDoItemBelongsToUser,
    removeFromToDoItemBelongsToUserInput,
    removeFromToDoItemBelongsToUserPayload,
  ],
});
