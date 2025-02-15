import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {IRepoContentItem} from "@/entities";

interface IRepoContentState {
  items: IRepoContentItem[];
  currentPath: string;
  loading: boolean;
  error: string | null;
}

const initialState: IRepoContentState = {
  items: [],
  currentPath: '',
  loading: false,
  error: null,
};

const repoContentSlice = createSlice({
  name: 'repoContent',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setContent(state, action: PayloadAction<{ items: IRepoContentItem[]; path: string }>) {
      state.items = action.payload.items;
      state.currentPath = action.payload.path;
      state.error = null;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    resetContent(state) {
      state.items = [];
      state.currentPath = '';
    },
  },
});

export const { actions: repoContentActions } = repoContentSlice;
export const repoContentReducer = repoContentSlice.reducer;