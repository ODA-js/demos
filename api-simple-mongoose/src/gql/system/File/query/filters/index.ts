import EmbedFileFilter from './EmbedFileFilter';
import EmbedFileFilterItem from './EmbedFileFilterItem';
import FileFilter from './FileFilter';
import FileFilterItem from './FileFilterItem';
import { Schema } from '../../../common';

export default new Schema({
  name: 'File.queries.filter',
  items: [FileFilterItem, FileFilter, EmbedFileFilter, EmbedFileFilterItem],
});
