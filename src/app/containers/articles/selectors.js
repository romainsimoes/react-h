import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectApp = state => state.global || initialState;

const makeSelectUser = () =>
  createSelector(
    selectApp,
    appState => appState.user,
  );

export { makeSelectUser };
