import * as config from 'config';
import * as Sequelize from 'sequelize';

import { DbSequelizeConnectionPool } from 'oda-api-graphql-sequelize';
import { DbMongooseConnectionPool } from 'oda-api-graphql-mongoose';
export const dbPool = new DbMongooseConnectionPool({ defaultUrl: config.get<string>('db.api.url') });
export const dbSqlPool = new DbSequelizeConnectionPool({ defaultUrl: config.get<string>('db.api2.url') });
