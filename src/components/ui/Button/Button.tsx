import clsx from 'clsx';
import styles from './Button.module.css';

type ButtonProps = {
  label: string;
  className?: string;
  onClick: () => void;
};

const Button: React.VFC<ButtonProps> = ({ label, className, onClick }) => {
  return (
    <input
      type='button'
      className={clsx(styles.root, 'generalInput', className)}
      value={label}
      onClick={onClick}
    />
  );
};

export { Button };
