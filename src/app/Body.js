import React, { Component } from 'react';
import DocumentCard from './DocumentCard';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FontIcon from 'material-ui/FontIcon';
import './Body.css';

export default class Body extends Component {

  constructor() {
    super();
    let doc = {
      title: "Analízis II.",
      preview: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nisl metus, imperdiet sed varius vel, venenatis in elit. Duis faucibus ultrices nisi, in semper sapien feugiat non. Mauris auctor nulla eget suscipit commodo. Fusce scelerisque eros erat, non cursus lacus facilisis non. Nunc elementum euismod neque et tincidunt. ",
      last_opened: new Date()
    };
    this.state = {
      recent: [
        doc, doc, doc
      ],
      uploads: [
        doc, doc, doc
      ]
    }
  }

  componentWillMount() {

  }

  render() {
    return (
      /* Used to center stuff. This will be Navigated */
      <div className="body">
        <p className="section-header">Recent</p>
        <div className="card-container">
          {this.state.recent.map((doc) =>
            <DocumentCard document={doc} />
          )}
        </div>
        <p className="section-header">Uploads</p>
        <div className="card-container">
          {this.state.uploads.map((doc) =>
            <DocumentCard document={doc} />
          )}
        </div>
        <FloatingActionButton className="absolute-fab">  
          <FontIcon className="material-icons">add</FontIcon>
        </FloatingActionButton>
      </div >
    );
  }
}