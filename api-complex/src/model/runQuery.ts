import * as dotenv from 'dotenv';
dotenv.config({ silent: true });
import * as config from 'config';
import RegisterConnectors from './connectors';
import { passport, DbMongooseConnectionPool } from 'oda-api-common';
import { makeExecutableSchema } from 'graphql-tools';
import { SystemSchema } from '../model/packages/system';
import { SystemDataPumpSchema } from '../model/packages/dataPump';
import { ExecutionResult } from 'graphql';
import { runQuery } from 'graphql-server-core';


let schemas = () => ({
  fixup: new SystemSchema({}),
  clean: new SystemDataPumpSchema({}),
});

let pool = new DbMongooseConnectionPool({ defaultUrl: config.get<string>('db.api.url') });

export class SystemGraphQL {
  private static _schemas;
  private static _schema;
  private static schema = (() => {
    if (!SystemGraphQL._schemas) {
      SystemGraphQL._schemas = schemas();
    }
    if (!SystemGraphQL._schema) {
      debugger;
      SystemGraphQL._schema = Object.keys(SystemGraphQL._schemas).reduce((result, name) => {
        SystemGraphQL._schemas[name].build();
        result[name] = makeExecutableSchema({
          typeDefs: SystemGraphQL._schemas[name].typeDefs.toString(),
          resolvers: SystemGraphQL._schemas[name].resolvers,
          resolverValidationOptions: {
            requireResolversForNonScalar: false,
          },
        });
        return result;
      }, {});
    }
    return SystemGraphQL._schema;
  });

  public static async connectors() {
    return new RegisterConnectors({
      mongoose: await pool.get('system'),
      user: passport.systemUser(),
      owner: passport.systemUser(),
    });
  }

  public static close() {
    pool.release();
  }

  public static async query({
    query,
    variables,
    schema = 'fixup',
  }: { query: string, variables: any, schema?: string }): Promise<ExecutionResult> {
    return await runQuery({
      query,
      variables,
      schema: SystemGraphQL.schema()[schema],
      context: await SystemGraphQL.context(),
    });
  }

  private static async context() {
    return {
      connectors: await SystemGraphQL.connectors(),
      db: await pool.get('system'),
      user: passport.systemUser(),
      owner: passport.systemUser(),
      systemConnectors: await SystemGraphQL.connectors(),
      systemGQL: SystemGraphQL.query,
    };
  };
}

// использовать этот код для всех системных вычислений.... в том числе для поиска пользователей и прочее...
//
