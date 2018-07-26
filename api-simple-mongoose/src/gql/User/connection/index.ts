import { Schema } from '../../common';

import addToUserHasManyTodos from './addToUserHasManyTodos';
import removeFromUserHasManyTodos from './removeFromUserHasManyTodos';
import addToUserHasManyFiles from './addToUserHasManyFiles';
import removeFromUserHasManyFiles from './removeFromUserHasManyFiles';
import addToUserBelongsToManyFollowings from './addToUserBelongsToManyFollowings';
import removeFromUserBelongsToManyFollowings from './removeFromUserBelongsToManyFollowings';
import addToUserBelongsToManyFollowers from './addToUserBelongsToManyFollowers';
import removeFromUserBelongsToManyFollowers from './removeFromUserBelongsToManyFollowers';
import addToUserHasManyTodosInput from './addToUserHasManyTodosInput';
import addToUserHasManyTodosPayload from './addToUserHasManyTodosPayload';
import removeFromUserHasManyTodosInput from './removeFromUserHasManyTodosInput';
import removeFromUserHasManyTodosPayload from './removeFromUserHasManyTodosPayload';
import addToUserHasManyFilesInput from './addToUserHasManyFilesInput';
import addToUserHasManyFilesPayload from './addToUserHasManyFilesPayload';
import removeFromUserHasManyFilesInput from './removeFromUserHasManyFilesInput';
import removeFromUserHasManyFilesPayload from './removeFromUserHasManyFilesPayload';
import addToUserBelongsToManyFollowingsInput from './addToUserBelongsToManyFollowingsInput';
import addToUserBelongsToManyFollowingsPayload from './addToUserBelongsToManyFollowingsPayload';
import removeFromUserBelongsToManyFollowingsInput from './removeFromUserBelongsToManyFollowingsInput';
import removeFromUserBelongsToManyFollowingsPayload from './removeFromUserBelongsToManyFollowingsPayload';
import addToUserBelongsToManyFollowersInput from './addToUserBelongsToManyFollowersInput';
import addToUserBelongsToManyFollowersPayload from './addToUserBelongsToManyFollowersPayload';
import removeFromUserBelongsToManyFollowersInput from './removeFromUserBelongsToManyFollowersInput';
import removeFromUserBelongsToManyFollowersPayload from './removeFromUserBelongsToManyFollowersPayload';

export default new Schema({
  name: 'ToDo.connections',
  items: [
    addToUserHasManyTodos,
    removeFromUserHasManyTodos,
    addToUserHasManyFiles,
    removeFromUserHasManyFiles,
    addToUserBelongsToManyFollowings,
    removeFromUserBelongsToManyFollowings,
    addToUserBelongsToManyFollowers,
    removeFromUserBelongsToManyFollowers,
    addToUserHasManyTodosInput,
    addToUserHasManyTodosPayload,
    removeFromUserHasManyTodosInput,
    removeFromUserHasManyTodosPayload,
    addToUserHasManyFilesInput,
    addToUserHasManyFilesPayload,
    removeFromUserHasManyFilesInput,
    removeFromUserHasManyFilesPayload,
    addToUserBelongsToManyFollowingsInput,
    addToUserBelongsToManyFollowingsPayload,
    removeFromUserBelongsToManyFollowingsInput,
    removeFromUserBelongsToManyFollowingsPayload,
    addToUserBelongsToManyFollowersInput,
    addToUserBelongsToManyFollowersPayload,
    removeFromUserBelongsToManyFollowersInput,
    removeFromUserBelongsToManyFollowersPayload,
  ],
});
