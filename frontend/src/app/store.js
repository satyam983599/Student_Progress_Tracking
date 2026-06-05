import { configureStore } from "@reduxjs/toolkit";

import studentReducer from "./features/studentSlice";
import marksReducer from "./features/marksSlice";

export const store = configureStore({
  reducer: {
    students: studentReducer,
    marks: marksReducer,
  },
});