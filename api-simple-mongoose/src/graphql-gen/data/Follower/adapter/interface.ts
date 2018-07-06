
import { Connector } from 'oda-api-graphql';
import { PartialFollower } from '../types/model';

export interface FollowerConnector extends Connector<PartialFollower>{
  findOneById: (id: string)=> Promise<PartialFollower>
  findOneByIdAndUpdate: (id: string, payload: PartialFollower)=> Promise<PartialFollower>
  findOneByIdAndRemove: (id: string)=> Promise<PartialFollower>

}

