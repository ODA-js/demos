import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK, AUTH_GET_PERMISSIONS } from 'admin-on-rest';
import decode from './../lib/decode';

import gql from 'graphql-tag';

const loginQuery = gql`mutation login($username: String!, $password:String!) {
    loginUser(input: {userName: $username, password: $password}) {
      token
      role
    }
  }
`;

export default (apolloClient) => (type, params) => {
  // called when the user attempts to log in
  if (type === AUTH_LOGIN) {
    const apolloQuery = {
      mutation: loginQuery,
      variables: {
        ...params,
      }
    };
    return apolloClient
      .mutate(apolloQuery)
      .then((res) => {
        localStorage.setItem('authToken', res.data.loginUser.token);
        localStorage.setItem('role', res.data.loginUser.role);
      });
  }

  if (type === AUTH_GET_PERMISSIONS) {
    const role = localStorage.getItem('role');
    return Promise.resolve(role);
  }
  // called when the user clicks on the logout button
  if (type === AUTH_LOGOUT) {
    localStorage.removeItem('authToken');
    localStorage.setItem('role', 'public');
    return Promise.resolve();
  }
  // called when the API returns an error
  if (type === AUTH_ERROR) {
    const { status } = params;
    if (status === 401 || status === 403) {
      localStorage.removeItem('authToken');
      localStorage.setItem('role', 'public');
      return Promise.reject();
    }
    return Promise.resolve();
  }

  // called when the user navigates to a new location
  if (type === AUTH_CHECK) {
    let authToken = '';
    if (typeof localStorage !== 'undefined' && localStorage.authToken) {
      authToken = localStorage.authToken;
    };

    if (authToken) {
      let authTokenParsed = authToken.split('.')[1];
      let authTokenExp = (new Date(JSON.parse(decode(authTokenParsed).result).exp * 1000) - new Date()) / 1000

      return authTokenExp > 0
        ? Promise.resolve()
        : Promise.reject();
    } else {
      localStorage.setItem('role', 'public');
      return Promise.reject();
    }
  } else {
    return Promise.reject('Unknown method');
  }
};