import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import BackIcon from 'material-ui/svg-icons/navigation/arrow-back';
import Versions from './HeaderModules/Versions';
import Share from './HeaderModules/Share';
import UserManagement from './HeaderModules/UserManagement';
import Dots from 'react-activity/lib/Dots';

import {
  withRouter,
} from 'react-router-dom';
import { inject, observer } from 'mobx-react';

@withRouter
@inject('documentStore')
@observer
export default class Header extends Component {

  render() {
    return (
      <AppBar
        title={this.props.match ?
          <div >
            {this.props.documentStore.docInfos.find((d) => d.id === parseInt(this.props.match.params.id, 10)) ?
              <div>
                <p style={{ margin: 0, display: 'inline-block' }}>
                  {this.props.documentStore.docInfos.find((d) => d.id === parseInt(this.props.match.params.id, 10)).title}
                </p>
                <IconButton>
                  <FontIcon className="material-icons" color={'white'}>edit</FontIcon>
                </IconButton>
              </div>

              :

              <Dots size={16} color="#FFF" />
            }
          </div>
          : "NULL"}
        iconElementLeft={
          <IconButton onTouchTap={() => this.props.history.goBack()}><BackIcon /></IconButton>
        }
        iconElementRight={
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Versions />
            <Share />
            <UserManagement />
          </div>
        }
        style={{ position: 'fixed', top: 0 }} />
    );
  }
}