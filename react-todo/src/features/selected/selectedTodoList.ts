import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export interface selectedTodo {
  selected: undefined | number;
}

const initialState: selectedTodo = {
  selected: undefined,
};

export const selectedTodoListSlice = createSlice({
  name: "selectedTodoList",
  initialState,
  reducers: {
    selectTodoList: (state, action: PayloadAction<number>) => {
      state.selected = action.payload;
    },
  },
});

export const { selectTodoList } = selectedTodoListSlice.actions;
export default selectedTodoListSlice.reducer;
