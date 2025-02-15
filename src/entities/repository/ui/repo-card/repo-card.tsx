import styles from './repo-card.module.scss';
import {IRepository} from "@/entities";
import {Button} from "@shared/ui";

type RepoCardProps = {
  repo: IRepository;
  onEdit: () => void;
  onDelete: () => void;
};

export const RepoCard = ({ repo, onEdit, onDelete }: RepoCardProps) => (
  <div className={styles.card}>
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