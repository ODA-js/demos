// tslint:disable:no-unused-variable
import { common } from 'oda-gen-graphql';
const { deepMerge } = common.lib;

import { SystemPackage } from './index';
import ToDoSchema from '../../gql/ToDoItem';

export class SystemSchema extends common.types.GQLModule {
  protected _name = 'SystemSchema';
  protected _composite = [new SystemPackage({})];

  public get typeDefs() {
    return `
      ${this.todos.schema}

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
      }
      `;
  }

  public build() {
    debugger;
    super.build();
    this._resolver = deepMerge(
      this.resolver,
      this.viewer,
      {
        RootQuery: this.query,
        RootMutation: this.mutation,
      },
      this.todos.resolvers,
    );
    debugger;
  }

  public get resolvers() {
    return this.applyHooks(this.resolver);
  }
  constructor(...args) {
    super(...args);
    debugger;
    this.todos = ToDoSchema;
    ToDoSchema.build();
  }
}
