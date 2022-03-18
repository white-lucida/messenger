import clsx from 'clsx';
import React from 'react';
import styles from './Button.module.css';

type ButtonProps = {
  onClick: () => void;
  tabName: string;
  isEnabled: boolean;
  className?: string;
};

const Button: React.VFC<ButtonProps> = ({ onClick, tabName, className, isEnabled }) => {
  return (
    <input
      type='button'
      onClick={onClick}
      value={tabName}
      className={clsx(styles.root, className, isEnabled ? styles.enabled : styles.disabled)}
    />
  );
};

export { Button };
