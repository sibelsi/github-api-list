import styles from './text-area.module.scss';

type InputProps = {
  label: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const TextArea = ({ label, ...props }: InputProps) => (
  <div className={styles.container}>
    <label className={styles.label}>{label}</label>
    <textarea className={styles.area} {...props} />
  </div>
);