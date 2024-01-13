import { RootState } from "../store";

export const selectConnectingToServer = (state: RootState) => state.appSlice.connectingToServer;
