import { call, put, select, takeLatest, takeEvery } from 'redux-saga/effects';
import {
  UserAuthTokenPath
} from '../../utils/apiRoutes';
import { LOGIN } from './constants';
import request from '../../utils/request';
import {
  loginSuccess,
  loginError,
} from './actions';

export function* login() {
  // const username = yield select(makeSelectUsername());
  const requestURL = UserAuthTokenPath();
  // const requestURL = "https://localhost:4001/fr/shop/products/200";

  try {
    const user = yield call(request, requestURL);
    yield put(loginSuccess(user));
  } catch (err) {
    yield put(loginError(err));
  }
}

export default function* rootSaga() {
  yield takeLatest(LOGIN, login);
}
