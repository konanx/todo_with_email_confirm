import { configureStore } from "@reduxjs/toolkit";
import selectedTodoListReducer from "../features/selected/selectedTodoList";
export const store = configureStore({
  reducer: {
    selectedTodoList: selectedTodoListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
