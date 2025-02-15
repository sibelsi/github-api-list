import styles from './loader.module.scss';

export const Loader = ({ className }: { className?: string }) => (
  <div className={`${styles.loader} ${className || ''}`}>
    <div className={styles.spinner}></div>
  </div>
);