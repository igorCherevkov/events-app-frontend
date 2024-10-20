import { combineReducers } from "@reduxjs/toolkit";

import { eventsReducer } from "./eventsReducer";
import { authReducer } from "./authReducer";
import { usersReducer } from "./usersReducer";

export const rootReducer = combineReducers({
  eventsReducer,
  authReducer,
  usersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
