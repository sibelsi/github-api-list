import {repositoriesActions} from './slice';
import {ICreateRepoData, IGitHubError, IUpdateRepoData} from "@/entities";
import {AppThunk} from "@shared/lib/redux/store.ts";
import {githubApi} from "@shared/api";

export const fetchRepos = (): AppThunk => async (dispatch) => {
  try {
    dispatch(repositoriesActions.setLoading(true));
    const repos = await githubApi.getRepos();
    dispatch(repositoriesActions.setRepos(repos));
  } catch  {
    dispatch(repositoriesActions.setError('Failed to fetch repositories'));
  } finally {
    dispatch(repositoriesActions.setLoading(false));
  }
};
export const createRepo = (data: ICreateRepoData): AppThunk => async (dispatch) => {
  try {
    dispatch(repositoriesActions.setLoading(true));
    const newRepo = await githubApi.createRepo(data);
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
  try {
    dispatch(repositoriesActions.setLoading(true));
    const repo = getState().repositories.repos.find(r => r.id === repoId);

    if (!repo) {
      dispatch(repositoriesActions.setError('Repository not found'));
      return;
    }
    const updatedRepo = await githubApi.updateRepo(
      repo.name,
      data,
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

  try {
    dispatch(repositoriesActions.setLoading(true));
    const repo = getState().repositories.repos.find(r => r.id === repoId);

    if (!repo) {
      dispatch(repositoriesActions.setError('Repository not found'));
      return;
    }

    await githubApi.deleteRepo(
      repo.name,
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