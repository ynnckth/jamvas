import { createSlice } from "@reduxjs/toolkit";
import { getServerVersion } from "./appThunks";

interface AppSliceState {
  connectingToServer?: boolean;
}

const initialState: AppSliceState = {
  connectingToServer: undefined,
};

export const appSlice = createSlice({
  name: "appSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getServerVersion.pending, (state) => {
      state.connectingToServer = true;
    });
    builder.addCase(getServerVersion.fulfilled, (state) => {
      state.connectingToServer = false;
    });
    builder.addCase(getServerVersion.rejected, (state) => {
      state.connectingToServer = false;
    });
  },
});
export default appSlice.reducer;
