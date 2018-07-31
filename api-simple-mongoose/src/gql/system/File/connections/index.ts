import { Schema } from '../../common';

import addToFileBelongsToUser from './addToFileBelongsToUser';
import removeFromFileBelongsToUser from './removeFromFileBelongsToUser';
import addToFileBelongsToUserInput from './addToFileBelongsToUserInput';
import addToFileBelongsToUserPayload from './addToFileBelongsToUserPayload';
import removeFromFileBelongsToUserInput from './removeFromFileBelongsToUserInput';
import removeFromFileBelongsToUserPayload from './removeFromFileBelongsToUserPayload';

export default new Schema({
  name: 'ToDo.connections',
  items: [
    addToFileBelongsToUser,
    removeFromFileBelongsToUser,
    addToFileBelongsToUserInput,
    addToFileBelongsToUserPayload,
    removeFromFileBelongsToUserInput,
    removeFromFileBelongsToUserPayload,
  ],
});
