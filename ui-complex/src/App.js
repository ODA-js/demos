import React, { Component } from 'react';

import { ApolloProvider } from 'react-apollo';
import Dashboard from './Dashboard/'
import merge from 'lodash/merge';

import Admin from './UI/system/admin';
// import { Admin } from './UIoverride';
import { ui } from 'oda-aor-rest';
import AutoFormProvider from './lib/adminAutoFormProvider';
// import { Resources, uix } from './UIoverride';
import { Resources as SystemResource, uix as SystemUIX } from './UI/system';
import { Resources as OwnerResource, uix as OwnerUIX } from './UI/owner';
import { Resources as PublicResource, uix as PublicUIX } from './UI/public';
import apolloClient from './lib/apollo';

const resources = {
  system: new SystemResource(),
  owner: new OwnerResource(),
  public: new PublicResource(),
}

const uix = merge({}, SystemUIX, OwnerUIX, PublicUIX)

const client = apolloClient({ uri: process.env.REACT_APP_API_URL });
class App extends Component {
  render() {
    return (
      <AutoFormProvider client={client} resources={resources} uix={uix} >
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
