import React from 'react';
import PropTypes from 'prop-types';

import { Datagrid, EditButton, DeleteButton, ShowButton } from 'react-admin';

const Grid = props => (
  <Datagrid {...props}>
    <ShowButton label="" basePath="/system/Follower" />
    <EditButton label="" basePath="/system/Follower" />
    <DeleteButton label="" basePath="/system/Follower" />
  </Datagrid>
);

Grid.contextTypes = {
  translate: PropTypes.func.isRequired,
};

export default Grid;
