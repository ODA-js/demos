import list from './list';
import item from './item';
import filter from './filter';

import { Schema } from '../../common';

export default new Schema({
  name: 'File.query',
  items: [list, item, filter],
});