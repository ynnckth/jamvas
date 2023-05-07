import { combineReducers, configureStore, PreloadedState } from "@reduxjs/toolkit";
import sequencerReducer from "../features/sequencer/sequencerSlice";
import sessionReducer from "../features/session/sessionSlice";

const rootReducer = combineReducers({
  sequencerSlice: sequencerReducer,
  sessionSlice: sessionReducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  });

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = ReturnType<typeof setupStore>;

export default store;
