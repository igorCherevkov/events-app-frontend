import { User } from "../";
import {
  DELETE_USER,
  DELETE_USER_FAILURE,
  DELETE_USER_SUCCESS,
} from "../../redux/actions/usersActions";

export type DeleteUser = {
  type: typeof DELETE_USER;
  payload: { userId: number };
};

export type DeleteUserSuccess = {
  type: typeof DELETE_USER_SUCCESS;
  payload: User;
};

export type DeleteUserFailure = {
  type: typeof DELETE_USER_FAILURE;
  payload: string;
};

export type UsersActions = DeleteUser | DeleteUserSuccess | DeleteUserFailure;
