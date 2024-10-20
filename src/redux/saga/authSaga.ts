import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import { AxiosError } from "axios";

import {
  AUTH,
  authFailure,
  authSuccess,
  CHECK_AUTH,
} from "../actions/authActions";
import { fetchCheckAuth, fetchLogin, fetchRegistration } from "../../http/auth";
import { Auth } from "../../types/redux/authTypes";
import { User } from "../../types";
import { UNKNOWN_ERROR } from "../../consts/http";

function* authSaga(action: Auth) {
  let res: { data: User & { token: string } };

  try {
    const { email, password, isRegistration } = action.payload;

    res = yield call(
      isRegistration ? fetchRegistration : fetchLogin,
      email,
      password
    );

    localStorage.setItem("token", res.data.token);
    yield put(authSuccess(res.data));
  } catch (error) {
    const payload = error instanceof AxiosError ? error.message : UNKNOWN_ERROR;
    yield put(authFailure(payload));
  }
}

function* checkAuthSaga() {
  const token = localStorage.getItem("token");

  try {
    if (token) {
      const res: { data: User & { token: string } } = yield call(
        fetchCheckAuth
      );

      yield put(authSuccess(res.data));
    }
  } catch (error) {
    const payload = error instanceof AxiosError ? error.message : UNKNOWN_ERROR;
    yield put(authFailure(payload));
  }
}

export function* watchAuthSaga() {
  yield all([
    fork(function* () {
      yield takeLatest(AUTH, authSaga);
    }),
    fork(function* () {
      yield takeLatest(CHECK_AUTH, checkAuthSaga);
    }),
  ]);
}
