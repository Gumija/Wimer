import React, { Component } from 'react';
import Header from './Header';
import Body from './Body';
import './Page.css';

export default class Page extends Component {

  render() {
    return (
      <div>
        <Header />
        <Body />
      </div>
    );
  }
}