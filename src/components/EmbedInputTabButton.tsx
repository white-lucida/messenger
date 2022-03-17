import React, { useCallback } from 'react';
import { TabName } from './EmbedInput';
import styles from '../../styles/EmbedInputTabButton.module.css';
import clsx from 'clsx';

type EmbedInputTabButton = {
  children?: React.ReactNode;
  onClick: () => void;
  isEnabled?: boolean;
};

const EmbedInputTabButton: React.VFC<EmbedInputTabButton> = ({ isEnabled, children, onClick }) => {
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      e.preventDefault();
      onClick();
    },
    [onClick],
  );
  return (
    <button
      onClick={handleClick}
      className={clsx(styles.root, isEnabled ? styles.enabled : styles.disabled)}
    >
      {children}
    </button>
  );
};

export { EmbedInputTabButton };
