import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import {authReducer} from "@features/auth/model/slice.ts";
import {repositoriesReducer} from "@features/repositories/model/slice.ts";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    repositories: repositoriesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;