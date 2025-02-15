import {RootState} from "@shared/lib/redux/store.ts";

export const getRepositories = (state: RootState) =>
  state.repositories.repos;

export const getReposLoading = (state: RootState) =>
  state.repositories.loading;

export const getReposError = (state: RootState) =>
  state.repositories.error;

export const getRepoById = (id: number) => (state: RootState) =>
  state.repositories.repos.find(repo => repo.id === id);