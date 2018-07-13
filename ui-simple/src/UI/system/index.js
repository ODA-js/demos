import UserResource, { extension as UserExtension } from './User/queries';
import ToDoItemResource, {
  extension as ToDoItemExtension,
} from './ToDoItem/queries';
import FileResource, { extension as FileExtension } from './File/queries';
import FollowerResource, {
  extension as FollowerExtension,
} from './Follower/queries';

import UserUIX from './User/uix';
import ToDoItemUIX from './ToDoItem/uix';
import FileUIX from './File/uix';
import FollowerUIX from './Follower/uix';

import { data } from 'oda-ra-data-provider';

import Admin from './admin';

export { Admin };

export class Resources extends data.resource.ResourceContainer {
  constructor(...args) {
    super(...args);
    this.override([
      UserResource,
      ToDoItemResource,
      FileResource,
      FollowerResource,
      ...UserExtension,
      ...ToDoItemExtension,
      ...FileExtension,
      ...FollowerExtension,
    ]);
  }
}

export const uix = {
  'system/User': UserUIX,
  'system/ToDoItem': ToDoItemUIX,
  'system/File': FileUIX,
  'system/Follower': FollowerUIX,
};
