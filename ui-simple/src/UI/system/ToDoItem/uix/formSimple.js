import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  
  SimpleForm,
  
  TextInput,
  DateInput,
  BooleanInput,
  ReferenceInput,
  SelectInput,
  AutocompleteInput,
  required,
} from "react-admin";

import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';

import compose from 'recompose/compose';
import { actions, consts } from 'oda-ra-ui';

const initForm = actions.initForm;

const finalizeForm = actions.finalizeForm;

class Form extends Component {
  componentWillMount() {
    this.props.initForm();
  }
  componentWillUnmount() {
    this.props.finalizeForm();
  }

  render() {
    const { props } = this;
    const actionType = consts.actionType;
    const singleRelActions = props.singleRelActions;


    return (
      <SimpleForm {...props} >
        <TextInput
          label="resources.ToDoItem.fields.name"
          source="name"
            allowEmpty 
        />
        <TextInput
          label="resources.ToDoItem.fields.updatedBy"
          source="updatedBy"
            allowEmpty 
        />
        <TextInput
          label="resources.ToDoItem.fields.description"
          source="description"
            allowEmpty 
        />
        <DateInput
          label="resources.ToDoItem.fields.updatedAt"
          source="updatedAt"
            allowEmpty 
        />
        <BooleanInput
          label="resources.ToDoItem.fields.done"
          source="done"
            allowEmpty 
        />
        <DateInput
          label="resources.ToDoItem.fields.dueToDate"
          source="dueToDate"
            allowEmpty 
        />
        <BooleanInput
          label="resources.ToDoItem.fields.published"
          source="published"
            allowEmpty 
        />    
        <ReferenceInput label="resources.ToDoItem.fields.user" source="userId" reference="system/User" allowEmpty >
          <AutocompleteInput optionText="userName" />
        </ReferenceInput>
        <SelectInput
          source="userType"
          label="uix.actionType.ExpectedTo"
          choices={singleRelActions}
          defaultValue={actionType.USE}
        />
        <TextInput
          label="resources.User.fields.userName"
          source="userName"
          validate={required()} 
        />
        <TextInput
          label="resources.User.fields.password"
          source="password"
          validate={required()} 
        />
        <BooleanInput
          label="resources.User.fields.isAdmin"
          source="isAdmin"
          allowEmpty 
        />
        <BooleanInput
          label="resources.User.fields.isSystem"
          source="isSystem"
          allowEmpty 
        />
        <BooleanInput
          label="resources.User.fields.enabled"
          source="enabled"
          allowEmpty 
        />
        <TextInput
          label="resources.User.fields.updatedBy"
          source="updatedBy"
          allowEmpty 
        />
        <DateInput
          label="resources.User.fields.updatedAt"
          source="updatedAt"
          allowEmpty 
        />
      </SimpleForm>
    );
  }
}

const formName = 'record-form';
const selector = formValueSelector(formName);


Form.contextTypes = {
  translate: PropTypes.func.isRequired,
  initForm: PropTypes.func.isRequired,
  finalizeForm: PropTypes.func.isRequired,
}

export default compose(
  connect(
    state => ({
      user: selector(state, 'user'),
      userId: selector(state, 'userId'),
      userType: selector(state, 'userType'),
    }), {
      initForm: initForm('record-form', {
        user: {
          resource: 'User',
          single: true,
        },
      }),
      finalizeForm,
    }),
)(Form);
