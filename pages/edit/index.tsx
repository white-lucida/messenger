import clsx from 'clsx';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { Button, Header } from '../../src/components/ui';

import styles from '../../styles/Edit.module.css';

const Edit: NextPage = () => {
  const [url, setUrl] = useState('');
  const router = useRouter();

  const getEditorURL = (messageURL: string) => {
    const matcher = messageURL.match(/https:\/\/discord\.com\/channels\/.+\/(.+)\/(.+)/);
    if (matcher === null) throw new TypeError('Discordのメッセージリンクを指定してください。');

    const channelID = matcher[1];
    const messageID = matcher[2];

    return `/edit/${channelID}/${messageID}`;
  };

  const jump = () => {
    const editor = getEditorURL(url);
    router.push(editor);
  };
  return (
    <section>
      <Head>
        <title>編集画面ポータル</title>
      </Head>
      <Header />

      <main className={styles.main}>
        <p>メッセージのURLを入力し、JUMPボタンを押すと、編集画面へとジャンプします。</p>
        <p>データベースに保存されていないURLを入力した場合、エラーページに遷移します。</p>

        <input
          type='text'
          value={url ?? ''}
          onChange={(e) => setUrl(e.target.value)}
          className={clsx(styles.url, 'generalInput')}
        />
        <Button label='JUMP' onClick={() => jump()} className={styles.jumpButton} />
      </main>
    </section>
  );
};

export default Edit;
