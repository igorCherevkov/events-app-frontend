import { User } from "../../types";
import { Auth } from "../../types/redux/authTypes";

export const AUTH = "AUTH";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_FAILURE = "AUTH_FAILURE";
export const LOGOUT = "LOGOUT";
export const CHECK_AUTH = "CHECK_AUTH";

export const auth = (
  email: string,
  password: string,
  isRegistration: boolean
): Auth => ({
  type: AUTH,
  payload: {
    email,
    password,
    isRegistration,
  },
});

export const authSuccess = (payload: User & { token: string }) => ({
  type: AUTH_SUCCESS,
  payload,
});

export const authFailure = (payload: string) => ({
  type: AUTH_FAILURE,
  payload,
});

export const checkAuth = () => ({
  type: CHECK_AUTH,
});

export const logout = () => ({
  type: LOGOUT,
});
