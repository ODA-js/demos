import * as dotenv from 'dotenv';
dotenv.config({ silent: true });
import { filter } from 'graphql-anywhere';
import { dataPump } from 'oda-api-graphql';
import { join as joinPath } from 'path';
import { writeFileSync } from 'fs-extra';
import gql from 'graphql-tag';
require('isomorphic-fetch');
const storedQ = require('./../../data/seed-queries.json');

import { passport } from 'oda-api-common';

import loaderConfig from './loaderConfig';
import RegisterConnectors from '../model/connectors';
import { makeExecutableSchema } from 'graphql-tools';

import { SystemSchema } from '../model/schema';

import * as mongoose from 'mongoose';
import * as config from 'config';
import { runQueryLodash } from 'oda-lodash';


let fn = process.argv[2] ? joinPath(process.cwd(), process.argv[2]) : joinPath(__dirname, '../../data/dump.json');


import { dbSqlPool } from '../model/dbPool';
import { dbPool } from '../model/dbPool';
import { SystemGraphQL, UserGQL } from '../model/runQuery';
import { pubsub } from '../model/pubsub';

async function createContext({ schema }) {
  let sql = await dbSqlPool.get('system');
  let db = await dbPool.get('system');
  let connectors = new RegisterConnectors({
    sequelize: sql,
    mongoose: db,
  });
  const result = {
    connectors,
    systemConnectors: await SystemGraphQL.connectors(),
    systemGQL: SystemGraphQL.query,
    userGQL: undefined,
    sql,
    db,
    // user: passport.systemUser(),
    // owner: passport.systemUser(),
    dbSqlPool,
    dbPool,
    pubsub,
  };

  const userGQL = new UserGQL({
    context: result,
    schema,
  });

  result.userGQL = userGQL.query.bind(userGQL);

  return result;
}

function prepareSchema() {
  let current = new SystemSchema({});
  current.build();
  return makeExecutableSchema({
    typeDefs: current.typeDefs.toString(),
    resolvers: current.resolvers,
    resolverValidationOptions: {
      requireResolversForNonScalar: false,
    },
  });
}

const schema = prepareSchema();

// tslint:disable-next-line:no-var-requires
let data = require(fn);
createContext({ schema }).then(context => {
  dataPump.restoreDataDirect(loaderConfig.import.queries, storedQ, data, schema, context, runQueryLodash).
    then(() => dataPump.restoreDataDirect(loaderConfig.import.relate, storedQ, data, schema, context, runQueryLodash))
    .then(() => {
      context.sql.close();
      context.db.close();
    })
    .catch(e => {
      console.error(e);
      context.sql.close();
      context.db.close();
    });
});
