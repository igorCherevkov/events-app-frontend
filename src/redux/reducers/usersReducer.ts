import { UsersActions } from "../../types/redux/usersTypes";

import {
  DELETE_USER,
  DELETE_USER_FAILURE,
  DELETE_USER_SUCCESS,
} from "../actions/usersActions";

const initialState = {
  isLoading: false,
  error: null,
};

export const usersReducer = (state = initialState, action: UsersActions) => {
  switch (action.type) {
    case DELETE_USER:
      return { ...state, isLoading: true };
    case DELETE_USER_SUCCESS:
      return { ...state, isLoading: false };
    case DELETE_USER_FAILURE:
      return { ...state, isLoading: true, error: action.payload };
    default:
      return state;
  }
};
