import clsx from 'clsx';
import styles from './Panel.module.css';

type PanelProps = {
  children: React.ReactNode;
  className?: string;
};

const Panel: React.VFC<PanelProps> = ({ children, className }) => {
  return <section className={clsx(styles.root, className)}>{children}</section>;
};

export { Panel };
