import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from './providers/Theme.provider';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

ReactDOM.render(
  <ThemeProvider>
    <CssBaseline>
      <Router history={history}>
        <App />
      </Router>
    </CssBaseline>
  </ThemeProvider>,
  document.getElementById('root')
);
