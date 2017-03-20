import React, { Component } from 'react';
// import './Body.css';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import Home from './Home';
import DocumentView from './DocumentView';

export default class Body extends Component {
  
  render() {
    return (
      /* Used to center stuff. This will be Navigated */
      <Router>
        <div className="body">
        <Route exact path="/" component={Home}/>
        <Route path="/document/:id" component={DocumentView} />
      </div >
      </Router>
    );
  }
}