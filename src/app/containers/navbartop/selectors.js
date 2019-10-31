import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectApp = state => state.global || initialState;

const makeSelectCounterValue = () =>
  createSelector(
    selectApp,
    appState => appState.counterValue,
  );

export { makeSelectCounterValue };
