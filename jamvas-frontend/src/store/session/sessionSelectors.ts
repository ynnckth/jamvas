import { RootState } from "../store";

export const selectUser = (state: RootState) => state.sessionSlice.currentUser;
export const selectAllUsersInSession = (state: RootState) => state.sessionSlice.allUsersInSession;
