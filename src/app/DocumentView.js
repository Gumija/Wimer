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
        <p className="section-header">{this.props.document.title}</p>
        <p>{this.props.document.file}</p>
      </div >
    );
  }
}

DocumentView.propTypes = {
  document: React.PropTypes.object.isRequired,
}