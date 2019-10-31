/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

// import history fro  './app/utils/history';
import globalReducer from './app/containers/app/reducer';
// import languageProviderReducer from './app/containers/LanguageProvider/reducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    global: globalReducer,
    // language: languageProviderReducer,
    // router: connectRouter(history),
    ...injectedReducers,
  });

  return rootReducer;
}
