import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { Button, Header } from '../../src/components/ui';

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
      <Header />
      <h1>編集画面ポータル</h1>

      <p>
        編集可能なメッセージのリストを生成するのはコストがかさむので、
        メッセージリンクから編集画面に飛べるこのページを以て代えさせてください。
      </p>

      <input type='text' value={url ?? ''} onChange={(e) => setUrl(e.target.value)} />
      <Button label='JUMP' onClick={() => jump()} />
    </section>
  );
};

export default Edit;
