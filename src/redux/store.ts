import { configureStore } from "@reduxjs/toolkit";
import { todosSlice } from "./slices/todos.slice";

export const store = configureStore({
  reducer: {
    todos: todosSlice.reducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;