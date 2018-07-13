import { Connector } from 'oda-api-graphql';
import { PartialToDoItem } from '../types/model';

export interface ToDoItemConnector extends Connector<PartialToDoItem> {
  findOneById: (id: string) => Promise<PartialToDoItem>;
  findOneByIdAndUpdate: (
    id: string,
    payload: PartialToDoItem,
  ) => Promise<PartialToDoItem>;
  findOneByIdAndRemove: (id: string) => Promise<PartialToDoItem>;

  addToUser(args: { toDoItem?: string; user?: string }): Promise<void>;
  removeFromUser(args: { toDoItem?: string; user?: string }): Promise<void>;
}
