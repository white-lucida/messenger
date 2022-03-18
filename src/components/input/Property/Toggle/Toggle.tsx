import clsx from 'clsx';
import styles from './Toggle.module.css';

type ToggleProps = {
  onClick: () => void;
  isEnabled: boolean;
};

const Toggle: React.VFC<ToggleProps> = ({ onClick, isEnabled }) => {
  return (
    <div>
      <button type='button' onClick={onClick} className={clsx(styles.root)}>
        <div className={clsx(styles.circle, isEnabled ? styles.enabled : styles.disabled)}></div>
      </button>
    </div>
  );
};

export { Toggle };
