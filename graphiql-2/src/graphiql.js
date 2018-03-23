import React from 'react';
import GraphiQL from 'graphiql';
import ReactCountdownClock from 'react-countdown-clock';

import UploadModal from './uploader_modal';
import LoginFormInline from './login_form_inline';
import { SubscriptionClient } from 'subscriptions-transport-ws';

import {
  execute,
} from 'apollo-link-core';

import link from './link';

var search = window.location.search;
var parameters = {};

let authToken = '';
if (typeof localStorage !== 'undefined' && localStorage.authToken) {
  authToken = localStorage.authToken;
};

// class AuthInput extends React.Component {
//   render () {
//     return (
//       <div className="input-field-wrap" style={{float: "right"}}>
//         <input
//           style={{
//             fontSize: "12px",
//             color: "#868686",
//             lineHeight: "20px",
//             width: "400px",
//             marginLeft: "14px",
//             marginRight: "14px",
//             textAlign: "center",
//             border: "solid 1px #c7c7c7",
//             borderRadius: "4px"
//           }}
//           className="input-field"
//           type="text"
//           value={this.props.token}
//           placeholder="Auth token..."
//           onChange={this.props.onChange}
//         />
//       </div>
//     )
//   }
// };

// function handleChangeAuthInput (event) {
//   event.preventDefault();
//   authToken=event.target.value;
//   localStorage.authToken = authToken;
// };

search.substr(1).split('&').forEach(function (entry) {
  var eq = entry.indexOf('=');
  if (eq >= 0) {
    parameters[decodeURIComponent(entry.slice(0, eq))] = decodeURIComponent(entry.slice(eq + 1));
  }
});

// if variables was provided, try to format it.
if (parameters.variables) {
  try {
    parameters.variables =
      JSON.stringify(JSON.parse(parameters.variables), null, 2);
  } catch (e) {
    // Do nothing, we want to display the invalid JSON as a string, rather
    // than present an error.
  }
}

// When the query and variables string is edited, update the URL bar so
// that it can be easily shared
function onEditQuery(newQuery) {
  parameters.query = newQuery;
  updateURL();
}

function onEditVariables(newVariables) {
  parameters.variables = newVariables;
  updateURL();
}

function onEditOperationName(newOperationName) {
  parameters.operationName = newOperationName;
  updateURL();
}

function updateURL() {
  var newSearch = '?' + Object.keys(parameters).filter(function (key) {
    return Boolean(parameters[key]);
  }).map(function (key) {
    return encodeURIComponent(key) + '=' +
      encodeURIComponent(parameters[key]);
  }).join('&');
  window.history.replaceState(null, null, newSearch);
}

function url_base64_decode(str) {
  var output = str.replace(/-/g, '+').replace(/_/g, '/');
  switch (output.length % 4) {
    case 0:
      break;
    case 2:
      output += '==';
      break;
    case 3:
      output += '=';
      break;
    default:
      throw new Error('Illegal base64url string!');
  }
  var result = window.atob(output); //polifyll https://github.com/davidchambers/Base64.js
  try {
    return decodeURIComponent(escape(result));
  } catch (err) {
    return result;
  }
}

function decode(base64json) {
  var json = null, error = null;
  try {
    json = url_base64_decode(base64json);
    json = JSON.stringify(JSON.parse(json), undefined, 2);
  } catch (e) {
    error = e;
  }
  return { result: json, error: error };
};

// Defines a GraphQL fetcher using the fetch API. You're not required to
// use fetch, and could instead implement graphQLFetcher however you like,
// as long as it returns a Promise or Observable.


// Render <GraphiQL /> into the body.
// See the README in the top level of this module to learn more about
// how you can customize GraphiQL by providing different values or
// additional child elements.
const GraphiQLComponent = ({ data, actions }) => {
  var authTokenExp;
  if (authToken) {
    let authTokenParsed = authToken.split('.')[1];
    authTokenExp = (new Date(JSON.parse(decode(authTokenParsed).result).exp * 1000) - new Date()) / 1000
  };

  const subscriptionClient = new SubscriptionClient(process.env.REACT_APP_WS_URL, {
    reconnect: true,
    connectionParams: {
      authToken,
    }
  });

  return (
    <GraphiQL
      fetcher={(operation) => execute(link(process.env.REACT_APP_API_URL, subscriptionClient), operation)}
      query={parameters.query}
      variables={parameters.variables}
      operationName={parameters.operationName}
      onEditQuery={onEditQuery}
      onEditVariables={onEditVariables}
      onEditOperationName={onEditOperationName}
    >
      <GraphiQL.Logo>
        <UploadModal />
        <LoginFormInline
          data={data}
          actions={actions}
        />
        <div className="auth-token-exp">
          {
            authTokenExp ?
              <ReactCountdownClock
                seconds={authTokenExp}
                color="#000"
                alpha={0.9}
                size={50}
                onComplete={() => {
                  if (typeof localStorage !== 'undefined') {
                    localStorage.setItem('authToken', '');
                    localStorage.setItem('authTokenExp', 0);
                  }
                  if (typeof window.location !== 'undefined') {
                    window.location.reload();
                  }
                }}
              /> :
              ''
          }

        </div>
      </GraphiQL.Logo>
    </GraphiQL>
  )
}
export default GraphiQLComponent;