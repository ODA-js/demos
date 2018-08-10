import FilesEdge from './FilesEdge';
import FilesConnection from './FilesConnection';
import allFiles from './allFiles';
import files from './files';
import FileSortOrder from './FileSortOrder';
import FileComplexFilter from './FileComplexFilter';
import { Schema } from '../../../common';
export default new Schema({
  name: 'File.queries.list',
  items: [
    FilesEdge,
    FilesConnection,
    allFiles,
    files,
    FileSortOrder,
    FileComplexFilter,
  ],
});
