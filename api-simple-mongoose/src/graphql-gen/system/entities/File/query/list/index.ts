import FilesEdge from './FilesEdge';
import FilesConnection from './FilesConnection';
import fileItems from './fileItems';
import files from './files';
import FileSortOrder from './FileSortOrder';
import FileComplexFilter from './FileComplexFilter';
import { Schema } from '../../../../common';
export default new Schema({
  name: 'File.queries.list',
  items: [
    FilesEdge,
    FilesConnection,
    fileItems,
    files,
    FileSortOrder,
    FileComplexFilter,
  ],
});
