import files from './files';
import FileComplexFilter from './FileComplexFilter';
import FileSortOrder from './FileSortOrder';
import FilesConnection from './FilesConnection';
import FilesEdge from './FilesEdge';

import { Schema } from '../../../common';
export default new Schema({
  name: 'File.queries.list',
  items: [files, FileComplexFilter, FileSortOrder, FilesConnection, FilesEdge],
});
