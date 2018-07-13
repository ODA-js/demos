import React from 'react';
import PropTypes from 'prop-types';
import {
  SimpleShowLayout,
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
      <SimpleShowLayout>
        <TextField label="resources.User.fields.userName" source="userName" />
        <BooleanField label="resources.User.fields.isAdmin" source="isAdmin" />
        <BooleanField
          label="resources.User.fields.isSystem"
          source="isSystem"
        />
        <BooleanField label="resources.User.fields.enabled" source="enabled" />
        <ReferenceManyField
          addLabel={false}
          reference="system/ToDoItem"
          target="user"
          source="userName">
          <ToDoItem.Grid />
        </ReferenceManyField>

        <ReferenceManyField
          addLabel={false}
          reference="system/File"
          target="user"
          source="id">
          <File.Grid />
        </ReferenceManyField>

        <ReferenceManyField
          addLabel={false}
          reference="system/User"
          target="followers"
          source="id">
          <User.Grid />
        </ReferenceManyField>

        <ReferenceManyField
          addLabel={false}
          reference="system/User"
          target="followings"
          source="id">
          <User.Grid />
        </ReferenceManyField>
      </SimpleShowLayout>
    </Show>
  );
};

ShowRecordView.contextTypes = {
  uix: PropTypes.object.isRequired,
  translate: PropTypes.func.isRequired,
};

export default ShowRecordView;
