import React, { Component } from 'react';
import FileService from './services/FileService';
import DocumentView from './DocumentView';

import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';

@withRouter
@inject('documentStore')
@observer
export default class DocumentViewContainer extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    // Load file into document object
    // eslint-disable-next-line
    let document = this.props.documentStore.docInfos.find((doc) => doc.id == this.props.match.params.id)
    document.file = FileService.getFileFromUrl(document.fileUrl);
  }

  render() {
    // eslint-disable-next-line
    let document = this.props.documentStore.docInfos.find((doc) => doc.id == this.props.match.params.id)
    return (<DocumentView document={document} />);
  }
}

DocumentView.propTypes = {
  document: React.PropTypes.object.isRequired,
}