import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  
  SimpleForm,
  
  TextInput,
  DateInput,
  BooleanInput,
  ArrayInput,
  SimpleFormIterator,
  SelectInput,
  ReferenceInput,
  ReferenceArrayInput,
  SelectArrayInput,
  required,
} from "react-admin";

import { connect } from 'react-redux';
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

    const manyRelAction = props.manyRelActions;
    const { translate } = this.context;
    return (
      <SimpleForm {...props} >
        <TextInput
          label="resources.User.fields.userName"
          source="userName"
          validate={required()} 
        />
        <TextInput
          label="resources.User.fields.updatedBy"
          source="updatedBy"
          allowEmpty 
        />
        <TextInput
          label="resources.User.fields.password"
          source="password"
          validate={required()} 
        />
        <DateInput
          label="resources.User.fields.updatedAt"
          source="updatedAt"
          allowEmpty 
        />
        <BooleanInput
          defaultValue={false}
          label="resources.User.fields.isAdmin"
          source="isAdmin"
          allowEmpty 
        />
        <BooleanInput
          defaultValue={false}
          label="resources.User.fields.isSystem"
          source="isSystem"
          allowEmpty 
        />
        <BooleanInput
          defaultValue={true}
          label="resources.User.fields.enabled"
          source="enabled"
          allowEmpty 
        />    <ArrayInput 
          label="resources.User.fields.todos"
          source="todosValues"
          allowEmpty 
        >
          <SimpleFormIterator>
            <SelectInput
              source="todosType"
              label="uix.actionType.ExpectedTo"
              choices={manyRelAction}
              defaultValue={actionType.USE}
            />
            <ReferenceInput 
              label={translate("resources.ToDoItem.name", { smart_count: 1})}
              source="id"
              reference="system/ToDoItem"
              allowEmpty 
            >
              <SelectInput optionText="name" />
            </ReferenceInput>
            <TextInput
              label="resources.ToDoItem.fields.name"
              source="name"
              allowEmpty
            />
            <TextInput
              label="resources.ToDoItem.fields.description"
              source="description"
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
            <TextInput
              label="resources.ToDoItem.fields.updatedBy"
              source="updatedBy"
              allowEmpty
            />
            <DateInput
              label="resources.ToDoItem.fields.updatedAt"
              source="updatedAt"
              allowEmpty
            />
          </SimpleFormIterator>
        </ArrayInput>    
        <ReferenceArrayInput 
          label="resources.User.fields.files"
          source="filesIds"
          reference="system/File"
          allowEmpty 
        >
          <SelectArrayInput 
            options={{ fullWidth: true }}
            optionText="path"
            optionValue="id" 
          />
        </ReferenceArrayInput>
      </SimpleForm>
    );
  }
}


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
