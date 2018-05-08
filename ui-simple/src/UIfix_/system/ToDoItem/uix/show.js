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
  const { Title } = uix['system/ToDoItem'];
  return (
    <ShowController title={<Title />} {...props}>
      {controllerProps =>
        <ShowView {...props} {...controllerProps}>
          <SimpleShowLayout {...props}>
            { controllerProps.record && controllerProps.record.name &&
              <TextField label="resources.ToDoItem.fields.name" source="name" allowEmpty />
            }
            { controllerProps.record && controllerProps.record.description &&
              <TextField label="resources.ToDoItem.fields.description" source="description" allowEmpty />
            }
            { controllerProps.record && controllerProps.record.done &&
              <BooleanField label="resources.ToDoItem.fields.done" source="done" allowEmpty />
            }
            { controllerProps.record && controllerProps.record.dueToDate &&
              <DateField label="resources.ToDoItem.fields.dueToDate" source="dueToDate" allowEmpty />
            }
            { controllerProps.record && controllerProps.record.published &&
              <BooleanField label="resources.ToDoItem.fields.published" source="published" allowEmpty />
            }

            { controllerProps.record && controllerProps.record.userId &&
              <ReferenceField label="resources.ToDoItem.fields.user" source="userId" reference="system/User" allowEmpty linkType="show" >
                <TextField source="userName" allowEmpty />
              </ReferenceField>
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
