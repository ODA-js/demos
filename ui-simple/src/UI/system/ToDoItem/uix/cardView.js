import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

import {
  
  TextField,
  BooleanField,
  DateField,
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
          <CardHeader title={<TextField record={data[id]} source="name" />} />
          <CardContent>
            <div>
              <div>
                <Label label="resources.ToDoItem.fields.name" />
                <TextField record={data[id]} source="name" />
              </div>

              <div>
                <Label label="resources.ToDoItem.fields.description" />
                <TextField record={data[id]} source="description" />
              </div>

              <div>
                <Label label="resources.ToDoItem.fields.done" />
                <BooleanField record={data[id]} source="done" />
              </div>

              <div>
                <Label label="resources.ToDoItem.fields.dueToDate" />
                <DateField record={data[id]} source="dueToDate" />
              </div>

              <div>
                <Label label="resources.ToDoItem.fields.published" />
                <BooleanField record={data[id]} source="published" />
              </div>

            </div>
          </CardContent>
          <CardActions style={{ textAlign: 'right' }}>
            <EditButton
              resource="system/ToDoItem"
              basePath={basePath}
              record={data[id]}
            />
            <ShowButton
              resource="system/ToDoItem"
              basePath={basePath}
              record={data[id]}
            />
            <DeleteButton
              resource="system/ToDoItem"
              basePath={basePath}
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
