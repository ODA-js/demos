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
  ShowController,
  ShowView,
  ReferenceArrayField,
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

const ShowRecordView = (props, context) => {
  const { translate, uix } = context;
  const { Title } = uix['system/User'];

  return (
    <ShowController title={<Title />} {...props}>
      {controllerProps =>
        <ShowView {...props} {...controllerProps}>
          <SimpleShowLayout {...props}>
            {controllerProps.record && controllerProps.record.userName &&
              <TextField label="resources.User.fields.userName" source="userName" />
            }
            {controllerProps.record && controllerProps.record.isAdmin &&
              <BooleanField label="resources.User.fields.isAdmin" source="isAdmin" allowEmpty />
            }
            {controllerProps.record && controllerProps.record.isSystem &&
              <BooleanField label="resources.User.fields.isSystem" source="isSystem" allowEmpty />
            }
            {controllerProps.record && controllerProps.record.enabled &&
              <BooleanField label="resources.User.fields.enabled" source="enabled" allowEmpty />
            }

            {controllerProps.record && controllerProps.record.todosValues &&
              <ReferenceArrayField reference="system/ToDoItem" target="user" label="resources.User.fields.todos" source="todosValues" allowEmpty >
                <ReferenceField label={translate("resources.ToDoItem.name", { smart_count: 1 })} source="id" reference="system/ToDoItem" allowEmpty linkType="show" >
                  <TextField source="name" />
                </ReferenceField>
                {/* <DependentField resolve={showIfExists('name')} source="name" scoped > */}
                <TextField label="resources.ToDoItem.fields.name" source="name" allowEmpty />
                {/* </DependentField> */}
                {/* <DependentField resolve={showIfExists('description')} source="description" scoped > */}
                <TextField label="resources.ToDoItem.fields.description" source="description" allowEmpty />
                {/* </DependentField> */}
                {/* <DependentField resolve={showIfExists('done')} source="done" scoped > */}
                <BooleanField label="resources.ToDoItem.fields.done" source="done" allowEmpty />
                {/* </DependentField> */}
                {/* <DependentField resolve={showIfExists('dueToDate')} source="dueToDate" scoped > */}
                <DateField label="resources.ToDoItem.fields.dueToDate" source="dueToDate" allowEmpty />
                {/* </DependentField> */}
                {/* <DependentField resolve={showIfExists('published')} source="published" scoped > */}
                <BooleanField label="resources.ToDoItem.fields.published" source="published" allowEmpty />
                {/* </DependentField> */}
              </ReferenceArrayField>
            }

            {controllerProps.record && controllerProps.record.filesValues &&
              <ReferenceArrayField reference="system/File" target="user" label="resources.User.fields.files" source="filesValues" allowEmpty >
                <ReferenceField label={translate("resources.File.name", { smart_count: 1 })} source="id" reference="system/File" allowEmpty linkType="show" >
                  <TextField source="path" />
                </ReferenceField>
                {/* <DependentField resolve={showIfExists('path')} source="path" scoped > */}
                <TextField label="resources.File.fields.path" source="path" />
                {/* </DependentField> */}
                {/* <DependentField resolve={showIfExists('filename')} source="filename" scoped > */}
                <TextField label="resources.File.fields.filename" source="filename" allowEmpty />
                {/* </DependentField> */}
                {/* <DependentField resolve={showIfExists('mimetype')} source="mimetype" scoped > */}
                <TextField label="resources.File.fields.mimetype" source="mimetype" allowEmpty />
                {/* </DependentField> */}
                {/* <DependentField resolve={showIfExists('encoding')} source="encoding" scoped > */}
                <TextField label="resources.File.fields.encoding" source="encoding" allowEmpty />
                {/* </DependentField> */}
              </ReferenceArrayField>
            }

          </SimpleShowLayout>
        </ShowView>
      }
    </ShowController>
  );
};

ShowRecordView.contextTypes = {
  uix: PropTypes.object.isRequired,
  translate: PropTypes.func.isRequired,
}

export default ShowRecordView;
