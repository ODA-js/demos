import File from './File';
import UpdateFileSubscriptionPayload from './UpdateFileSubscriptionPayload';
import FileSubscription from './FileSubscription';
import FileBelongsToUserArgsSubscriptionPayload from './FileBelongsToUserArgsSubscriptionPayload';
import FileBelongsToUserSubscriptionPayload from './FileBelongsToUserSubscriptionPayload';
import FileSubscriptionPayload from './FileSubscriptionPayload';
import { Schema } from '../../common';

export default new Schema({
  name: 'File.subscriptions',
  items: [
    File,
    UpdateFileSubscriptionPayload,
    FileSubscription,
    FileBelongsToUserArgsSubscriptionPayload,
    FileBelongsToUserSubscriptionPayload,
    FileSubscriptionPayload,
  ],
});
