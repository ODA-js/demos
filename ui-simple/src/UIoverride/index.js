import ToDoItemUIX from './ToDoItem/uix';
import ToDoItemResource from './ToDoItem/queries';
// import CuratorUIX from './Curator/uix';
import { uix as _uix, Resources as ResourcesBase } from './../UI/system/';

export const uix = {
  ..._uix,
  'system/ToDoItem': {
    ..._uix['system/ToDoItem'],
    ...ToDoItemUIX,
  },
};

export class Resources extends ResourcesBase {
  constructor(...args) {
    super(...args);
    this.resource('system/ToDoItem').override(ToDoItemResource);
  }
}
