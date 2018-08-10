import acl from './acl';

import { Schema } from '../common';

export default new Schema({
  name: 'System.queries',
  items: [acl],
});
