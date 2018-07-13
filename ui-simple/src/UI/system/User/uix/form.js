import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  TabbedForm,
  FormTab,
  TextInput,
  required,
  DateInput,
  BooleanInput,
  ReferenceArrayInput,
  SelectArrayInput,
} from 'react-admin';

import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { actions } from 'oda-ra-ui';

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

    return (
      <TabbedForm {...props}>
        <FormTab label="resources.User.summary">
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
          />
        </FormTab>
        <FormTab label="resources.User.fields.todos">
          <ReferenceArrayInput
            label="resources.User.fields.todos"
            source="todosIds"
            reference="system/ToDoItem"
            allowEmpty>
            <SelectArrayInput
              options={{ fullWidth: true }}
              optionText="name"
              optionValue="id"
            />
          </ReferenceArrayInput>
        </FormTab>
        <FormTab label="resources.User.fields.files">
          <ReferenceArrayInput
            label="resources.User.fields.files"
            source="filesIds"
            reference="system/File"
            allowEmpty>
            <SelectArrayInput
              options={{ fullWidth: true }}
              optionText="path"
              optionValue="id"
            />
          </ReferenceArrayInput>
        </FormTab>
        <FormTab label="resources.User.fields.followings">
          <ReferenceArrayInput
            label="resources.User.fields.followings"
            source="followingsIds"
            reference="system/User"
            allowEmpty>
            <SelectArrayInput
              options={{ fullWidth: true }}
              optionText="userName"
              optionValue="id"
            />
          </ReferenceArrayInput>
        </FormTab>
        <FormTab label="resources.User.fields.followers">
          <ReferenceArrayInput
            label="resources.User.fields.followers"
            source="followersIds"
            reference="system/User"
            allowEmpty>
            <SelectArrayInput
              options={{ fullWidth: true }}
              optionText="userName"
              optionValue="id"
            />
          </ReferenceArrayInput>
        </FormTab>
      </TabbedForm>
    );
  }
}

Form.contextTypes = {
  translate: PropTypes.func.isRequired,
  initForm: PropTypes.func.isRequired,
  finalizeForm: PropTypes.func.isRequired,
};

export default compose(
  connect(
    state => ({}),
    {
      initForm: initForm('record-form', {}),
      finalizeForm,
    },
  ),
)(Form);
