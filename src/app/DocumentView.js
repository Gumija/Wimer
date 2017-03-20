import React, { Component } from 'react';
// import './DocumentView.css';

export default class DocumentView extends Component {

  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    return (
      /* Used to center stuff. This will be Navigated */
      <div className="body">
        <p className="section-header">Document {this.props.match.params.id}</p>
      </div >
    );
  }
}