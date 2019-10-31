import {
  INCREMENT_COUNT,
  DECREMENT_COUNT,
  INCREMENT_COUNT_SUCCESS,
  DECREMENT_COUNT_SUCCESS,
  INCREMENT_COUNT_ERROR,
  DECREMENT_COUNT_ERROR,
} from './constants';

export const incrementCounter = () => ({
  type: INCREMENT_COUNT,
});

export const decrementCounter = () => ({
  type: DECREMENT_COUNT,
});

export const incrementCounterSuccess = () => ({
  type: INCREMENT_COUNT_SUCCESS,
});

export const decrementCounterSuccess = () => ({
  type: DECREMENT_COUNT_SUCCESS,
});

export const incrementCounterError = () => ({
  type: INCREMENT_COUNT_ERROR,
});

export const decrementCounterError = () => ({
  type: DECREMENT_COUNT_ERROR,
});
