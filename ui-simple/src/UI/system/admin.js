import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { client } from 'oda-ra-data-provider';
import Loading from 'react-loading-animation'
import { Admin, Resource, Delete } from 'react-admin';
import { englishMessages } from 'react-admin';
import translation from './i18n';
import merge from 'lodash/merge';

const messages = {
  'en': {
    ...merge(
      {},
      englishMessages,
      translation
    ),
  },
};

const i18nProvider = locale => messages[locale];

class OdaClientApp extends Component {
  render() {
    const { restClient, authClient, uix } = this.context;
    if (restClient === null || restClient === undefined) {
      return <div className="loading-component"><Loading /></div>;
    }

    return (
      <Admin
        {...this.props}
        locale="en"
        i18nProvider={i18nProvider}
        authProvider={authClient}
        dataProvider={restClient}>
        {role => Object.keys(uix)
          .filter(resource => uix[resource].role === role)
          .map(resource => <Resource
            key={resource}
            show={uix[resource].Show}
            name={resource}
            edit={uix[resource].Edit}
            create={uix[resource].Create}
            list={uix[resource].List}
            remove={Delete}
            options={{ label: `resources.${uix[resource].name}.name` }}
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

export default OdaClientApp;
