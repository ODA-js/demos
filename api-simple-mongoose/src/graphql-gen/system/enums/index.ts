import entityAcl from './entityAcl';

import publishedState from './publishedState';

import { Schema } from '../common';

export default new Schema({
  name: 'System.enums',
  items: [entityAcl, publishedState],
});
