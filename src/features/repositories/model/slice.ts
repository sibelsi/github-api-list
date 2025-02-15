import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IRepository} from "@/entities";

interface RepositoriesState {
  repos: IRepository[];
  loading: boolean;
  error: string | null;
}

const initialState: RepositoriesState = {
  repos: [],
  loading: false,
  error: null,
};

const repositoriesSlice = createSlice({
  name: 'repositories',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setRepos: (state, action: PayloadAction<IRepository[]>) => {
      state.repos = action.payload;
      state.error = null;
    },

    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },

    updateRepo: (state, action: PayloadAction<IRepository>) => {
      state.repos = state.repos.map(repo =>
        repo.id === action.payload.id ? action.payload : repo
      );
    },

    deleteRepo: (state, action: PayloadAction<number>) => {
      state.repos = state.repos.filter(repo => repo.id !== action.payload);
    },

    addRepo: (state, action: PayloadAction<IRepository>) => {
      state.repos.push(action.payload);
    },
  },
});

export const { actions: repositoriesActions } = repositoriesSlice;
export const repositoriesReducer = repositoriesSlice.reducer;