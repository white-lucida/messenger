import clsx from 'clsx';

import styles from './DiscordLikeButton.module.css';

type DiscordLikeButtonProps = {
  label: string;
  className?: string;
  onClick: () => void;
};

const DiscordLikeButton: React.VFC<DiscordLikeButtonProps> = ({ label, className, onClick }) => {
  return (
    <input
      type='button'
      value={label}
      className={clsx(styles.root, className, 'generalInput')}
      onClick={onClick}
    />
  );
};

export { DiscordLikeButton };
