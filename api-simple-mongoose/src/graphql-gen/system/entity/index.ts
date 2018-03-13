
import { common } from 'oda-gen-graphql';
import { NodeEntity } from './node';
import { ViewerEntity } from './viewer';

import { UserEntity } from './User';
import { ToDoItemEntity } from './ToDoItem';

export class SystemEntities extends common.types.GQLModule {
  protected _name = 'SystemEntities';
  protected _extend = [
    new NodeEntity({}),
    new ViewerEntity({}),
    new UserEntity({}),
    new ToDoItemEntity({}),
  ];
}

