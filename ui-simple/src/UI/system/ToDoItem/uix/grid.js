import React from "react";
import PropTypes from 'prop-types';

import {
  Datagrid,
  TextField,
  DateField,
  NumberField,
  BooleanField,
  EditButton,
  DeleteButton,
  ShowButton,
  ReferenceField,
} from "react-admin";

const Grid = (props, context) => (
  <Datagrid {...props} >
    <TextField sortable={true} label="resources.ToDoItem.fields.name" source="name" allowEmpty />
    <TextField sortable={true} label="resources.ToDoItem.fields.description" source="description" allowEmpty />
    <BooleanField sortable={true} label="resources.ToDoItem.fields.done" source="done" allowEmpty />
    <DateField sortable={true} label="resources.ToDoItem.fields.dueToDate" source="dueToDate" allowEmpty />
    <BooleanField sortable={true} label="resources.ToDoItem.fields.published" source="published" allowEmpty />

    <ShowButton />
    <EditButton />
    <DeleteButton />
  </Datagrid>
);

Grid.contextTypes = {
  translate: PropTypes.func.isRequired,
}

export default Grid;
