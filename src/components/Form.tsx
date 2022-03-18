import React, { useMemo, useState } from 'react';
import { APIActionRowComponent, APIEmbed } from 'discord-api-types';

import { MessageInput } from './MessageInput';
import { Form as EmbedForm } from './input/Embed/Form';
import { Form as ActionRowForm } from './input/MessageComponent/Form';
import { MessagePreview } from './MessagePreview';
import { NewRowButton } from './input/MessageComponent/NewRowButton';
import { TextArea } from './input/Property';

import { useEmbeds } from '../hooks/use_embeds';
import { EmbedsDispatchContext } from '../hooks/use_embed';
import { useActionRows } from '../hooks/use_actionrows';
import { ActionRowsDispatchContext } from '../hooks/use_actionrow';

import styles from '../../styles/Form.module.css';
import { Button, DiscordLikeButton } from './ui';

type FormProps = {
  onSubmit: (content: string, embeds: APIEmbed[], components: APIActionRowComponent[]) => void;
  defaultValue?: {
    content: string;
    embeds: APIEmbed[];
    actionRows: APIActionRowComponent[];
  };
};

const Form: React.VFC<FormProps> = ({ onSubmit, defaultValue }) => {
  const [content, setContent] = useState(defaultValue?.content ?? '');
  const { embeds, dispatch: embedsDispatch } = useEmbeds(defaultValue?.embeds);
  const { actionRows, dispatch: actionRowsDispatch } = useActionRows(defaultValue?.actionRows);

  const handleSubmit = () => {
    onSubmit(content, embeds, actionRows);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.root}>
      <MessageInput className={styles.input}>
        <h3> 内容 </h3>
        <TextArea onChange={(value) => setContent(value)} value={content} />
        <h3> 埋め込み </h3>
        <EmbedsDispatchContext.Provider value={embedsDispatch}>
          <div className={styles.embedInputs}>
            {useMemo(
              () => embeds.map((embed, i) => <EmbedForm key={i} embed={embed} index={i} />),
              [embeds],
            )}
          </div>
        </EmbedsDispatchContext.Provider>
        <Button onClick={() => embedsDispatch({ type: 'newEmbed' })} label='埋め込みを追加する' />

        <h3> Message Component </h3>
        <ActionRowsDispatchContext.Provider value={actionRowsDispatch}>
          {useMemo(
            () =>
              actionRows.map((row, rowIndex) => (
                <ActionRowForm key={rowIndex} rowIndex={rowIndex} actionRow={row} />
              )),
            [actionRows],
          )}
          <NewRowButton />
        </ActionRowsDispatchContext.Provider>
      </MessageInput>
      <MessagePreview embeds={embeds} actionRows={actionRows} className={styles.preview}>
        {content}
      </MessagePreview>
      <DiscordLikeButton className={styles.submit} label='送信する' onClick={handleSubmit} />
    </form>
  );
};

export { Form };
