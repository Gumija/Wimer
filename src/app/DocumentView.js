import React, { Component } from 'react';
import './DocumentView.css';

export default class DocumentView extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      /* Used to center stuff. This will be Navigated */
      <div className="document-view-container">
        <p className="section-header">{this.props.document.title}</p>
        <pre className="txtPresenter">{this.props.document.file}</pre>
      </div >
    );
  }
}

DocumentView.propTypes = {
  document: React.PropTypes.object.isRequired,
}