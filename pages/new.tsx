import Head from 'next/head';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import {
  APIActionRowComponent,
  APIEmbed,
  RESTPostAPIWebhookWithTokenJSONBody,
} from 'discord-api-types';
import axios from 'axios';

import { Header } from '../src/components/ui';
import { Form } from '../src/components/Form';

import styles from '../styles/New.module.css';
import clsx from 'clsx';
import { useReloadAlert } from '../src/hooks/use_reloadalert';

const New: NextPage = () => {
  const [channelUrl, setChannelUrl] = useState('');
  const save = (address: string, body: RESTPostAPIWebhookWithTokenJSONBody) => {};

  const onSubmit = (content: string, embeds: APIEmbed[], actionRows: APIActionRowComponent[]) => {
    const data = {
      url: channelUrl,
      content,
      embeds,
      actionRows,
    };
    axios.post('/api/send', data);
  };

  return (
    <section>
      <Head>
        <title> 新規メッセージ </title>
      </Head>
      <Header />

      <main className={styles.main}>
        <h1> 新規メッセージ </h1>
        <p> 新しいメッセージを作成します。 </p>

        <h3> チャンネルのURL </h3>
        <p> メッセージを投稿するDiscordチャンネルのURLを入力してください。</p>
        <p>
          <input
            className={clsx(styles.channelURL, 'generalInput')}
            onChange={(e) => setChannelUrl(e.target.value)}
            value={channelUrl ?? ''}
          />
        </p>
      </main>
      <Form onSubmit={onSubmit}></Form>
    </section>
  );
};

export default New;
