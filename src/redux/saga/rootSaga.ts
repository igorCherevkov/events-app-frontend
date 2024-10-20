import { all } from "redux-saga/effects";

import { watchEventsSaga } from "./eventsSaga";
import { watchAuthSaga } from "./authSaga";
import { watchUsersSaga } from "./usersSaga";

export function* rootSaga() {
  yield all([watchEventsSaga(), watchAuthSaga(), watchUsersSaga()]);
}
