import React, { Component } from 'react';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import './DocumentCard.css';

export default class DocumentCard extends Component {

  render() {
    return (
      <Card className="card">
        <CardTitle
          title={this.props.document.title}
        />
        <CardText>
          {this.props.document.preview}
        </CardText>
        <Divider />
        <CardActions className="card-actions">
          <FlatButton
            icon={<FontIcon className="material-icons">share</FontIcon>}
          />
          <FlatButton
            icon={<FontIcon className="material-icons">delete</FontIcon>}
          />
        </CardActions>
      </Card>
    );
  }
}

DocumentCard.propTypes = {
  document: React.PropTypes.object.isRequired,
}