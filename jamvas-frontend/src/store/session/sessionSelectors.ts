import { RootState } from "../store";

export const selectUser = (state: RootState) => state.sessionSlice.self;
export const selectAllUsersInSession = (state: RootState) => state.sessionSlice.allUsersInSession;
