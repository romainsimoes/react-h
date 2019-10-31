import _ from 'lodash';
import produce from 'immer';
import { INCREMENT_COUNT_SUCCESS, DECREMENT_COUNT_SUCCESS } from './constants';

export const initialState = {
  counterValue: 5,
};

const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case INCREMENT_COUNT_SUCCESS:
        draft.counterValue = state.counterValue + 1;
        break;

      case DECREMENT_COUNT_SUCCESS:
        draft.counterValue = state.counterValue - 1;
        break;
    }
  });

export default appReducer;
