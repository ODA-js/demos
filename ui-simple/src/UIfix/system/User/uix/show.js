import React from "react";
import PropTypes from 'prop-types';
import {
  Datagrid,
  TextField,
  DateField,
  NumberField,
  FunctionField,
  BooleanField,
  EditButton,
  ReferenceManyField,
  ReferenceField,
  Show,
  SimpleShowLayout,
  required,
  RichTextField,
} from "react-admin";

// import { EmbeddedArrayField } from 'aor-embedded-array';
// import { ui } from 'oda-aor-rest';

const LongTextField = TextField;

// const {
  // DependentField,
  // EmbeddedArrayField,
  // EmbeddedRefArrayField,
  // EmbeddedRefField,
  // ReferenceManyField,
// } = ui.components;

const showIfExists = field => root => !!root[field];

const showIfNotEmptyRel = field => root => !!root[field] || (Array.isArray(root[field]) && root[field].length > 0);

const ShowView = (props, context) => {
  const { translate, uix } = context;
  const { Title } = uix['system/User'];
  const ToDoItem = uix['system/ToDoItem'];
  const File = uix['system/File'];

  return (
    <Show title={<Title />} {...props} >
      <SimpleShowLayout {...props}>
        {/* <DependentField resolve={showIfExists('userName')}> */}
          <TextField label="resources.User.fields.userName" source="userName" />
        {/* </DependentField> */}
        {/* <DependentField resolve={showIfExists('isAdmin')}> */}
          <BooleanField label="resources.User.fields.isAdmin" source="isAdmin" allowEmpty />
        {/* </DependentField> */}
        {/* <DependentField resolve={showIfExists('isSystem')}> */}
          <BooleanField label="resources.User.fields.isSystem" source="isSystem" allowEmpty />
        {/* </DependentField> */}
        {/* <DependentField resolve={showIfExists('enabled')}> */}
          <BooleanField label="resources.User.fields.enabled" source="enabled" allowEmpty />
        {/* </DependentField> */}

        <ReferenceManyField label="resources.User.fields.todos" reference="system/ToDoItem" target="user" idKey="userName" allowEmpty >
          <ToDoItem.Grid />
        </ReferenceManyField>

        <ReferenceManyField label="resources.User.fields.files" reference="system/File" target="user" idKey="id" allowEmpty >
          <File.Grid />
        </ReferenceManyField>

      </SimpleShowLayout>
    </Show>
  );
};

ShowView.contextTypes = {
  uix: PropTypes.object.isRequired,
  translate: PropTypes.func.isRequired,
}

export default ShowView;
