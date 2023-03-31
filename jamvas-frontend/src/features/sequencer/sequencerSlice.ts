import { createSlice } from "@reduxjs/toolkit";

interface SequencerSliceState {}

const initialState: SequencerSliceState = {};

export const sequencerSlice = createSlice({
  name: "sequencerSlice",
  initialState,
  reducers: {},
  extraReducers: () => {},
});

export default sequencerSlice.reducer;
