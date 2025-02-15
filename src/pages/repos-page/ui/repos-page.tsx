import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '@shared/lib/redux/store';
import {
  fetchRepos,
  createRepo,
  updateRepo,
  deleteRepo
} from '@features/repositories/model/thunks';
import styles from './repos-page.module.scss';
import {CreateRepoModal, EditRepoModal, ICreateRepoData, IRepository, IUpdateRepoData, RepoCard} from "@/entities";
import {authActions} from "@features/auth/model/slice.ts";
import {Button} from "@shared/ui/button/button.tsx";
import {Loader} from "@shared/ui";

export const ReposPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { repos, loading, error } = useSelector((state: RootState) => state.repositories);
  const credentials = useSelector((state: RootState) => state.auth.credentials);
  const [selectedRepo, setSelectedRepo] = useState<IRepository | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    if (!credentials) {
      navigate('/');
      return;
    }
    dispatch(fetchRepos());
  }, [credentials, dispatch, navigate]);

  const handleLogout = () => {
    dispatch(authActions.logout());
    navigate('/');
  };

  const handleCreate = async (data: ICreateRepoData) => {
    await dispatch(createRepo(data));
    setShowCreateModal(false);
  };

  const handleUpdate = async (data: IUpdateRepoData) => {
    if (selectedRepo) {
      await dispatch(updateRepo(selectedRepo.id, data ));
      setSelectedRepo(null);
    }
  };

  const handleDelete = (repoId: number) => {
    if (confirm('Are you sure you want to delete this repository?')) {
      dispatch(deleteRepo(repoId));
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>{credentials?.owner}'s Repositories</h1>
        <div className={styles.controls}>
          <Button variant="primary" onClick={() => setShowCreateModal(true)}>
            New Repository
          </Button>
          <Button variant="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </header>

      {loading && <Loader className={styles.loader} />}

      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.grid}>
        {repos.map((repo) => (
          <RepoCard
            key={repo.id}
            repo={repo}
            onEdit={() => setSelectedRepo(repo)}
            onDelete={() => handleDelete(repo.id)}
          />
        ))}
      </div>

      {showCreateModal && (
        <CreateRepoModal
          onCreate={handleCreate}
          onClose={() => setShowCreateModal(false)}
        />
      )}

      {selectedRepo && (
        <EditRepoModal
          repo={selectedRepo}
          onUpdate={handleUpdate}
          onClose={() => setSelectedRepo(null)}
        />
      )}
    </div>
  );
};