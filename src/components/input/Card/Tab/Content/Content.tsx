import clsx from 'clsx';
import styles from './Content.module.css';

type ContentProps = {
  children: React.ReactNode;
  isEnabled: boolean;
  className?: string;
};

const Content: React.VFC<ContentProps> = ({ children, isEnabled, className }) => {
  return <section className={clsx(!isEnabled && styles.disabled, className)}>{children}</section>;
};

export { Content };
