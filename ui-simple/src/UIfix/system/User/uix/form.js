import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ArrayInput,
  SimpleFormIterator,
  // ReferenceInput,
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
import get from 'lodash/get';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import compose from 'recompose/compose';
import { consts, actions, show } from 'oda-ra-ui';
import ReferenceInput from '../../../../lib/ReferenceInput';

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

const showDependsOn = (selector, comp) => ({ formData, ...rest }) => {
  const { source } = rest;
  let root = source ? source.split('.') : []; root.pop();
  root = root.join('.');
  if (selector(get(formData, root))) {
    return comp(rest);
  }
}

class Form extends Component {
  componentWillMount() {
    this.props.initForm();
  }
  componentWillUnmount() {
    this.props.finalizeForm();
  }

  render() {
    const {singleRelActions, manyRelActions: manyRelAction, initForm, ...formProps } = this.props;
    const { translate } = this.context;
    
    const showDetail = showDependsOn(detailsFor('todos'), rest =>
      <TextInput {...rest} label="resources.ToDoItem.fields.name" source="name" allowEmpty />
    );
    return (
      <SimpleForm {...formProps} >
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

            {/* <DependentInput resolve={selectorFor('todos')} scoped >*/}
            <ReferenceInput label={translate("resources.ToDoItem.name", { smart_count: 1 })} source="id" reference="system/ToDoItem" allowEmpty >
              <SelectInput optionText="name" />
            </ReferenceInput>
            {/*  </DependentInput> */}

            {/* <FormDataConsumer>{showDependsOn(selectorFor('todos'), rest => */}
              <TextInput label="resources.ToDoItem.fields.id" source="id" allowEmpty />
            {/* )} */}
            {/* </FormDataConsumer> */}

            {/* <FormDataConsumer>{showDependsOn(detailsFor('todos'), rest => */}
              <TextInput label="resources.ToDoItem.fields.description" source="description" allowEmpty />
            {/* )} */}
            {/* </FormDataConsumer> */}

            {/* <FormDataConsumer>{showDependsOn(detailsFor('todos'), rest => */}
              <BooleanInput label="resources.ToDoItem.fields.done" source="done" allowEmpty />
            {/* )} */}
            {/* </FormDataConsumer> */}

            {/* <FormDataConsumer>{showDependsOn(detailsFor('todos'), rest => */}
              <DateInput label="resources.ToDoItem.fields.dueToDate" source="dueToDate" allowEmpty />
            {/* )} */}
            {/* </FormDataConsumer> */}

            {/* <FormDataConsumer>{showDependsOn(detailsFor('todos'), rest => */}
              <BooleanInput label="resources.ToDoItem.fields.published" source="published" allowEmpty />
            {/* )} */}
            {/* </FormDataConsumer> */}

            <FormDataConsumer>{showDependsOn(detailsFor('todos'), rest =>
              <TextInput {...rest} label="resources.ToDoItem.fields.name" source="name" allowEmpty />
            )}
            </FormDataConsumer>
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
          resource: 'system/ToDoItem',
          single: false,
        },
      }),
      finalizeForm,
    }),
)(Form);
