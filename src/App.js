import React, { Component } from 'react';
import { observer } from 'mobx-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Page from './app/Page';

@observer
class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Page />
      </MuiThemeProvider>
    );
  }
}

export default App;
