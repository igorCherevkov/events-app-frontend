import { User } from "../";
import {
  AUTH,
  AUTH_FAILURE,
  AUTH_SUCCESS,
  CHECK_AUTH,
  LOGOUT,
} from "../../redux/actions/authActions";

export type AuthSuccess = {
  type: typeof AUTH_SUCCESS;
  payload: User & { token: string };
};

export type AuthFailure = {
  type: typeof AUTH_FAILURE;
  payload: string;
};

export type CheckAuth = {
  type: typeof CHECK_AUTH;
};

export type Logout = {
  type: typeof LOGOUT;
};

export type AuthActions = AuthSuccess | AuthFailure | Logout | CheckAuth;

export type Auth = {
  type: typeof AUTH;
  payload: {
    email: string;
    password: string;
    isRegistration: boolean;
  };
};
