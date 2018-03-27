import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { client } from 'oda-aor-rest';
import Loading from 'react-loading-animation'
import { Admin, Resource, Delete } from 'admin-on-rest';
import { englishMessages } from 'admin-on-rest';
import translation from './system/i18n';
import merge from 'lodash/merge';
import { AUTH_GET_PERMISSIONS } from 'admin-on-rest';
import authCheck from './../lib/authClient';

const messages = {
  'en': {
    ...merge(
      {},
      englishMessages,
      translation
    ),
  },
};

class OdaClientApp extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      role: 'public',
    }
  }

  componentDidMount() {
    this.context.authClient(AUTH_GET_PERMISSIONS).then(role => {
      if (role && role !== this.state.role) {
        this.setState({
          role,
        })
      } else if (!role) {
        this.setState({
          role: 'system',
        })
      }
    });
  }

  getChildContext() {
    return {
      uix: this.context.uix[this.state.role],
    }
  }

  render() {
    const { restClient, authClient, uix } = this.context;
    if (!restClient) {
      return <div className="loading-component"><Loading /></div>;
    }

    return (
      <Admin
        {...this.props}
        messages={messages}
        locale="en"
        authClient={authClient}
        restClient={restClient}>
        {role => Object.keys(uix[role]).map(resource =>
          <Resource
            key={resource}
            show={uix[role][resource].Show}
            name={resource}
            edit={uix[role][resource].Edit}
            create={uix[role][resource].Create}
            list={uix[role][resource].List}
            remove={Delete}
          />
        )}
      </Admin>
    );
  }
}



OdaClientApp.contextTypes = {
  uix: PropTypes.object.isRequired,
  authClient: PropTypes.func.isRequired,
  restClient: PropTypes.func.isRequired,
}

OdaClientApp.childContextTypes = {
  uix: PropTypes.object.isRequired,
}

export default OdaClientApp;
