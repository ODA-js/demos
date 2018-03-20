import React, { Component } from 'react';

import { ApolloProvider } from 'react-apollo';
import Dashboard from './Dashboard/'

import { Admin } from './UI/system';
// import { Admin } from './UIoverride';
import { ui } from 'oda-aor-rest';
import AutoFormProvider from './lib/adminAutoFormProvider';
// import { Resources, uix } from './UIoverride';
import { Resources, uix } from './UI/system';
import apolloClient from './lib/apollo';

const client = apolloClient({ uri: process.env.REACT_APP_API_URL });
class App extends Component {
  render() {
    return (
      <AutoFormProvider client={client} resources={new Resources()} uix={uix} >
        <Admin
          customSagas={[ui.sagas.monitorChanges,]}
          title="SW-API"
          dashboard={Dashboard}
        />
      </AutoFormProvider>
    );
  }
}

export default App;
