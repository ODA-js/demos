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
  const { Title } = uix['system/File'];
  return (
    <ShowController title={<Title />} {...props}>
      {controllerProps =>
        <ShowView {...props} {...controllerProps}>
          <SimpleShowLayout {...props}>
            { controllerProps.record && controllerProps.record.path &&
              <TextField label="resources.File.fields.path" source="path" />
            }
            { controllerProps.record && controllerProps.record.filename &&
              <TextField label="resources.File.fields.filename" source="filename" allowEmpty />
            }
            { controllerProps.record && controllerProps.record.mimetype &&
              <TextField label="resources.File.fields.mimetype" source="mimetype" allowEmpty />
            }
            { controllerProps.record && controllerProps.record.encoding &&
              <TextField label="resources.File.fields.encoding" source="encoding" allowEmpty />
            }

            { controllerProps.record && controllerProps.record.userId &&
              <ReferenceField label="resources.File.fields.user" source="userId" reference="system/User" allowEmpty linkType="show" >
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
