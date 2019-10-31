import React from 'react';
import { AsyncSeriesHook } from 'tapable';
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import ReduxTapable from './tapable';
import { cloneDeep } from './util';
// import AppShell from './app/containers/app/index';
import cookiesMiddleware from 'universal-cookie-express';
import { CookiesProvider } from 'react-cookie';
import Cookies from 'universal-cookie';
// import { ConnectedRouter } from 'connected-react-router';
import createReducer from './reducers';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';
import LanguageProvider from './app/containers/LanguageProvider';
import { translationMessages } from './i18n';
import { StaticRouter } from "react-router-dom";

export default class ReduxServer extends ReduxTapable {
  constructor() {
    super();
    this.hooks = {
      reduxInitialState: new AsyncSeriesHook(['state', 'application', 'req', 'res']),
    };
  }

  apply(serverHandler) {
    serverHandler.hooks.beforeLoadData.tapPromise(
      'CookiesToLoadData',
      async (setParams, getParams, req) => {
        const cookies = new Cookies(req.headers.cookie);
        setParams('cookies', cookies);
      },
    );

    serverHandler.hooks.beforeAppRender.tapPromise('AddReduxProvider', async (app, req, res) => {
      const providerProps = {};

      let initialState;
      const state = {
        setInitialState: (iState) => {
          initialState = cloneDeep(iState);
        },
        getInitialState: () => {
          if (typeof initialState === 'undefined') return {};
          return cloneDeep(initialState);
        },
      };
      await new Promise(r => this.hooks.reduxInitialState.callAsync(state, app, req, res, r));

      try {

        let composeEnhancers = compose;
        const reduxSagaMonitorOptions = {};

        // If Redux Dev Tools and Saga Dev Tools Extensions are installed, enable them
        /* istanbul ignore next */
        if (process.env.NODE_ENV !== 'production' && typeof window === 'object') {
          /* eslint-disable no-underscore-dangle */
          if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
            composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});

          // NOTE: Uncomment the code below to restore support for Redux Saga
          // Dev Tools once it supports redux-saga version 1.x.x
          if (window.__SAGA_MONITOR_EXTENSION__)
            reduxSagaMonitorOptions = {
              sagaMonitor: window.__SAGA_MONITOR_EXTENSION__,
            };
          /* eslint-enable */
        }
        // Create the store with two middlewares
        // 1. sagaMiddleware: Makes redux-sagas work
        // 2. routerMiddleware: Syncs the location/URL path to the state
        this.sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);
        this.middlewares = [this.sagaMiddleware]; //routerMiddleware(history)

        this.enhancers = composeEnhancers(...enhancers);
        this.reducers = createReducer();

        providerProps.store = createStore(
          this.reducers,
          initialState,
          this.enhancers
        );

        providerProps.store.runSaga = this.sagaMiddleware.run;
        providerProps.store.injectedReducers = {}; // Reducer registry
        providerProps.store.injectedSagas = {}; // Saga registry

        res.locals.reduxStore = providerProps.store;
      } catch (ex) {
        // console.log redux error
        // eslint-disable-next-line

        console.error(ex);
      }
      console.log('*** Server Side Rendering ***');

      // eslint-disable-next-line
      // app.children = (
      //   <Provider {...providerProps}>
      //       {app.children}
      //   </Provider>
      // );

      app.children = (
        <CookiesProvider cookies={req.universalCookies}>
          <Provider {...providerProps}>
            <LanguageProvider messages={translationMessages}>
              {app.children}
            </LanguageProvider>
          </Provider>
        </CookiesProvider>
      );
    });

    serverHandler.hooks.beforeHtmlRender.tapPromise('AddReduxPreloadedState', async (app, req, res) => {
      if (res.locals.reduxStore && res.locals.reduxStore.getState) {
        const reduxState = res.locals.reduxStore.getState();
        app.htmlProps.footer.push(
          <script
            key="reduxPreloadedState"
            dangerouslySetInnerHTML={{
              __html: `window.PAW__REDUX_PRELOADED_STATE = ${JSON.stringify(reduxState)}`,
            }}
          />,
        );
      }
    });

    serverHandler.hooks.renderRoutes.tap('AddAppShell', ({ setRenderedRoutes, getRenderedRoutes }) => {
      setRenderedRoutes(<AppShell>{ getRenderedRoutes() }</AppShell>);
    });
  }
}
