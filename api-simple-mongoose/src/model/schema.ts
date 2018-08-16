import { Schema } from 'oda-gen-common';
import systemSchema from './../graphql-gen/system';
import overrides from './common';

export default new Schema({
  name: 'system.schema',
  items: [systemSchema, overrides],
});
