import clsx from 'clsx';
import React from 'react';
import styles from '../../styles/EmbedInputTab.module.css';

type EmbedInputTabProps = {
  children: React.ReactNode;
  isEnabled?: boolean;
  className?: string;
};

const EmbedInputTab: React.VFC<EmbedInputTabProps> = ({ isEnabled, children, className }) => {
  return (
    <div className={clsx(className, !isEnabled && styles.disabled)}>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export { EmbedInputTab };
