import ToDoItemUIX from './ToDoItem/uix';
// import CuratorUIX from './Curator/uix';
import { uix as _uix } from './../UI/system/';

export const uix = {
  ..._uix,
  "system/ToDoItem": {
    ..._uix["system/ToDoItem"],
    ...ToDoItemUIX,
  },
}
