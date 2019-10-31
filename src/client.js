import ReduxClient from './reduxClient';
import createSagaMiddleware from 'redux-saga';
// import mySaga from './app/containers/app/saga';
import { routerMiddleware } from 'connected-react-router';
import createReducer from './reducers';
// import * as reducers from './app/reducers';

import { createStore, applyMiddleware, compose } from 'redux';
// import history from './app/utils/history';

// import * as reducers from './app/reducers';

const appInitialState = {};

export default class Client {
  constructor({ addPlugin }) {
    const reduxClient = new ReduxClient({ addPlugin });
    // reduxClient.setReducers(reducers);

    this.sagaMiddleware = createSagaMiddleware();
    reduxClient.addMiddleware(this.sagaMiddleware);
    addPlugin(reduxClient);
  }
  // constructor({ addPlugin }) {
  //   let composeEnhancers = compose;
  //   const reduxSagaMonitorOptions = {};
  //
  //   // If Redux Dev Tools and Saga Dev Tools Extensions are installed, enable them
  //   /* istanbul ignore next */
  //   if (process.env.NODE_ENV !== 'production' && typeof window === 'object') {
  //     /* eslint-disable no-underscore-dangle */
  //     if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
  //       composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});
  //
  //     // NOTE: Uncomment the code below to restore support for Redux Saga
  //     // Dev Tools once it supports redux-saga version 1.x.x
  //     // if (window.__SAGA_MONITOR_EXTENSION__)
  //     //   reduxSagaMonitorOptions = {
  //     //     sagaMonitor: window.__SAGA_MONITOR_EXTENSION__,
  //     //   };
  //     /* eslint-enable */
  //   }
  //
  //   // const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);
  //
  //   // Create the store with two middlewares
  //   // 1. sagaMiddleware: Makes redux-sagas work
  //   // 2. routerMiddleware: Syncs the location/URL path to the state
  //   this.sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);
  //   const middlewares = [this.sagaMiddleware, routerMiddleware(history)];
  //
  //   const enhancers = [applyMiddleware(...middlewares)];
  //
  //   const reduxClient = new ReduxClient({ addPlugin });
  //
  //   reduxClient.enhancers = composeEnhancers(...enhancers);
  //   reduxClient.setReducers(createReducer());
  //
  //   // reduxClient.runSaga = sagaMiddleware.run;
  //   reduxClient.injectedReducers = {}; // Reducer registry
  //   reduxClient.injectedSagas = {}; // Saga registry
  //
  //   reduxClient.addMiddleware(middlewares);
  //   addPlugin(reduxClient);
  // }

  trackPageView() {
    const { ga } = window;
    if (typeof ga !== 'undefined' && ga) {
      ga('send', {
        hitType: 'pageview',
        page: window.location.pathname,
      });
    }
  }

  apply(clientHandler) {
    clientHandler
      .hooks
      .reduxInitialState
      .tapPromise('ReduxInitialState', async ({ getInitialState, setInitialState }) => {
        const initialState = Object.assign({}, getInitialState(), appInitialState);
        setInitialState(initialState);
      });

    // clientHandler
    //   .hooks
    //   .beforeRender
    //   .tapPromise('RunSagaMiddleware', async () => this.sagaMiddleware.run(mySaga));

    clientHandler.hooks.locationChange.tapPromise('ReInitAds', async () => {
      debugger
      this.trackPageView();
    });

  }
}
