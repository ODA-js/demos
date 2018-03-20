 export interface IToDoItem {
  id: string;
  name?: string;
  description?: string;
  done?: boolean;
  dueToDate?: Date;
  user?: string;
}

export type PartialToDoItem = {
  [P in keyof IToDoItem]?: IToDoItem[P]
}

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




