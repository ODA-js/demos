import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  TabbedForm,
  FormTab,
  ReferenceInput,
  AutocompleteInput,
  TextInput,
  required,
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
        <FormTab label="resources.File.summary">
          <ReferenceInput
            label="resources.File.fields.user"
            source="userId"
            reference="system/User"
            allowEmpty>
            <AutocompleteInput optionText="userName" />
          </ReferenceInput>
          <TextInput
            label="resources.File.fields.path"
            source="path"
            validate={required()}
          />
          <TextInput
            label="resources.File.fields.filename"
            source="filename"
            allowEmpty
          />
          <TextInput
            label="resources.File.fields.mimetype"
            source="mimetype"
            allowEmpty
          />
          <TextInput
            label="resources.File.fields.encoding"
            source="encoding"
            allowEmpty
          />
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
