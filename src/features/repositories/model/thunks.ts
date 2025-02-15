import { repositoriesActions } from './slice';
import {ICreateRepoData, IGitHubError, IUpdateRepoData} from "@/entities";
import {AppThunk} from "@shared/lib/redux/store.ts";
import {githubApi} from "@shared/api";

export const fetchRepos = (): AppThunk => async (dispatch, getState) => {
  const credentials = getState().auth.credentials;
  if (!credentials) return;

  try {
    dispatch(repositoriesActions.setLoading(true));
    const repos = await githubApi.getRepos(credentials);
    dispatch(repositoriesActions.setRepos(repos));
  } catch  {
    dispatch(repositoriesActions.setError('Failed to fetch repositories'));
  } finally {
    dispatch(repositoriesActions.setLoading(false));
  }
};
export const createRepo = (data: ICreateRepoData): AppThunk => async (dispatch, getState) => {
  const token = getState().auth.credentials?.token;
  if (!token) {
    dispatch(repositoriesActions.setError('Authorization required'));
    return;
  }

  try {
    dispatch(repositoriesActions.setLoading(true));
    const newRepo = await githubApi.createRepo(token, data);
    dispatch(repositoriesActions.addRepo(newRepo));
  } catch (err) {
    const error = err as IGitHubError;
    const message = error.response?.data?.message || 'Failed to create repository';
    dispatch(repositoriesActions.setError(message));
  } finally {
    dispatch(repositoriesActions.setLoading(false));
  }
};

export const updateRepo = (
  repoId: number,
  data: IUpdateRepoData
): AppThunk => async (dispatch, getState) => {
  const credentials = getState().auth.credentials;
  if (!credentials) return;
  try {
    dispatch(repositoriesActions.setLoading(true));
    const repo = getState().repositories.repos.find(r => r.id === repoId);

    if (!repo) {
      dispatch(repositoriesActions.setError('Repository not found'));
      return;
    }
    const updatedRepo = await githubApi.updateRepo(
      credentials.owner,
      repo.name,
      data,
      credentials.token
    );
    dispatch(repositoriesActions.updateRepo(updatedRepo));
  } catch (err) {
    const error = err as IGitHubError;
    const message = error.response?.data?.message || 'Failed to update repository';
    dispatch(repositoriesActions.setError(message));
  } finally {
    dispatch(repositoriesActions.setLoading(false));
  }
};

export const deleteRepo = (repoId: number): AppThunk => async (dispatch, getState) => {
  const credentials = getState().auth.credentials;
  if (!credentials) return;

  try {
    dispatch(repositoriesActions.setLoading(true));
    const repo = getState().repositories.repos.find(r => r.id === repoId);

    if (!repo) {
      dispatch(repositoriesActions.setError('Repository not found'));
      return;
    }

    await githubApi.deleteRepo(
      credentials.owner,
      repo.name,
      credentials.token
    );

    dispatch(repositoriesActions.deleteRepo(repoId));
  } catch (err) {
    const error = err as IGitHubError;
    const message = error.response?.data?.message || 'Failed to delete repository';
    dispatch(repositoriesActions.setError(message));
  } finally {
    dispatch(repositoriesActions.setLoading(false));
  }
};