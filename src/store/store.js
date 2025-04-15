import { configureStore } from "@reduxjs/toolkit";

import authUserReducer from "./features/authUser/authUserSlice"
import noteUserReducer from "./features/noteUser/noteUserSlice"

export const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    noteUser: noteUserReducer,
  }
});
