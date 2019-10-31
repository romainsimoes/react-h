import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
} from './constants';

export function login() {
  return {
    type: LOGIN,
  };
}

export function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user,
  };
}

export function loginError(err) {
  return {
    type: LOGIN_ERROR,
    err,
  };
}
