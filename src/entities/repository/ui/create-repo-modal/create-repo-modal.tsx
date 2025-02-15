import { useState } from 'react';
import {ICreateRepoData} from "@/entities";
import styles from './create-repo-modal.module.scss';
import {Input} from "@shared/ui";
import {TextArea} from "@shared/ui/text-area";

export const CreateRepoModal = ({
  onCreate,
  onClose,
}: {
  onCreate: (data: ICreateRepoData) => Promise<void>;
  onClose: () => void;
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onCreate({ name, description, private: isPrivate });
  };

  return (
    <div className={styles.modal}>
      <div className={styles.content}>
        <h2>Create Repository</h2>
        <form onSubmit={handleSubmit}>
          <Input
            label={'Name: '}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required />
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
          <button type="submit">Create</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
          </div>
        </form>
      </div>
    </div>
  );
};