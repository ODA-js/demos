
import { common } from 'oda-gen-graphql';
import { NodeEntity } from './node';
import { ViewerEntity } from './viewer';

import { User } from './User';
import { ToDoItem } from './ToDoItem';

export class PublicEntities extends common.types.GQLModule {
  protected _name = 'PublicEntities';
  protected _composite = [
    new NodeEntity({}),
    new ViewerEntity({}),
    new User({}),
    new ToDoItem({}),
  ];
}

