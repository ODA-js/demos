import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

import {
  
  TextField,
  BooleanField,
  EditButton,
  ShowButton,
  DeleteButton,
} from 'react-admin';

const cardStyle = {
  width: 240,
  margin: '0.5rem',
  display: 'inline-block',
  verticalAlign: 'top',
};

const Label = ({ label }, { translate }) => (
  <label>{translate(label)}:&nbsp;</label>
);

Label.contextTypes = {
  translate: PropTypes.func.isRequired,
};

const CommentGrid = ({ ids, data, basePath }, { translate }) => (
  <div>
    { ids.length > 0 ? (
      ids.map(id => (
        <Card key={id} style={cardStyle}>
          <CardHeader title={<TextField record={data[id]} source="userName" />} />
          <CardContent>
            <div>
              <div>
                <Label label="resources.User.fields.userName" />
                <TextField record={data[id]} source="userName" />
              </div>

              <div>
                <Label label="resources.User.fields.isAdmin" />
                <BooleanField record={data[id]} source="isAdmin" />
              </div>

              <div>
                <Label label="resources.User.fields.isSystem" />
                <BooleanField record={data[id]} source="isSystem" />
              </div>

              <div>
                <Label label="resources.User.fields.enabled" />
                <BooleanField record={data[id]} source="enabled" />
              </div>

            </div>
          </CardContent>
          <CardActions style={{ textAlign: 'right' }}>
            <EditButton
              resource="system/User"
              basePath="/system/User"
              record={data[id]}
            />
            <ShowButton
              resource="system/User"
              basePath="/system/User"
              record={data[id]}
            />
            <DeleteButton
              resource="system/User"            
              basePath="/system/User"
              record={data[id]}
            />
          </CardActions>
        </Card>
      ))
    ) : (
      <div style={{ height: '10vh' }} />
    )}
  </div>
);

CommentGrid.defaultProps = {
  data: {},
  ids: [],
};

CommentGrid.contextTypes = {
  uix: PropTypes.object.isRequired,
  translate: PropTypes.func.isRequired,
};

export default CommentGrid;
