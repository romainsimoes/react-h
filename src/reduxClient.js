import React from 'react';
import { AsyncSeriesHook } from 'tapable';
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import ReduxTapable from './tapable';
import { CookiesProvider } from 'react-cookie';
import Cookies from 'universal-cookie';
import { cloneDeep } from './util';
// import { ConnectedRouter } from 'connected-react-router';
// import AppShell from './app/containers/app/index';
import { createBrowserHistory } from 'history';
// import history from './app/utils/history';
import createReducer from './reducers';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';
import LanguageProvider from './app/containers/LanguageProvider';
import { translationMessages } from './i18n';
import { BrowserRouter } from "react-router-dom";
const clientHistory = createBrowserHistory();

export default class ReduxClient extends ReduxTapable {
  constructor() {
    super();
    this.hooks = {
      reduxInitialState: new AsyncSeriesHook(['state', 'application']),
    };
  }

  apply(clientHandler) {
    clientHandler.hooks.beforeLoadData.tapPromise(
      'CookiesToLoadData',
      async (setParams) => {
        const cookies = new Cookies();
        setParams('cookies', cookies);
      },
    );

    clientHandler.hooks.beforeRender.tapPromise('AddReduxProvider', async (app) => {
      const providerProps = {};
      // if (!this.reducers) return;

      let initialState = window.PAW__REDUX_PRELOADED_STATE;

      // Allow the passed state to be garbage-collected
      delete window.PAW__REDUX_PRELOADED_STATE;

      const state = {
        setInitialState: (iState) => {
          initialState = cloneDeep(iState);
        },
        getInitialState: () => {
          if (typeof initialState === 'undefined') return {};
          return cloneDeep(initialState);
        },
      };
      await new Promise(r => this.hooks.reduxInitialState.callAsync(state, app, r));
      // eslint-disable-next-line
      const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

      try {
        const reduxSagaMonitorOptions = {};

        // Create the store with two middlewares
        // 1. sagaMiddleware: Makes redux-sagas work
        // 2. routerMiddleware: Syncs the location/URL path to the state
        this.sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);
        this.middlewares = [this.sagaMiddleware]; //routerMiddleware(history)

        this.enhancers = composeEnhancers(...enhancers);
        this.reducers = createReducer();

        window.paw__reduxStore = window.paw__reduxStore || createStore(
          this.reducers,
          initialState,
          this.enhancers
        );

        providerProps.store = window.paw__reduxStore;
        providerProps.store.runSaga = this.sagaMiddleware.run;
        providerProps.store.injectedReducers = {}; // Reducer registry
        providerProps.store.injectedSagas = {};
      } catch (ex) {
        // console.log redux error
        // eslint-disable-next-line
        console.error(ex);
      }

      console.log('*** Client Side Rendering ***');

      // eslint-disable-next-line
      // app.children = (
      //   <Provider {...providerProps}>
      //       {app.children}
      //   </Provider>
      // );

      app.children = (
        <CookiesProvider>
          <Provider {...providerProps}>
            <LanguageProvider messages={translationMessages}>
              <BrowserRouter>
                {app.children}
              </BrowserRouter>
            </LanguageProvider>
          </Provider>
        </CookiesProvider>
      );
    });

    clientHandler.hooks.renderRoutes.tapPromise('AddAppShell', async ({ setRenderedRoutes, getRenderedRoutes }) => {
      setRenderedRoutes(
          <AppShell>
            { getRenderedRoutes() }
          </AppShell>
      );
    });
  }
}
