import React from 'react';
import fetch from 'isomorphic-fetch';

import {
  Form,
  FormGroup,
  FormControl,
  Button
} from 'react-bootstrap';

import './login-form.css';

class LoginFormInline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: ''
    };

    // This binding is necessary to make `this` work in the callback
    this.onChange = this.onChange.bind(this);
    this.onLogin = this.onLogin.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  onChange(propName) {
    return (event) => {
      let data = this.state;
      data[propName] = event.target.value;
      this.setState(data);
    }
  }

  onLogin(event) {
    event.preventDefault();
    var data = this.state;
    let loginParams = {
      "query": `mutation loginUser(
          $userName:String!,
          $password:String!
        ) {
          loginUser( input: {
              userName: $userName,
              password: $password
          }) {
            token
          }
        }`,
      "variables": {
        "userName": data.userName,
        "password": data.password
      },
      "operationName": "loginUser"
    };
    return fetch('/graphql', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginParams),
      credentials: 'include',
    }).then(function (response) {
      return response.text();
    }).then(function (responseBody) {
      try {
        let authToken = JSON.parse(responseBody).data.loginUser.token;
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('authToken', authToken);
          localStorage.setItem('userName', data.userName);
        }
        if (typeof window.location !== 'undefined') {
          window.location.reload();
        }
      } catch (error) {
        return responseBody;
      }
    });
  }

  onLogout(event) {
    event.preventDefault();
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('authToken', '');
      localStorage.setItem('userName', '');
    }
    if (typeof window.location !== 'undefined') {
      window.location.reload();
    }
  }

  render() {
    let data = this.state;
    if (typeof localStorage !== 'undefined' && localStorage.authToken) {
      var authToken = localStorage.authToken;
      var userName = localStorage.userName;
    }
    return (
      (!authToken) ?
        <div>
          <Form className="form-inline login-form-inline">
            <div className="login-form-inline__input">
              <FormGroup className="fa-input-glyphicon">
                <FormControl
                  type="username"
                  placeholder="username"
                  name="username"
                  onChange={this.onChange('userName')}
                  value={(data && data.userName) || ''}
                />
                <FormControl.Feedback className="fa-input-glyphicon__icon">
                  <span className="fa fa-envelope form-control-feedback text-muted"></span>
                </FormControl.Feedback>
              </FormGroup>
            </div>
            <div className="login-form-inline__input">
              <FormGroup className="fa-input-glyphicon">
                <FormControl
                  type="password"
                  placeholder="password"
                  name="password"
                  onChange={this.onChange('password')}
                  value={(data && data.password) || ''}
                />
                <FormControl.Feedback className="fa-input-glyphicon__icon">
                  <span className="fa fa-lock form-control-feedback text-muted"></span>
                </FormControl.Feedback>
              </FormGroup>
            </div>
            <div className="login-form-inline__login-button">
              <Button
                type="submit"
                bsStyle="primary"
                className="btn-block"
                onClick={this.onLogin}
              >
                Login
              </Button>
            </div>
          </Form>
        </div>
        :
        <div>
          <Button
            type="submit"
            bsStyle="primary"
            className="btn-block"
            onClick={this.onLogout}
          >
            Logout {userName}
          </Button>
        </div>
    );
  }
}

export default LoginFormInline;