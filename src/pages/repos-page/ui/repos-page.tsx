import {SyntheticEvent, useCallback, useEffect, useState} from 'react';
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
import {
  CreateRepoModal,
  EditRepoModal,
  ICreateRepoData,
  ICredentials,
  IRepository,
  IUpdateRepoData,
  RepoCard, RepoContentModal
} from "@/entities";
import {authActions} from "@features/auth/model/slice.ts";
import {Button} from "@shared/ui/button/button.tsx";
import {Loader} from "@shared/ui";

export const ReposPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { repos, loading, error } = useSelector((state: RootState) => state.repositories);
  const [editedRepo, setEditedRepo] = useState<IRepository | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [credentials, setCredentials] = useState<ICredentials | null>(null);
  const [selectedRepo, setSelectedRepo] = useState<IRepository | null>(null);

  useEffect(() => {
    const creds = localStorage.getItem("credentials")
    if (!creds) {
      navigate('/');
      return;
    }
    setCredentials(JSON.parse(creds));
  }, [dispatch, navigate]);

  useEffect(() => {
    dispatch(fetchRepos());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(authActions.logout());
    navigate('/');
  };

  const handleCreate = async (data: ICreateRepoData) => {
    await dispatch(createRepo(data));
    setShowCreateModal(false);
  };

  const handleUpdate = async (data: IUpdateRepoData) => {
    if (editedRepo) {
      await dispatch(updateRepo(editedRepo.id, data));
      setEditedRepo(null);
    }
  };

  const handleDelete = useCallback((repoId: number) => {
    if (confirm('Are you sure you want to delete this repository?')) {
      dispatch(deleteRepo(repoId));
    }
  }, [dispatch]);

  const editRepoHandler = useCallback((repo: IRepository) => (e:SyntheticEvent) => {
    e.stopPropagation()
    setEditedRepo(repo)
  }, [setEditedRepo]);

  const deleteRepoHandler = useCallback((repoId: number) => (e:SyntheticEvent) => {
    e.stopPropagation()
    handleDelete(repoId)
  },[handleDelete])

  const selectRepoHandler = useCallback((repo: IRepository) => () => {
    setSelectedRepo(repo)
  },[])

  const handleOpenCreateRepoModal = useCallback(() => setShowCreateModal(true), [setShowCreateModal]);

  const handleCloseCreateRepoModal = useCallback(() => setShowCreateModal(false), [setShowCreateModal]);

  const handleCloseEditRepoModal = useCallback(() => setEditedRepo(null), [setEditedRepo]);

  const handleCloseRepoContentModal = useCallback(() => setSelectedRepo(null), [setSelectedRepo]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>{credentials?.owner}'s Repositories:  </h1>
        <div className={styles.controls}>
          <Button variant="primary" onClick={handleOpenCreateRepoModal}>
            New Repository
          </Button>
          <Button variant="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </header>


      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.grid}>
        {repos.map((repo) => (
          <RepoCard
            key={repo.id}
            repo={repo}
            onEdit={editRepoHandler(repo)}
            onDelete={deleteRepoHandler(repo.id)}
            onClick={selectRepoHandler(repo)}
          />
        ))}
      </div>

      {loading && <Loader className={styles.loader} />}

      {showCreateModal && (
        <CreateRepoModal
          onCreate={handleCreate}
          onClose={handleCloseCreateRepoModal}
        />
      )}

      {editedRepo && (
        <EditRepoModal
          repo={editedRepo}
          onUpdate={handleUpdate}
          onClose={handleCloseEditRepoModal}
        />
      )}

      { selectedRepo && (
      <RepoContentModal
        repo={selectedRepo.name}
        onClose={handleCloseRepoContentModal}
      />
      )}
    </div>
  );
};