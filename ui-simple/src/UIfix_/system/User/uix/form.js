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
  FormDataConsumer,
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
        <TextInput label="resources.User.fields.userName" source="userName" validate={required()} />
        <TextInput label="resources.User.fields.password" source="password" validate={required()} />
        <BooleanInput label="resources.User.fields.isAdmin" source="isAdmin" allowEmpty />
        <BooleanInput label="resources.User.fields.isSystem" source="isSystem" allowEmpty />
        <BooleanInput label="resources.User.fields.enabled" source="enabled" allowEmpty />
        <ArrayInput label="resources.User.fields.todos" source="todosValues" allowEmpty >
          <SimpleFormIterator>
            <SelectInput
              source="todosType"
              label="uix.actionType.ExpectedTo"
              choices={manyRelAction}
              defaultValue={actionType.USE}
            />
            <FormDataConsumer>
              {({ formData, ...rest }) => {
                debugger;
                const { source } = rest;
                let root = source ? source.split('.') : []; root.pop();
                root = root.join('.');
                console.log(rest.source);
                selectorFor('todos')
                return (
                  <ReferenceInput {...rest} label={translate("resources.ToDoItem.name", { smart_count: 1 })} source="id" reference="system/ToDoItem" allowEmpty >
                    <SelectInput optionText="name" />
                  </ReferenceInput>
                )
              }
              }
            </FormDataConsumer>
          </SimpleFormIterator>
        </ArrayInput>
      </SimpleForm >);
  }
}

const formName = 'record-form';
const selector = formValueSelector(formName);

Form.contextTypes = {
  translate: PropTypes.func.isRequired,
}

Form.propTypes = {
  singleRelActions: PropTypes.any,
  manyRelActions: PropTypes.any,
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
