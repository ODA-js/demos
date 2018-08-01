import EmbedUserFilter from './EmbedUserFilter';
import EmbedUserFilterItem from './EmbedUserFilterItem';
import UserFilter from './UserFilter';
import UserFilterItem from './UserFilterItem';
import { Schema } from '../../../common';

export default new Schema({
  name: 'User.queries.filter',
  items: [UserFilterItem, UserFilter, EmbedUserFilter, EmbedUserFilterItem],
});
