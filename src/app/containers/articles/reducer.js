import _ from 'lodash';
import produce from 'immer';
import { LOGIN_SUCCESS, LOGIN_ERROR } from './constants';

export const initialState = {
  user: null,
};

const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOGIN_SUCCESS:
        draft.user = action.user;
        draft.error = null;
        break;

      case LOGIN_ERROR:
        draft.user = null;
        draft.error = action.error;
        break;
    }
  });

export default appReducer;
