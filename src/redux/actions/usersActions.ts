import { User } from "../../types";

export const DELETE_USER = "DELETE_USER";
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";
export const DELETE_USER_FAILURE = "DELETE_USER_FAILURE";

export const deleteUser = (userId: number) => ({
  type: DELETE_USER,
  payload: { userId },
});

export const deleteUserSuccess = (payload: User) => ({
  type: DELETE_USER_SUCCESS,
  payload,
});

export const deleteUserFailure = (payload: string) => ({
  type: DELETE_USER_FAILURE,
  payload,
});
