import { put, takeEvery } from 'redux-saga/effects';
import { INCREMENT_COUNT, DECREMENT_COUNT } from './constants';
import {
  incrementCounterSuccess,
  decrementCounterSuccess,
  incrementCounterError,
  decrementCounterError,
} from './actions';

export function* incrementCounter() {
  try {
    yield put(incrementCounterSuccess());
  } catch (err) {
    yield put(incrementCounterError(err));
  }
}

export function* decrementCounter() {
  try {
    yield put(decrementCounterSuccess());
  } catch (err) {
    yield put(decrementCounterError(err));
  }
}

export default function* rootSaga() {
  yield takeEvery(INCREMENT_COUNT, incrementCounter);
  yield takeEvery(DECREMENT_COUNT, decrementCounter);
}
