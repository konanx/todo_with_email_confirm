import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export interface selectedTodo {
  selected: undefined | number;
  isLoading: boolean;
}

const initialState: selectedTodo = {
  selected: undefined,
  isLoading: true,
};

export const selectedTodoListSlice = createSlice({
  name: "selectedTodoList",
  initialState,
  reducers: {
    selectTodoList: (state, action: PayloadAction<number>) => {
      state.selected = action.payload;
    },
    selectTodoListisLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { selectTodoList, selectTodoListisLoading } =
  selectedTodoListSlice.actions;
export default selectedTodoListSlice.reducer;
