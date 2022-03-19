import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import React from 'react';
import { Button } from '../src/components/ui';
import { signOut } from 'next-auth/react';

const LinkButton = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <button className={styles.linkButton}>
      <Link href={href}>{children}</Link>
    </button>
  );
};

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title> 埋め込み投稿ツール </title>
      </Head>
      <section className={styles.top}>
        <p>Discord の埋め込みメッセージを管理します。</p>

        <p>以下のメニューからどうぞ：</p>

        <div className={styles.menu}>
          <LinkButton href='/new'>新しく作る</LinkButton>
          <LinkButton href='/edit'>編集する</LinkButton>
        </div>

        <Button onClick={() => signOut()} label='ログアウト' />
      </section>
    </div>
  );
};

export default Home;
