import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TabbedForm, FormTab, TextInput } from 'react-admin';

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
        <FormTab label="resources.Follower.summary">
          <TextInput
            label="resources.Follower.fields.follower"
            source="follower"
            allowEmpty
          />
          <TextInput
            label="resources.Follower.fields.following"
            source="following"
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
