import { common } from 'oda-gen-graphql';
import { OwnerEntities } from './entity';
import { OwnerMutations } from './mutation';

export class OwnerPackage extends common.types.GQLModule {
  protected _name = 'OwnerPackage';
  protected _composite: common.types.GQLModule[] = [
    new OwnerEntities({}),
    new OwnerMutations({}),
    new common.types.DefaultTypes({}),
  ];
}
