import { AuthActions } from "../../types/redux/authTypes";
import {
  AUTH_FAILURE,
  AUTH_SUCCESS,
  CHECK_AUTH,
  LOGOUT,
} from "../actions/authActions";

const initialState = {
  isAuth: false,
  user: null,
  error: null,
};

export const authReducer = (state = initialState, action: AuthActions) => {
  switch (action.type) {
    case AUTH_SUCCESS:
      return { ...state, isAuth: true, user: action.payload };
    case AUTH_FAILURE:
      return { ...state, error: action.payload };
    case LOGOUT: {
      return { ...state, isAuth: false, user: null, error: null };
    }
    case CHECK_AUTH: {
      return { ...state, isLoading: true };
    }
    default:
      return state;
  }
};
