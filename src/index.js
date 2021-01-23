import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from './providers/Theme.provider';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { UserProvider } from './providers/User.provider';

const history = createBrowserHistory();

const client = new ApolloClient({
  uri: 'https://dicero-be.herokuapp.com/graphql' || 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ThemeProvider>
    <CssBaseline>
      <ApolloProvider client={client}>
        <Router history={history}>
          <UserProvider>
            <App />
          </UserProvider>
        </Router>
      </ApolloProvider>
    </CssBaseline>
  </ThemeProvider>,
  document.getElementById('root')
);
