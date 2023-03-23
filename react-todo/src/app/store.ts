import { configureStore } from "@reduxjs/toolkit";
import selectedTodoListReducer from "../features/selected/selectedTodoListSlice";
import ServerOfflineReducer from "../features/serverOfflineSlice";
export const store = configureStore({
  reducer: {
    selectedTodoList: selectedTodoListReducer,
    serverOffline: ServerOfflineReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
