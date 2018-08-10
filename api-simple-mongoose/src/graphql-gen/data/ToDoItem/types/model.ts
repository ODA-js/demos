export interface IToDoItem {
  id: string;
  name?: string;
  description?: string;
  done?: boolean;
  location?: object;
  file?: string;
  dueToDate?: Date;
  published?: boolean;
  user?: string;
  updatedBy?: string;
  updatedAt?: Date;
}

export class ToDoItem implements IToDoItem {
  public __type: 'ToDoItem' = 'ToDoItem';
  public id: string;
  public name?: string;
  public description?: string;
  public done?: boolean;
  public location?: object;
  public file?: string;
  public dueToDate?: Date;
  public published?: boolean;
  public user?: string;
  public updatedBy?: string;
  public updatedAt?: Date;
  constructor(init: IToDoItem) {
    this.id = init.id;
    this.name = init.name;
    this.description = init.description;
    this.done = init.done;
    this.location = init.location;
    this.file = init.file;
    this.dueToDate = init.dueToDate;
    this.published = init.published;
    this.user = init.user;
    this.updatedBy = init.updatedBy;
    this.updatedAt = init.updatedAt;
  }
}

export function isToDoItem(obj): obj is IToDoItem {
  return (
    obj instanceof ToDoItem ||
    obj.__type === 'ToDoItem' ||
    (obj.id ||
      obj.name ||
      obj.description ||
      obj.done ||
      obj.location ||
      obj.file ||
      obj.dueToDate ||
      obj.published ||
      obj.user ||
      obj.updatedBy ||
      obj.updatedAt)
  );
}

export type PartialToDoItem = { [P in keyof IToDoItem]?: IToDoItem[P] };

export interface IToDoItemEdge {
  cursor: String;
  node: IToDoItem;
}

export interface IToDoItemConnection {
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor?: string;
    endCursor?: string;
    count?: number;
  };
  edges: IToDoItemEdge[];
}
