export interface IUser {
  id: string;
  userName: string;
  password: string;
  isAdmin?: boolean;
  isSystem?: boolean;
  enabled?: boolean;
  todos?: string[];
  files?: string[];
  followings?: string[];
  followers?: string[];
  updatedBy?: string;
  updatedAt?: Date;
}

export class User implements IUser {
  public __type: 'User' = 'User';
  public id: string;
  public userName: string;
  public password: string;
  public isAdmin?: boolean;
  public isSystem?: boolean;
  public enabled?: boolean;
  public todos?: string[];
  public files?: string[];
  public followings?: string[];
  public followers?: string[];
  public updatedBy?: string;
  public updatedAt?: Date;
  constructor(init: IUser) {
    this.id = init.id;
    this.userName = init.userName;
    this.password = init.password;
    this.isAdmin = init.isAdmin;
    this.isSystem = init.isSystem;
    this.enabled = init.enabled;
    this.todos = init.todos;
    this.files = init.files;
    this.followings = init.followings;
    this.followers = init.followers;
    this.updatedBy = init.updatedBy;
    this.updatedAt = init.updatedAt;
  }
}

export function isUser(obj): obj is IUser {
  return (
    obj instanceof User ||
    obj.__type === 'User' ||
    (obj.id ||
      obj.userName ||
      obj.password ||
      obj.isAdmin ||
      obj.isSystem ||
      obj.enabled ||
      obj.todos ||
      obj.files ||
      obj.followings ||
      obj.followers ||
      obj.updatedBy ||
      obj.updatedAt)
  );
}

export type PartialUser = { [P in keyof IUser]?: IUser[P] };

export interface IUserEdge {
  cursor: String;
  node: IUser;
}

export interface IUserConnection {
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor?: string;
    endCursor?: string;
    count?: number;
  };
  edges: IUserEdge[];
}
