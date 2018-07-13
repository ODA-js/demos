import React from 'react';
import PropTypes from 'prop-types';
import {
  TabbedShowLayout,
  Tab,
  Show,
  TextField,
  BooleanField,
  ReferenceManyField,
} from 'react-admin';

const ShowRecordView = (props, context) => {
  const { uix } = context;
  const { Title } = uix['system/User'];
  const ToDoItem = uix['system/ToDoItem'];
  const File = uix['system/File'];
  const User = uix['system/User'];

  return (
    <Show title={<Title />} {...props}>
      <TabbedShowLayout>
        <Tab label="resources.User.summary">
          <TextField label="resources.User.fields.userName" source="userName" />
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
        </Tab>
        <Tab label="resources.User.fields.todos">
          <ReferenceManyField
            addLabel={false}
            reference="system/ToDoItem"
            target="user"
            source="userName">
            <ToDoItem.Grid />
          </ReferenceManyField>
        </Tab>
        <Tab label="resources.User.fields.files">
          <ReferenceManyField
            addLabel={false}
            reference="system/File"
            target="user"
            source="id">
            <File.Grid />
          </ReferenceManyField>
        </Tab>
        <Tab label="resources.User.fields.followings">
          <ReferenceManyField
            addLabel={false}
            reference="system/User"
            target="followers"
            source="id">
            <User.Grid />
          </ReferenceManyField>
        </Tab>
        <Tab label="resources.User.fields.followers">
          <ReferenceManyField
            addLabel={false}
            reference="system/User"
            target="followings"
            source="id">
            <User.Grid />
          </ReferenceManyField>
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
