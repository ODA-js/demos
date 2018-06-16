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
  ArrayField,
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
  const ToDoItem = uix['system/ToDoItem'];
  const File = uix['system/File'];

  return (
    <ShowController title={<Title />} {...props}>
      {controllerProps =>
        <ShowView {...props} {...controllerProps}>
          <SimpleShowLayout {...props}>
            { controllerProps.record && controllerProps.record.userName &&
              <TextField label="resources.User.fields.userName" source="userName" />
            }
            { controllerProps.record && controllerProps.record.isAdmin &&
              <BooleanField label="resources.User.fields.isAdmin" source="isAdmin" allowEmpty />
            }
            { controllerProps.record && controllerProps.record.isSystem &&
              <BooleanField label="resources.User.fields.isSystem" source="isSystem" allowEmpty />
            }
            { controllerProps.record && controllerProps.record.enabled &&
              <BooleanField label="resources.User.fields.enabled" source="enabled" allowEmpty />
            }

            { controllerProps.record && controllerProps.record.todosValues &&
            Array.isArray(controllerProps.record.todosValues) && controllerProps.record.todosValues.length > 0 &&
              <ArrayField reference="system/ToDoItem" target="user" label="resources.User.fields.todos" source="todosValues" allowEmpty >
                <ToDoItem.Grid />
              </ArrayField>
            }

            <ReferenceManyField label="resources.User.fields.files" reference="system/File" target="user" source="id" allowEmpty >
              <File.Grid />
            </ReferenceManyField>

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
