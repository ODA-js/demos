import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ArrayInput,
  SimpleFormIterator,
  ReferenceInput,
  SelectInput,
  ReferenceArrayInput,
  SelectArrayInput,
  SimpleForm,
  TextInput,
  LongTextInput,
  DateInput,
  NumberInput,
  BooleanInput,
  required,
  AutocompleteInput,
} from "react-admin";
import RichTextInput from 'ra-input-rich-text';

import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import compose from 'recompose/compose';
import { consts, actions, show  } from 'oda-ra-ui';

// const {
  // DependentInput,
  // EmbeddedInput,
  // GrouppedInput,
  // Label,
  // AutocompleteInput
// } = ui.components;

const actionType = consts.actionType;
const initForm = actions.initForm;
const finalizeForm = actions.finalizeForm;
const { selectorFor, detailsFor } = show;

class Form extends Component {
  componentWillMount() {
    this.props.initForm();
  }
  componentWillUnmount() {
    this.props.finalizeForm();
  }

  render() {
    const { props } = this;
    const singleRelActions = props.singleRelActions;
    const manyRelAction = props.manyRelActions;
    const { translate } = this.context;
    return (
      <SimpleForm {...props} >
        <TextInput label="resources.File.fields.path" source="path"  validate={required} />
        <TextInput label="resources.File.fields.filename" source="filename"  allowEmpty />
        <TextInput label="resources.File.fields.mimetype" source="mimetype"  allowEmpty />
        <TextInput label="resources.File.fields.encoding" source="encoding"  allowEmpty />

        <ReferenceInput label="resources.File.fields.user" source="userId" reference="system/User" allowEmpty >
          <AutocompleteInput optionText="userName" />
        </ReferenceInput>

      </SimpleForm>);
  }
}

const formName = 'record-form';
const selector = formValueSelector(formName);

Form.contextTypes = {
  translate: PropTypes.func.isRequired,
}

export default compose(
  connect(
    state => ({
    }), {
      initForm: initForm('record-form', {
      }),
      finalizeForm,
    }),
)(Form);
