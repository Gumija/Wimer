import React, { Component } from 'react';
import DocumentService from './services/DocumentService';
import DocumentView from './DocumentView';

import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';

@withRouter
@inject('documentStore')
@observer
export default class DocumentViewContainer extends Component {

  async componentWillMount() {
    await DocumentService.getDocument(this.props.match.params.id);
    let document = this.props.documentStore.docInfos.find((doc) => doc.id === this.props.match.params.id);    
    this.props.documentStore.setCurrentFile({ id: document.id, file: await DocumentService.getFile(document) })
  }

  render() {
    // eslint-disable-next-line
    let document = this.props.documentStore.docInfos.find((doc) => doc.id === this.props.match.params.id);
    let loading = document && this.props.documentStore.currentFile &&
      document.id === this.props.documentStore.currentFile.id;
    return (<DocumentView document={document} file={this.props.documentStore.currentFile} loading={loading} />);
  }
}