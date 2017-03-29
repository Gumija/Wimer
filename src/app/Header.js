import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import BackIcon from 'material-ui/svg-icons/navigation/arrow-back';
import Versions from './HeaderModules/Versions';
import Share from './HeaderModules/Share';
import UserManagement from './HeaderModules/UserManagement';

import {
  Route,
  withRouter,
  Link,
} from 'react-router-dom';
import { inject, observer } from 'mobx-react';

@withRouter
@inject('documentStore')
@observer
export default class Header extends Component {

  render() {
    return (
      <div>
        <Route exact path="/" children={() =>
          <AppBar
            title='Wimer'
            iconElementLeft={
              <Link to={`/document/1`}><IconButton><MenuIcon /></IconButton></Link>
            } />
        } />
        <Route path="/document/:id" children={(props) =>
          <AppBar
            // eslint-disable-next-line
            title={props.match ? this.props.documentStore.docInfos.find((d) => d.id == props.match.params.id).title : "NULL"}
            iconElementLeft={
              <IconButton onTouchTap={() => props.history.goBack()}><BackIcon /></IconButton>
            }
            iconElementRight={
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Versions />
                <Share />
                <UserManagement />
              </div>
            } />
        } />
      </div>
    );
  }
}