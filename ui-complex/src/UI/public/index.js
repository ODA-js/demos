import UserResource, {extension as UserExtension } from './User/queries';
import ToDoItemResource, {extension as ToDoItemExtension } from './ToDoItem/queries';

import UserUIX from './User/uix';
import ToDoItemUIX from './ToDoItem/uix';

import { data } from 'oda-aor-rest';

import Admin from './admin';

export { Admin };

export class Resources extends data.resource.ResourceContainer {
  constructor(...args){
    super(...args);
    this.override([
      UserResource,
      ToDoItemResource,
      ...UserExtension,
      ...ToDoItemExtension,
    ]);
  }
}

export const uix = {
  "public/User": UserUIX,
  "public/ToDoItem": ToDoItemUIX,
};
