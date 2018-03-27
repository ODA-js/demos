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
  // ReferenceManyField,
  ReferenceField,
  Show,
  SimpleShowLayout,
  required,
  RichTextField,
} from "admin-on-rest";

// import { EmbeddedArrayField } from 'aor-embedded-array';
import { ui } from 'oda-aor-rest';

const LongTextField = TextField;

const {
  DependentField,
  EmbeddedField,
  GrouppedField,
  EmbeddedArrayField,
  EmbeddedRefArrayField,
  EmbeddedRefField,
  ReferenceManyField,
} = ui.components;

const showIfExists = field => root => !!root[field];

const showIfNotEmptyRel = field => root => !!root[field] || (Array.isArray(root[field]) && root[field].length > 0);

const ShowView = (props, context) => {
  const { uix } = context;
  const Title = uix.ToDoItem.Title;
  const { translate } = context;
  return (
    <Show title={<Title />} {...props} >
      <SimpleShowLayout {...props}>
        <DependentField resolve={showIfExists('name')}>
          <TextField label="resources.ToDoItem.fields.name" source="name" allowEmpty />
        </DependentField>
        <DependentField resolve={showIfExists('description')}>
          <TextField label="resources.ToDoItem.fields.description" source="description" allowEmpty />
        </DependentField>
        <DependentField resolve={showIfExists('done')}>
          <BooleanField label="resources.ToDoItem.fields.done" source="done" allowEmpty />
        </DependentField>
        <DependentField resolve={showIfExists('dueToDate')}>
          <DateField label="resources.ToDoItem.fields.dueToDate" source="dueToDate" allowEmpty />
        </DependentField>
        <DependentField resolve={showIfExists('published')}>
          <BooleanField label="resources.ToDoItem.fields.published" source="published" allowEmpty />
        </DependentField>
        <DependentField resolve={showIfExists('createdAt')}>
          <DateField label="resources.ToDoItem.fields.createdAt" source="createdAt" allowEmpty />
        </DependentField>
        <DependentField resolve={showIfExists('updatedAt')}>
          <DateField label="resources.ToDoItem.fields.updatedAt" source="updatedAt" allowEmpty />
        </DependentField>
        <DependentField resolve={showIfExists('removed')}>
          <BooleanField label="resources.ToDoItem.fields.removed" source="removed" allowEmpty />
        </DependentField>
        <DependentField resolve={showIfExists('owner')}>
          <TextField label="resources.ToDoItem.fields.owner" source="owner" allowEmpty />
        </DependentField>

        <DependentField resolve={showIfNotEmptyRel('userId')} source="userId" >
          <ReferenceField label="resources.ToDoItem.fields.user" source="userId" reference="User" allowEmpty linkType="show" >
            <TextField source="userName" allowEmpty />
          </ReferenceField>
        </DependentField>

        <DependentField resolve={showIfNotEmptyRel('createdById')} source="createdById" >
          <ReferenceField label="resources.ToDoItem.fields.createdBy" source="createdById" reference="User" allowEmpty linkType="show" >
            <TextField source="userName" allowEmpty />
          </ReferenceField>
        </DependentField>

        <DependentField resolve={showIfNotEmptyRel('updateById')} source="updateById" >
          <ReferenceField label="resources.ToDoItem.fields.updateBy" source="updateById" reference="User" allowEmpty linkType="show" >
            <TextField source="userName" allowEmpty />
          </ReferenceField>
        </DependentField>

      </SimpleShowLayout>
    </Show>
  );
};

ShowView.contextTypes = {
  uix: PropTypes.object.isRequired,
  translate: PropTypes.func.isRequired,
}

export default ShowView;
