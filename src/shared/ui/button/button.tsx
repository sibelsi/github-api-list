import styles from './button.module.scss';

type ButtonProps = {
  variant?: 'primary' | 'secondary';
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  variant = 'primary',
  className,
  ...props
}: ButtonProps) => (
  <button
    className={`${styles.button} ${styles[`button--${variant}`]} ${className || ''}`}
    {...props}
  />
);