
import { common } from 'oda-gen-graphql';
import { NodeEntity } from './node';
import { ViewerEntity } from './viewer';

import { User } from './User';
import { ToDoItem } from './ToDoItem';

export class SystemEntities extends common.types.GQLModule {
  protected _name = 'SystemEntities';
  protected _composite = [
    new NodeEntity({}),
    new ViewerEntity({}),
    new User({}),
    new ToDoItem({}),
  ];
}

