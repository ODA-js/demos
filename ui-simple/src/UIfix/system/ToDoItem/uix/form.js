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
import { consts, actions, show } from '../../../../lib/ui';

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
        <TextInput label="resources.ToDoItem.fields.name" source="name" allowEmpty />
        <TextInput label="resources.ToDoItem.fields.description" source="description" allowEmpty />
        <BooleanInput label="resources.ToDoItem.fields.done" source="done" allowEmpty />
        <DateInput label="resources.ToDoItem.fields.dueToDate" source="dueToDate" allowEmpty />
        <BooleanInput label="resources.ToDoItem.fields.published" source="published" allowEmpty />

        <ReferenceInput label="resources.ToDoItem.fields.user" source="userId" reference="system/User" allowEmpty >
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
