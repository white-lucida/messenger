import clsx from 'clsx';
import styles from './ActionRow.module.css';

type ActionRowProps = {
  children: React.ReactNode;
  className?: string;
};

const ActionRow: React.VFC<ActionRowProps> = ({ children, className }) => {
  return <section className={clsx(styles.root, className)}>{children}</section>;
};

export { ActionRow };
