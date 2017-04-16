
import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {
  Link,
} from 'react-router-dom';

export default class UserManagerment extends Component {

  loginPressed = async () => {
    // let res = await fetch('/auth/google/');
    // console.log(res);
  }

  render() {
    return (
      <div>
        <a href='/auth/google'>Login with google</a>
      <Link to={'/auth/google'}>
        <RaisedButton onTouchTap={this.LoginPressed} label="Login" style={{ marginLeft: 12 }} />
      </Link>
      </div>
    );
  }
}