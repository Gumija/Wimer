import React, { Component } from 'react';
import DocumentCard from './DocumentCard';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FontIcon from 'material-ui/FontIcon';
import './Home.css';

import {inject, observer} from 'mobx-react';

@inject("documentStore")
@observer
export default class Home extends Component {

  componentWillMount() {

  }

  render() {
    return (
      /* Used to center stuff. This will be Navigated */
      <div className="body">
        <p className="section-header">Recent</p>
        <div className="card-container">
          {this.props.documentStore.recentDocs.map((doc) =>
            <DocumentCard document={doc} key={doc.id}/>
          )}
        </div>
        <p className="section-header">Uploads</p>
        <div className="card-container">
          {this.props.documentStore.uploadedDocs.map((doc) =>
            <DocumentCard document={doc}  key={doc.id}/>
          )}
        </div>
        <FloatingActionButton className="absolute-fab">  
          <FontIcon className="material-icons">add</FontIcon>
        </FloatingActionButton>
      </div >
    );
  }
}