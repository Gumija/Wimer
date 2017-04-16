import React, { Component } from 'react';
import DocumentService from './services/DocumentService';
import DocumentView from './DocumentView';

import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';

@withRouter
@inject('documentStore')
@observer
export default class DocumentViewContainer extends Component {

  constructor(props){
    super(props);
    this.state = {
      file: null,
    }
  }

  async componentDidMount() {
    // Load file into document object
    // eslint-disable-next-line
    let document = this.props.documentStore.docInfos.find((doc) => doc.id == this.props.match.params.id);
    if (document) {
      let file = await DocumentService.getFile(document);
      this.setState({file: file});
    }
  }

  render() {
    // eslint-disable-next-line
    let document = this.props.documentStore.docInfos.find((doc) => doc.id == this.props.match.params.id)
    return (<DocumentView document={document} file={this.state.file}/>);
  }
}