import React, { Component } from 'react';

// import { Admin } from './UI/system';
import { Admin } from './UIfix/system';
// import { Admin } from './UIoverride';
import { sagas } from './lib/ui';
import AutoFormProvider from './lib/adminAutoFormProvider';
// import { Resources, uix } from './UI/system';
import { Resources, uix } from './UIfix/system';
// import { uix, Resources } from './UIoverride';
import apolloClient from './lib/apollo';

const client = apolloClient({ uri: process.env.REACT_APP_API_URL });
class App extends Component {
  render() {
    return (
      <AutoFormProvider client={client} resources={new Resources()} uix={uix} >
        <Admin
          customSagas={[sagas.monitorChanges]}
          title="SW-API"
        />
      </AutoFormProvider>
    );
  }
}

export default App;
