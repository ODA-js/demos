export interface IFile {
  id: string;
  path: string;
  filename?: string;
  mimetype?: string;
  encoding?: string;
  user?: string;
}

export class File implements IFile {
  public __type: 'File' = 'File';
  public id: string;
  public path: string;
  public filename?: string;
  public mimetype?: string;
  public encoding?: string;
  public user?: string;
  constructor(init: PartialFile) {
    this.id = init.id;
    this.path = init.path;
    this.filename = init.filename;
    this.mimetype = init.mimetype;
    this.encoding = init.encoding;
    this.user = init.user;
  }
}

export function isFile(obj): obj is IFile {
  return (
    obj instanceof File ||
    obj.__type === 'File' ||
    (obj.id ||
      obj.path ||
      obj.filename ||
      obj.mimetype ||
      obj.encoding ||
      obj.user)
  );
}

export type PartialFile = { [P in keyof IFile]?: IFile[P] };

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
