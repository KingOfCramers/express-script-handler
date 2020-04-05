import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import 'normalize.css/normalize.css';

import { PersistGate } from 'redux-persist/integration/react'
const { store, persistor } = configureStore();

import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { indigo, teal, red, grey } from "@material-ui/core/colors";
const theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: teal,
    error: red,
    grey
  },
});

const jsx = (
  <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MuiThemeProvider theme={theme}>
          <AppRouter />
        </MuiThemeProvider>
      </PersistGate>
  </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));
