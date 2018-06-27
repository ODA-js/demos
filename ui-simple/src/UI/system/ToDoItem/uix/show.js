import React from "react";
import PropTypes from 'prop-types';
import {
  
  TabbedShowLayout,
  Tab,
  
  Show,
  TextField,
  BooleanField,
  DateField,
  ShowButton,
  EditButton,
  DeleteButton,
} from "react-admin";
import { components } from 'oda-ra-ui';
const {
  EmbeddedField,
} = components;

const ShowRecordView = (props, context) => {
  const { uix } = context;
  const { Title } = uix['system/ToDoItem'];
  return (
    <Show title={<Title />} {...props}>
      
      
      <TabbedShowLayout>
        <Tab label="resources.ToDoItem.summary">
          <TextField 
            label="resources.ToDoItem.fields.name" 
            source="name"
            allowEmpty
          />
          <TextField 
            label="resources.ToDoItem.fields.description" 
            source="description"
            allowEmpty
          />
          <BooleanField 
            label="resources.ToDoItem.fields.done" 
            source="done"
            allowEmpty
          />
          <DateField 
            label="resources.ToDoItem.fields.dueToDate" 
            source="dueToDate"
            allowEmpty
          />
          <BooleanField 
            label="resources.ToDoItem.fields.published" 
            source="published"
            allowEmpty
          />
        </Tab>
        <Tab label="resources.ToDoItem.fields.user">
          <EmbeddedField
            addLabel={false}
            source="userValue"
          >
            <TextField 
              label="resources.User.fields.userName"
              source="userName" />
            <BooleanField 
              label="resources.User.fields.isAdmin"
              source="isAdmin" allowEmpty />
            <BooleanField 
              label="resources.User.fields.isSystem"
              source="isSystem" allowEmpty />
            <BooleanField 
              label="resources.User.fields.enabled"
              source="enabled" allowEmpty />
            <ShowButton resource="system/User"/>
            <EditButton resource="system/User"/>
            <DeleteButton resource="system/User"/>
          </EmbeddedField>
      
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
};

ShowRecordView.contextTypes = {
  uix: PropTypes.object.isRequired,
  translate: PropTypes.func.isRequired,
}

export default ShowRecordView;
