import { repoContentActions } from './slice';
import {AppThunk} from "@shared/lib/redux/store.ts";
import {githubApi} from "@shared/api";

export const fetchRepoContent = (
  repo: string,
  path: string = ''
): AppThunk => async (dispatch) => {
  try {
    dispatch(repoContentActions.setLoading(true));
    const content = await githubApi.getRepoContent(repo, path);
    dispatch(repoContentActions.setContent({ items: content, path }));
  } catch {
    dispatch(repoContentActions.setError('Failed to load content'));
  } finally {
    dispatch(repoContentActions.setLoading(false));
  }
};