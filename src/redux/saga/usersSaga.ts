import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import { AxiosError } from "axios";

import {
  DELETE_USER,
  deleteUserFailure,
  deleteUserSuccess,
} from "../actions/usersActions";
import { DeleteUser } from "../../types/redux/usersTypes";
import { UNKNOWN_ERROR } from "../../consts/http";
import { User } from "../../types";
import { fetchDeleteUser } from "../../http/users";

function* deleteUserSaga(action: DeleteUser) {
  try {
    const { userId } = action.payload;

    const res: { data: User } = yield call(fetchDeleteUser, userId);

    yield put(deleteUserSuccess(res.data));
  } catch (error) {
    const payload = error instanceof AxiosError ? error.message : UNKNOWN_ERROR;
    yield put(deleteUserFailure(payload));
  }
}

export function* watchUsersSaga() {
  yield all([
    fork(function* () {
      yield takeLatest(DELETE_USER, deleteUserSaga);
    }),
  ]);
}
