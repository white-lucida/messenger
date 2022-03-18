import clsx from 'clsx';
import styles from './Body.module.css';

type BodyProps = {
  children: React.ReactNode;
  className?: string;
};

const Body: React.VFC<BodyProps> = ({ children, className }) => {
  return <section className={clsx(styles.root, className)}>{children}</section>;
};

export { Body };
