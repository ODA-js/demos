import React from 'react';
import ReactDOM from 'react-dom';
import GraphiQLComponent from './graphiql';
// import Header from './header';

var authDataSet = {
  username: '',
  password: '',
};

const actions = {
  changeAuthData: (username, password) => {
    authDataSet.username = username;
    authDataSet.password = password;
    ReactDOM.render(
      <div className="main">
        <div id="graphiql">
          <GraphiQLComponent
            data={authDataSet}
            actions={actions}
          />
        </div>
      </div>,
      document.getElementById('content')
    );
  },
}

ReactDOM.render(
  <div className="main">
    {
      // <div className="header">
      //   <Header
      //     data={authDataSet}
      //     actions={actions}
      //   />
      // </div>
    }
    <div id="graphiql">
      <GraphiQLComponent
        data={authDataSet}
        actions={actions}
      />
    </div>
  </div>,
  document.getElementById('content')
);