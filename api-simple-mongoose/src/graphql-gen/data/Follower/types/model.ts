 export interface IFollower {
  id: string;
  follower?: string;
  following?: string;
}

export type PartialFollower = {
  [P in keyof IFollower]?: IFollower[P]
}

export interface IFollowerEdge {
  cursor: String;
  node: IFollower;
}

export interface IFollowerConnection {
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor?: string;
    endCursor?: string;
    count?: number;
  };
  edges: IFollowerEdge[];
}




