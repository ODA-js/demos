export interface IFollower {
  id: string;
  follower?: string;
  following?: string;
}

export class Follower implements IFollower {
  public __type: 'Follower' = 'Follower';
  public id: string;
  public follower?: string;
  public following?: string;
  constructor(init: PartialFollower) {
    this.id = init.id;
    this.follower = init.follower;
    this.following = init.following;
  }
}

export function isFollower(obj): obj is IFollower {
  return (
    obj instanceof Follower ||
    obj.__type === 'Follower' ||
    (obj.id || obj.follower || obj.following)
  );
}

export type PartialFollower = { [P in keyof IFollower]?: IFollower[P] };

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
