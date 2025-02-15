import {useState} from "react";
import {IRepository, IUpdateRepoData} from "@/entities";
import styles from './edit-repo-modal.module.scss';
import {TextArea} from "@shared/ui";
export const EditRepoModal = ({
  repo,
  onUpdate,
  onClose,
}: {
  repo: IRepository;
  onUpdate: (data: IUpdateRepoData) => Promise<void>;
  onClose: () => void;
}) => {
  const [description, setDescription] = useState(repo.description || '');
  const [isPrivate, setIsPrivate] = useState(repo.private);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onUpdate({ description, private: isPrivate });
  };

  return (
    <div className={styles.modal}>
      <div className={styles.content}>
        <h2>Edit {repo.name}</h2>
        <form onSubmit={handleSubmit}>
          <TextArea
            label={"Description: "}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div>
            <label>
              <input
                type="checkbox"
                checked={isPrivate}
                onChange={(e) => setIsPrivate(e.target.checked)}
              />
              Private
            </label>
          </div>
          <div className={styles.buttons}>
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};