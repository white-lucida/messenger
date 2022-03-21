import clsx from 'clsx';
import styles from './Row.module.css';

type RowProps = {
  children: React.ReactNode;
  className?: string;
};

const Row: React.VFC<RowProps> = ({ children, className }) => {
  return <div className={clsx(styles.root, className)}>{children}</div>;
};

export { Row };
