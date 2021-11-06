import Link from "next/link";
import { NextPage } from "next";
import { useState } from "react";

import styles from "../styles/New.module.css";

import { EmbedMenu } from "../src/components/EmbedMenu";
import { MessageEmbed } from "../src/embed";

const initData = {
	color: 0x0099ff,
	title: 'タイトル',
	description: '説明',
	fields: [
		{
			name: 'フィールド名',
			value: 'フィールドの値',
		}
	]
};

const New: NextPage = () => {
  const data = new MessageEmbed(initData);
  const [ webhookUrl, setWebhookUrl ] = useState("");

  return (
    <section>
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

        <EmbedMenu baseData={data} webhookUrl={webhookUrl}/>
      </main>
    </section>
  )
}

export default New;