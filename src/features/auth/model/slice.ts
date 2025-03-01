import {createSlice} from '@reduxjs/toolkit';
import {ICredentials} from "@/entities";

const initialState: {
  credentials: ICredentials | null;
  error: string | null;
} = {
  credentials: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      localStorage.setItem('credentials', JSON.stringify(action.payload));
      state.credentials = action.payload;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    logout: (state) => {
      localStorage.setItem('credentials', JSON.stringify(null));
      state.credentials = null;
    },
  },
});

export const { actions: authActions } = authSlice;
export const authReducer = authSlice.reducer;