import {SyntheticEvent} from "react";
import {IRepository} from "@/entities";
import {Button} from "@shared/ui";
import styles from './repo-card.module.scss';

type RepoCardProps = {
  repo: IRepository;
  onEdit: (e: SyntheticEvent) => void;
  onDelete: (e: SyntheticEvent) => void;
  onClick: () => void;
};

export const RepoCard = ({ repo, onEdit, onDelete, onClick}: RepoCardProps) => (
  <div className={styles.card} onClick={onClick}>
    <div className={styles.body}>
      <div className={styles.meta}>
        <span className={styles.visibility}>
          {repo.private ? '🔒 Private' : '🌍 Public'}
        </span>
      </div>
      <h3 className={styles.title}>{repo.name}</h3>
      <p className={styles.description}>{repo.description || 'No description'}</p>
    </div>
    <div className={styles.actions}>
      <Button variant="primary" onClick={onEdit}>Edit</Button>
      <Button variant="secondary" onClick={onDelete}>Delete</Button>
    </div>
  </div>
);