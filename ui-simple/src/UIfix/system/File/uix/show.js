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
  const { Title } = uix['system/File'];
  return (
    <Show title={<Title />} {...props} >
      <SimpleShowLayout {...props}>
        {/* <DependentField resolve={showIfExists('path')}> */}
          <TextField label="resources.File.fields.path" source="path" />
        {/* </DependentField> */}
        {/* <DependentField resolve={showIfExists('filename')}> */}
          <TextField label="resources.File.fields.filename" source="filename" allowEmpty />
        {/* </DependentField> */}
        {/* <DependentField resolve={showIfExists('mimetype')}> */}
          <TextField label="resources.File.fields.mimetype" source="mimetype" allowEmpty />
        {/* </DependentField> */}
        {/* <DependentField resolve={showIfExists('encoding')}> */}
          <TextField label="resources.File.fields.encoding" source="encoding" allowEmpty />
        {/* </DependentField> */}

        {/* <DependentField resolve={showIfNotEmptyRel('userId')} source="userId" > */}
          <ReferenceField label="resources.File.fields.user" source="userId" reference="system/User" allowEmpty linkType="show" >
            <TextField source="userName" allowEmpty />
          </ReferenceField>
        {/* </DependentField> */}

      </SimpleShowLayout>
    </Show>
  );
};

ShowView.contextTypes = {
  uix: PropTypes.object.isRequired,
  translate: PropTypes.func.isRequired,
}

export default ShowView;
