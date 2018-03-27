import { common } from 'oda-gen-graphql';
import { PublicEntities } from './entity';
import { PublicMutations } from './mutation';

export class PublicPackage extends common.types.GQLModule {
  protected _name = 'PublicPackage';
  protected _composite: common.types.GQLModule[] = [
    new PublicEntities({}),
    new PublicMutations({}),
    new common.types.DefaultTypes({}),
  ];
}
