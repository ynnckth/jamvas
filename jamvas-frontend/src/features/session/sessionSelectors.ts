import { RootState } from "../../app/store";

export const selectUser = (state: RootState) => state.sessionSlice.self;
export const selectAllUsersInSession = (state: RootState) => state.sessionSlice.allUsersInSession;
