
import { Connector } from 'oda-api-graphql';
import { PartialFile } from '../types/model';

export interface FileConnector extends Connector<PartialFile>{
  findOneById: (id: string)=> Promise<PartialFile>
  findOneByIdAndUpdate: (id: string, payload: PartialFile)=> Promise<PartialFile>
  findOneByIdAndRemove: (id: string)=> Promise<PartialFile>

  findOneByPath: (path: string)=> Promise<PartialFile>
  findOneByPathAndUpdate: (path: string, payload: PartialFile)=> Promise<PartialFile>
  findOneByPathAndRemove: (path: string)=> Promise<PartialFile>

  addToUser(args: {
      file?: string,
      user?: string,
  }): Promise<void>;
  removeFromUser(args: {
      file?: string,
      user?: string,
  }): Promise<void>;

}

