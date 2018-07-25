import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  TabbedForm,
  FormTab,
  TextInput,
  DateInput,
  BooleanInput,
  ReferenceInput,
  SelectInput,
  AutocompleteInput,
  required,
  FileInput,
  FileField,
} from 'react-admin';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';

import compose from 'recompose/compose';
import { actions, consts } from 'oda-ra-ui';
import { components } from 'oda-ra-ui';
const { JSONInput } = components;

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
      <TabbedForm {...props}>
        <FormTab label="resources.ToDoItem.summary">
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
          <JSONInput
            label="resources.ToDoItem.fields.location"
            source="location"
            allowEmpty
          />
          <FileInput label="file" source="file">
            <FileField source="src" title="title" />
          </FileInput>
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
        </FormTab>
      </TabbedForm>
    );
  }
}

const formName = 'record-form';
const selector = formValueSelector(formName);

Form.contextTypes = {
  translate: PropTypes.func.isRequired,
  initForm: PropTypes.func.isRequired,
  finalizeForm: PropTypes.func.isRequired,
};

export default compose(
  connect(
    state => ({
      user: selector(state, 'user'),
      userId: selector(state, 'userId'),
      userType: selector(state, 'userType'),
    }),
    {
      initForm: initForm('record-form', {
        user: {
          resource: 'User',
          single: true,
        },
      }),
      finalizeForm,
    },
  ),
)(Form);
