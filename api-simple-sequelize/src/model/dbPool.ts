import * as config from 'config';
import * as Sequelize from 'sequelize';

import { DbSequelizeConnectionPool } from 'oda-api-graphql-sequelize';
export const dbSqlPool = new DbSequelizeConnectionPool({ defaultUrl: config.get<string>('db.api.url') });
