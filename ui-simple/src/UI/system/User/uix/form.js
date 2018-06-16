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
        <TextInput label="resources.User.fields.userName" source="userName"  validate={required()} />
        <TextInput label="resources.User.fields.password" source="password"  validate={required()} />
        <BooleanInput label="resources.User.fields.isAdmin" source="isAdmin"  allowEmpty />
        <BooleanInput label="resources.User.fields.isSystem" source="isSystem"  allowEmpty />
        <BooleanInput label="resources.User.fields.enabled" source="enabled"  allowEmpty />


        <ArrayInput label="resources.User.fields.todos" source="todosValues" allowEmpty >
          <SimpleFormIterator>
            <SelectInput
              source="todosType"
              label="uix.actionType.ExpectedTo"
              choices={manyRelAction}
              defaultValue={actionType.USE}
            />
            {/* <DependentInput resolve={selectorFor('todos')} scoped > */}
              <ReferenceInput label={translate("resources.ToDoItem.name", { smart_count: 1})} source="id" reference="system/ToDoItem" allowEmpty >
                <SelectInput optionText="name" />
              </ReferenceInput>
            {/* </DependentInput> */}
            {/* <DependentInput resolve={detailsFor('todos')} scoped > */}
              <TextInput label="resources.ToDoItem.fields.name" source="name" allowEmpty />
              <TextInput label="resources.ToDoItem.fields.description" source="description" allowEmpty />
              <BooleanInput label="resources.ToDoItem.fields.done" source="done" allowEmpty />
              <DateInput label="resources.ToDoItem.fields.dueToDate" source="dueToDate" allowEmpty />
              <BooleanInput label="resources.ToDoItem.fields.published" source="published" allowEmpty />
            {/* </DependentInput> */}
          </SimpleFormIterator>
        </ArrayInput>


        <ReferenceArrayInput label="resources.User.fields.files" source="filesIds" reference="system/File" allowEmpty >
          <SelectArrayInput options={{ fullWidth: true }} optionText="path" optionValue="id" />
        </ReferenceArrayInput>

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
        todos: {
          resource: 'ToDoItem',
          single: false,
        },
      }),
      finalizeForm,
    }),
)(Form);
