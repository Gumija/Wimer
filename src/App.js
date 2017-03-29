import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Page from './app/Page';
import { Provider as MobxProvider } from 'mobx-react';
import DocumentStore from './app/stores/DocumentStore';


class App extends Component {
  render() {
    return (
      <MobxProvider documentStore={DocumentStore}>
        <MuiThemeProvider>
          <Page />
        </MuiThemeProvider>
      </MobxProvider>
    );
  }
}

export default App;
