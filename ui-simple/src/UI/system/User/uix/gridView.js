import React from "react";
import PropTypes from 'prop-types';

import {
  Datagrid,
  EditButton,
  DeleteButton,
  ShowButton,
  
  TextField,
  BooleanField,
} from "react-admin";

const Grid = (props) => (
  <Datagrid {...props} >

    <TextField sortable={true} label="resources.User.fields.userName" source="userName" />

    <BooleanField sortable={true} label="resources.User.fields.isAdmin" source="isAdmin" allowEmpty />

    <BooleanField sortable={true} label="resources.User.fields.isSystem" source="isSystem" allowEmpty />

    <BooleanField sortable={true} label="resources.User.fields.enabled" source="enabled" allowEmpty />

    <ShowButton label="" basePath="/system/User"/>
    <EditButton label="" basePath="/system/User"/>
    <DeleteButton label="" basePath="/system/User"/>
  </Datagrid>
);

Grid.contextTypes = {
  translate: PropTypes.func.isRequired,
}

export default Grid;
