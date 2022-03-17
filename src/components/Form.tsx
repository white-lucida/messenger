import styles from '../../styles/Form.module.css';
import React, { useMemo, useState } from 'react';
import { APIActionRowComponent, APIEmbed, APIMessageComponent } from 'discord-api-types';
import { MessageInput } from './MessageInput';
import { EmbedInput } from './EmbedInput';
import { MessagePreview } from './MessagePreview';
import { useEmbeds } from '../hooks/use_embeds';
import { EmbedsDispatchContext } from '../hooks/use_embed';
import { useActionRows } from '../hooks/use_actionrows';
import { ActionRowInput } from './ActionRowInput';
import { ActionRowsDispatchContext } from '../hooks/use_actionrow';
import { NewRowButton } from './NewRowButton';
import { PropertyTextArea } from './input/property_textarea';

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

  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();
    onSubmit(content, embeds, actionRows);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.root}>
      <MessageInput className={styles.input}>
        <h3> 内容 </h3>
        <PropertyTextArea onChange={(value) => setContent(value)} value={content} />
        <h3> 埋め込み </h3>
        <EmbedsDispatchContext.Provider value={embedsDispatch}>
          <div className={styles.embedInputs}>
            {useMemo(
              () => embeds.map((embed, i) => <EmbedInput key={i} embed={embed} index={i} />),
              [embeds],
            )}
          </div>
        </EmbedsDispatchContext.Provider>
        <input
          type='button'
          onClick={() => embedsDispatch({ type: 'newEmbed' })}
          value='埋め込みを追加する'
        />

        <h3> Message Component </h3>
        <ActionRowsDispatchContext.Provider value={actionRowsDispatch}>
          {useMemo(
            () =>
              actionRows.map((row, rowIndex) => (
                <ActionRowInput key={rowIndex} rowIndex={rowIndex} actionRow={row} />
              )),
            [actionRows],
          )}
          <NewRowButton />
        </ActionRowsDispatchContext.Provider>
      </MessageInput>
      <MessagePreview embeds={embeds} actionRows={actionRows} className={styles.preview}>
        {content}
      </MessagePreview>
      <input type='submit' />
    </form>
  );
};

export { Form };
