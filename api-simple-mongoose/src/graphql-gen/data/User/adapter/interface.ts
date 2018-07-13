import { Connector } from 'oda-api-graphql';
import { PartialUser } from '../types/model';

export interface UserConnector extends Connector<PartialUser> {
  findOneById: (id: string) => Promise<PartialUser>;
  findOneByIdAndUpdate: (
    id: string,
    payload: PartialUser,
  ) => Promise<PartialUser>;
  findOneByIdAndRemove: (id: string) => Promise<PartialUser>;

  findOneByUserName: (userName: string) => Promise<PartialUser>;
  findOneByUserNameAndUpdate: (
    userName: string,
    payload: PartialUser,
  ) => Promise<PartialUser>;
  findOneByUserNameAndRemove: (userName: string) => Promise<PartialUser>;

  addToTodos(args: { user?: string; toDoItem?: string }): Promise<void>;
  removeFromTodos(args: { user?: string; toDoItem?: string }): Promise<void>;

  addToFiles(args: { user?: string; file?: string }): Promise<void>;
  removeFromFiles(args: { user?: string; file?: string }): Promise<void>;

  addToFollowings(args: {
    user?: string;
    userFollowings?: string;
  }): Promise<void>;
  removeFromFollowings(args: {
    user?: string;
    userFollowings?: string;
  }): Promise<void>;

  addToFollowers(args: {
    user?: string;
    userFollowers?: string;
  }): Promise<void>;
  removeFromFollowers(args: {
    user?: string;
    userFollowers?: string;
  }): Promise<void>;
}
