import clsx from 'clsx';
import styles from './Panel.module.css';

type PanelProps = {
  children: React.ReactNode;
  className?: string;
};

const Panel: React.VFC<PanelProps> = ({ children, className }) => {
  return <ul className={clsx(styles.root, className)}>{children}</ul>;
};

export { Panel };
