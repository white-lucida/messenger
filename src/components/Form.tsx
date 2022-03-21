import React, { useEffect, useMemo, useState } from 'react';
import { APIActionRowComponent, APIEmbed } from 'discord-api-types';
import clsx from 'clsx';

import { MessageInput } from './MessageInput';
import { Form as EmbedForm } from './input/Embed/Form';
import { Form as ActionRowForm } from './input/MessageComponent/Form';
import { MessagePreview } from './MessagePreview';
import { NewRowButton } from './input/MessageComponent/NewRowButton';
import { TextArea } from './input/Property';
import { Button, DiscordLikeButton } from './ui';

import { useEmbeds } from '../hooks/use_embeds';
import { EmbedsDispatchContext } from '../hooks/use_embed';
import { useActionRows } from '../hooks/use_actionrows';
import { ActionRowsDispatchContext } from '../hooks/use_actionrow';
import { SetErrorContext } from '../hooks/use_error';
import { useReloadAlert } from '../hooks/use_reloadalert';

import styles from '../../styles/Form.module.css';

type FormProps = {
  onSubmit: (content: string, embeds: APIEmbed[], components: APIActionRowComponent[]) => void;
  defaultValue?: {
    content: string;
    embeds: APIEmbed[];
    actionRows: APIActionRowComponent[];
  };
  className?: string;
};

const Form: React.VFC<FormProps> = ({ onSubmit, defaultValue, className }) => {
  const [content, setContent] = useState(defaultValue?.content ?? '');
  const { embeds, dispatch: embedsDispatch } = useEmbeds(defaultValue?.embeds);
  const { actionRows, dispatch: actionRowsDispatch } = useActionRows(defaultValue?.actionRows);
  const [isError, setIsError] = useState(false);

  const { forbidToReload, allowToReload } = useReloadAlert();
  useEffect(() => {
    forbidToReload();
  }, [content, embeds, actionRows]);

  const handleSubmit = () => {
    if (isError) return;
    onSubmit(content, embeds, actionRows);
    allowToReload();
  };

  return (
    <form onSubmit={handleSubmit} className={clsx(styles.root, className)}>
      <div className={styles.main}>
        <SetErrorContext.Provider value={setIsError}>
          <MessageInput className={styles.input}>
            <h3> 内容 </h3>
            <TextArea onChange={(value) => setContent(value)} value={content} />
            <h3> 埋め込み </h3>
            <EmbedsDispatchContext.Provider value={embedsDispatch}>
              <div className={styles.embeds}>
                {useMemo(
                  () => embeds.map((embed, i) => <EmbedForm key={i} embed={embed} index={i} />),
                  [embeds],
                )}
              </div>
            </EmbedsDispatchContext.Provider>
            <Button
              onClick={() => embedsDispatch({ type: 'newEmbed' })}
              label='埋め込みを追加する'
            />

            <h3> Message Component </h3>
            <ActionRowsDispatchContext.Provider value={actionRowsDispatch}>
              <div className={styles.actionRows}>
                {useMemo(
                  () =>
                    actionRows.map((row, rowIndex) => (
                      <ActionRowForm key={rowIndex} rowIndex={rowIndex} actionRow={row} />
                    )),
                  [actionRows],
                )}
              </div>
              <NewRowButton />
            </ActionRowsDispatchContext.Provider>
          </MessageInput>
        </SetErrorContext.Provider>
        <MessagePreview embeds={embeds} actionRows={actionRows} className={styles.preview}>
          {content}
        </MessagePreview>
      </div>
      <DiscordLikeButton className={styles.submit} label='送信する' onClick={handleSubmit} />
    </form>
  );
};

export { Form };
