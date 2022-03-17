import styles from '../../styles/Header.module.css';
import Link from 'next/link';

const Header: React.VFC = () => {
  return (
    <header className={styles.header}>
      <Link href='/'>← トップへ戻る</Link>
    </header>
  );
};

export { Header };
