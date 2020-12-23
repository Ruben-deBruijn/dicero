import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from './providers/Theme.provider';

ReactDOM.render(
  <ThemeProvider>
    <CssBaseline>
      <App />
    </CssBaseline>
  </ThemeProvider>,
  document.getElementById('root')
);
