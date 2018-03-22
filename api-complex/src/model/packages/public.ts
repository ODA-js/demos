// tslint:disable:no-unused-variable
import { common } from 'oda-gen-graphql';
import { PublicPackage as Extendee } from '../../graphql-gen/public';

import { LoginUserMutation } from '../common/mutations/login.resolver';
import { RegisterUserMutation } from '../common/registerUserMutation';
import { ACL } from '../common/_acl';

import { pubsub } from '../pubsub';
import { withFilter } from 'graphql-subscriptions';

export class ExtendedPublicPackage extends common.types.GQLModule {
  protected _extend: common.types.GQLModule[] = [
    new Extendee({}),
    new LoginUserMutation({}),
    new RegisterUserMutation({}),
  ];
}

const { deepMerge } = common.lib;

export class PublicSchema extends common.types.GQLModule {
  constructor(args) {
    super(args);
    // override existing entities to reduce functionality of the schema
    this._extend = [
      new ExtendedPublicPackage({}),
      new common.types.GQLModule({
        name: 'ViewerEntity',
        viewerEntry: null,
        mutation: null,
        viewer: null,
      }),
      new ACL({}),
    ];
  }

  public get typeDefs() {
    return `
      ${this.typeDef.join('\n  ')}

      type Viewer implements Node {
        id: ID!
        ${this.viewerEntry.join('\n  ')}
      }

      type RootQuery {
        ${this.queryEntry.join('\n  ')}
      }

      type RootMutation {
        ${this.mutationEntry.join('\n  ')}
      }

      type RootSubscription {
        ${this.subscriptionEntry.join('\n  ')}
      }

      schema {
        query: RootQuery
        mutation: RootMutation
        subscription: RootSubscription
      }
      `;
  }

  public build() {
    super.build();
    this._resolver = deepMerge(
      this.resolver,
      this.viewer,
      {
        RootQuery: this.query,
        RootMutation: this.mutation,
        RootSubscription: deepMerge(this.subscription, {
          // login: {
          //   subscribe: () => pubsub.asyncIterator('login'),
          // },
        }),
      },
    );
  }

  public get resolvers() {
    return this.applyHooks(this.resolver);
  }
}



