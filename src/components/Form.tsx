import styles from '../../styles/Form.module.css';
import React, { useMemo } from 'react';
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

type FormProps = {
  onSubmit: (embeds: APIEmbed[], components: APIMessageComponent[]) => void;
  defaultValue?: {
    embeds: APIEmbed[];
    actionRows: APIActionRowComponent[];
  };
};

const Form: React.VFC<FormProps> = ({ onSubmit, defaultValue }) => {
  const { embeds, dispatch: embedsDispatch } = useEmbeds(defaultValue?.embeds);
  const { actionRows, dispatch: actionRowsDispatch } = useActionRows(defaultValue?.actionRows);

  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();
    onSubmit(embeds, actionRows);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.root}>
      <MessageInput className={styles.input}>
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
      <MessagePreview embeds={embeds} actionRows={actionRows} className={styles.preview} />
      <input type='submit' />
    </form>
  );
};

export { Form };
