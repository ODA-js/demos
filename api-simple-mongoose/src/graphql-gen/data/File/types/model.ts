 export interface IFile {
  id: string;
  path: string;
  filename?: string;
  mimetype?: string;
  encoding?: string;
  user?: string;
}

export type PartialFile = {
  [P in keyof IFile]?: IFile[P]
}

export interface IFileEdge {
  cursor: String;
  node: IFile;
}

export interface IFileConnection {
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor?: string;
    endCursor?: string;
    count?: number;
  };
  edges: IFileEdge[];
}




