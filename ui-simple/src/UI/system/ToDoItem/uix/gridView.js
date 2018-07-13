import React from 'react';
import PropTypes from 'prop-types';

import {
  Datagrid,
  EditButton,
  DeleteButton,
  ShowButton,
  TextField,
  BooleanField,
  DateField,
} from 'react-admin';

const Grid = props => (
  <Datagrid {...props}>
    <TextField
      sortable={true}
      label="resources.ToDoItem.fields.name"
      source="name"
      allowEmpty
    />

    <TextField
      sortable={true}
      label="resources.ToDoItem.fields.description"
      source="description"
      allowEmpty
    />

    <BooleanField
      sortable={true}
      label="resources.ToDoItem.fields.done"
      source="done"
      allowEmpty
    />

    <DateField
      sortable={true}
      label="resources.ToDoItem.fields.dueToDate"
      source="dueToDate"
      allowEmpty
    />

    <BooleanField
      sortable={true}
      label="resources.ToDoItem.fields.published"
      source="published"
      allowEmpty
    />

    <ShowButton label="" basePath="/system/ToDoItem" />
    <EditButton label="" basePath="/system/ToDoItem" />
    <DeleteButton label="" basePath="/system/ToDoItem" />
  </Datagrid>
);

Grid.contextTypes = {
  translate: PropTypes.func.isRequired,
};

export default Grid;
