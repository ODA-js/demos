// tslint:disable:no-unused-variable
import { common } from 'oda-gen-graphql';
import gql from 'graphql-tag';

import { SystemPackage } from './../graphql-gen/system';
import { CommonExtends } from './common';
import { pubsub } from './pubsub';

import ToDoSchema from './../gql/system/ToDoItem';
import File from './../gql/system/File';

const { deepMerge } = common.lib;

export class SystemSchema extends common.types.GQLModule {
  _name = 'SystemSchema';
  protected _composite = [new SystemPackage({}), new CommonExtends({})];

  public get typeDefs() {
    return `
      ${this.todos.schema}
      ${this.file.schema}

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
      this.todos.resolvers,
      this.file.resolvers,
    );
  }

  public get resolvers() {
    return this.applyHooks(this.resolver);
  }
  constructor(...args) {
    super(...args);
    this.todos = ToDoSchema;
    this.file = File;
    this._hooks = this.hooks;
    this._hooks.push(...File.hooks);
    this._hooks.push(...ToDoSchema.hooks);
    ToDoSchema.build();
    File.build();
  }
}
