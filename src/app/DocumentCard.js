import React, { Component } from 'react';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import TouchRipple from 'material-ui/internal/TouchRipple';
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
              onTouchTap={(e) => { e.stopPropagation(); alert('icon'); }}
            />
            <FlatButton
              icon={<FontIcon className="material-icons">delete</FontIcon>}
            />
            <RaisedButton>
              OPEN
            </RaisedButton>
          </CardActions>
      </Card>
    );
  }
}

DocumentCard.propTypes = {
  document: React.PropTypes.object.isRequired,
}