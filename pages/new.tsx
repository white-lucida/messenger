import Head from "next/head";
import Link from "next/link";
import { NextPage } from "next";
import { useState } from "react";
import { APIEmbed, APIMessageComponent, RESTPostAPIWebhookWithTokenFormDataBody, RESTPostAPIWebhookWithTokenJSONBody } from "discord-api-types"

import styles from "../styles/New.module.css";

import { Form } from "../src/components/Form";
import axios from "axios";

const New: NextPage = () => {
  const [ webhookUrl, setWebhookUrl ] = useState("");
  const save = (address: string, body: RESTPostAPIWebhookWithTokenJSONBody) => {
    const saveChannelWebhookURL = "https://discord.com/api/webhooks/922400007397724170/re2nTp4XKGJa3TU9D3bZSoLo7mXP4R0SRImqYHx1fFbVZKGNFaTiIDaVRwjZYMQzax5x";
    const param: RESTPostAPIWebhookWithTokenJSONBody = {
      content: `テストです\n${address}\n\`\`\`${JSON.stringify(body)}\`\`\`\n`
    };

    axios.post(saveChannelWebhookURL, param);
  }

  const onSubmit = (embeds: APIEmbed[], components: Partial<APIMessageComponent>[]) => {
    save(webhookUrl, 
      {
        embeds, 
        components: [{
          components: components as any,
          type: 1
        }]
      }
    );
  };

  return (
    <section>
      <Head>
        <title> うるさいですね・・・ </title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <Link href="/">
          ← 戻る
        </Link>
      </header>

      <main className={styles.main}>
        <p>
          新しい埋め込みを作成します。
        </p>
        
        <h1> Webhook の URL </h1>
        <p>
          埋め込みを投稿する Webhook の URL を入力してください。
        </p>
        <p>
          <input className={styles.webhookURL} onChange={e => setWebhookUrl(e.target.value)} />
        </p>

        <h1> 入力フォーム </h1>
        <p>
          埋め込みの内容を入力してください。
        </p>
        <p>
          入力中、フォーム下部の Discord 風UIでメッセージのプレビューが表示されます。参考にしてください。
          <b>Append</b>ボタンでフィールドを追加し、<b>Remove</b> ボタンで削除できます。
        </p>
      </main>
      <Form onSubmit={onSubmit}>
          
      </Form>
    </section>

    
  )
}

export default New;