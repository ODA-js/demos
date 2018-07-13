import React from 'react';
import PropTypes from 'prop-types';
import {
  TabbedShowLayout,
  Tab,
  Show,
  TextField,
  BooleanField,
  JSONField,
  DateField,
  ShowButton,
  EditButton,
  DeleteButton,
} from 'react-admin';
import { components } from 'oda-ra-ui';
const { EmbeddedField } = components;

const ShowRecordView = (props, context) => {
  const { uix } = context;
  const { Title } = uix['system/ToDoItem'];
  return (
    <Show title={<Title />} {...props}>
      <TabbedShowLayout>
        <Tab label="resources.ToDoItem.summary">
          <TextField label="resources.ToDoItem.fields.name" source="name" />
          <TextField
            label="resources.ToDoItem.fields.description"
            source="description"
          />
          <BooleanField label="resources.ToDoItem.fields.done" source="done" />
          <JSONField
            label="resources.ToDoItem.fields.location"
            source="location"
          />
          <DateField
            label="resources.ToDoItem.fields.dueToDate"
            source="dueToDate"
          />
          <BooleanField
            label="resources.ToDoItem.fields.published"
            source="published"
          />
        </Tab>
        <Tab label="resources.ToDoItem.fields.user">
          <EmbeddedField addLabel={false} source="userValue">
            <TextField
              label="resources.User.fields.userName"
              source="userName"
            />
            <BooleanField
              label="resources.User.fields.isAdmin"
              source="isAdmin"
            />
            <BooleanField
              label="resources.User.fields.isSystem"
              source="isSystem"
            />
            <BooleanField
              label="resources.User.fields.enabled"
              source="enabled"
            />
            <DeleteButton basePath="/system/User" />
          </EmbeddedField>
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
};

ShowRecordView.contextTypes = {
  uix: PropTypes.object.isRequired,
  translate: PropTypes.func.isRequired,
};

export default ShowRecordView;
