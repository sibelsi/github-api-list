import {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styles from './repo-content-modal.module.scss';
import {AppDispatch, RootState} from "@shared/lib/redux/store.ts";
import {fetchRepoContent} from "@features/repo-content/model/thunks.ts";
import {repoContentActions} from "@features/repo-content/model/slice.ts";
import {Button, Loader} from "@shared/ui";
import {IRepoContentItem} from "@/entities";

export const RepoContentModal = ({
  repo,
  onClose,
}: {
  repo: string;
  onClose: () => void;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const {items, currentPath, loading, error} = useSelector(
    (state: RootState) => state.repoContent
  );

  useEffect(() => {
    dispatch(fetchRepoContent(repo));
    return () => {
      dispatch(repoContentActions.resetContent());
    };
  }, [dispatch, repo]);

  const handleNavigate = (path: string) => {
    dispatch(fetchRepoContent(repo, path));
  };

  const handleClose = useCallback(() => {
    dispatch(repoContentActions.resetContent());
    onClose()},[onClose])

  return (
    <div className={styles.modal}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h2>{repo} - {currentPath || 'root'}</h2>
          <Button variant="primary" onClick={handleClose}>✕</Button>
        </div>

        {loading && <Loader/>}

        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.fileList}>
          {currentPath !== '' && (
            <div
              className={styles.item}
              onClick={() => handleNavigate(currentPath.split('/').slice(0, -1).join('/'))}
            >
              ← Back
            </div>
          )}

          {items.map((item: IRepoContentItem) => (
            <div
              key={item.path}
              className={styles.item}
              onClick={() => item.type === 'dir' && handleNavigate(item.path??'')}
            >
              <span className={styles.type}>{item.type === 'dir' ? '📁' : '📄'}</span>
              <span className={styles.name}>{item.name}</span>
              {item.type === 'file' && <span className={styles.size}>{Math.round(item.size / 1024)} KB</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};