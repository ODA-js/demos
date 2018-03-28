import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as invariant from 'invariant';
import { ApolloProvider } from 'react-apollo';
import authClient from './authClient';
import { client } from 'oda-aor-rest';
import { AUTH_GET_PERMISSIONS } from 'admin-on-rest';

export default class AdminAutoFormsProvider extends Component {
  constructor(props, context) {
    super(props, context);
    invariant(props.client, 'expected `client` prop initilization');
    invariant(props.uix, 'expected `uix` prop initilization');
    invariant(props.resources, 'expected `resources` prop initilization');

    const auth = authClient(props.client);
    this.state = {
      authClient: auth,
      restClient: client({
        client: props.client,
        resources: props.resources,
        role: () => auth(AUTH_GET_PERMISSIONS),
      }),
    };
  }
  getChildContext() {
    return {
      uix: this.props.uix,
      authClient: this.state.authClient,
      restClient: this.state.restClient,
    }
  }
  render() {
    return (
      <ApolloProvider client={this.props.client}>
        {React.Children.only(this.props.children)}
      </ApolloProvider>
    )
  }
}

AdminAutoFormsProvider.childContextTypes = {
  uix: PropTypes.object.isRequired,
  authClient: PropTypes.func.isRequired,
  restClient: PropTypes.func.isRequired,
}