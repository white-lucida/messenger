import clsx from 'clsx';
import styles from './Header.module.css';

type HeaderProps = {
  children: React.ReactNode;
  className?: string;
};

const Header: React.VFC<HeaderProps> = ({ children, className }) => {
  return (
    <header className={clsx(styles.root, className)}>{children}</header>
  ); /* headerが意味的に適切がどうか忘れたので暫定 */
};

export { Header };
