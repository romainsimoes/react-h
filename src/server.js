import React from 'react';
import ReduxServer from './reduxServer';
import createSagaMiddleware from 'redux-saga';
import FavIcon from './resources/img/favicon.ico';

const appInitialState = {};

export default class Server {
  constructor({ addPlugin }) {

    const reduxServer = new ReduxServer({ addPlugin });
    addPlugin(reduxServer);
  }

  apply(serverHandler) {
    serverHandler
      .hooks
      .reduxInitialState
      .tapPromise('AppInitialState', async ({ getInitialState, setInitialState }) => {
        const initialState = Object.assign({}, getInitialState(), appInitialState);
        console.log(initialState)
        setInitialState(initialState);
      });

    serverHandler.hooks.beforeHtmlRender.tap('AddGoogleAnalytics', (Application) => {
      Application.htmlProps.head.push(
        <link key="favicon" rel="shortcut icon" type="image/x-icon" href={FavIcon} />,
        <script key="addGoogleAnalytics" async src="https://www.google-analytics.com/analytics.js" />,
      );
      return Application;
    });
  }
}
