import { Schema } from '../../common';
import gql from 'graphql-tag';
import query from './query';
import input from './input';
import payload from './payload';

export default new Schema({
  name: 'acl.query',
  items: [query, input, payload],
});
