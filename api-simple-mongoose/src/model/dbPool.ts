import * as config from 'config';

import { DbMongooseConnectionPool, DbSequelizeConnectionPool } from 'oda-api-common';
export const dbPool = new DbMongooseConnectionPool({ defaultUrl: config.get<string>('db.api.url') });
