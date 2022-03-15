import clsx from 'clsx';
import styles from '../../../styles/Row.module.css';

type RowProps = {
  children: React.ReactNode;
  className?: string;
};

const Row: React.VFC<RowProps> = ({ children, className }) => {
  return <p className={clsx(styles.root, className)}>{children}</p>;
};

export { Row };
