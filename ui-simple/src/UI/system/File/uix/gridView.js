import React from "react";
import PropTypes from 'prop-types';

import {
  Datagrid,
  EditButton,
  DeleteButton,
  ShowButton,
  
  TextField,
} from "react-admin";

const Grid = (props) => (
  <Datagrid {...props} >

    <TextField sortable={true} label="resources.File.fields.path" source="path" />

    <ShowButton label={false} />
    <EditButton label={false} />
    <DeleteButton label={false} />
  </Datagrid>
);

Grid.contextTypes = {
  translate: PropTypes.func.isRequired,
}

export default Grid;
