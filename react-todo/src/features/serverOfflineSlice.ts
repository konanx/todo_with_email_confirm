import { createSlice } from "@reduxjs/toolkit";

const initialState: ServerOfflineInterface = {
  active: true,
};

export interface ServerOfflineInterface {
  active: boolean;
}

const serverOfflineInterface = createSlice({
  name: "serverOffline",
  initialState,
  reducers: {
    setServerStatus: (state, action) => {
      state.active = action.payload;
    },
  },
});
export const { setServerStatus } = serverOfflineInterface.actions;
export default serverOfflineInterface.reducer;
