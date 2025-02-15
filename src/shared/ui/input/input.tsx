import styles from './input.module.scss';

type InputProps = {
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input = ({ label, ...props }: InputProps) => (
  <div className={styles.container}>
    <label className={styles.label}>{label}</label>
    <input className={styles.input} {...props} />
  </div>
);