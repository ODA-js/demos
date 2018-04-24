// tslint:disable:no-unused-variable
import { common } from 'oda-gen-graphql';

import { SystemPackage } from './../graphql-gen/system';
import { CommonExtends } from './common';
import { pubsub } from './pubsub';

const { deepMerge } = common.lib;

export class SystemSchema extends common.types.GQLModule {
  _name = 'SystemSchema';
  protected _composite = [
    new SystemPackage({}),
    new CommonExtends({}),
  ];

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
        login: User
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
          login: {
            subscribe: () => pubsub.asyncIterator('login'),
          },
        }),
      },
    );
  }

  public get resolvers() {
    return this.applyHooks(this.resolver);
  }
}
