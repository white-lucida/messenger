import styles from "../../styles/Form.module.css";
import React, { useCallback, useEffect, useMemo, useState, createContext } from "react";
import { APIActionRowComponent, APIEmbed, APIMessageComponent, ComponentType } from "discord-api-types";
import { MessageInput } from "./MessageInput";
import { EmbedInput } from "./EmbedInput";
import { MessagePreview } from "./MessagePreview";
import { useEmbeds } from "../hooks/use_embeds";
import { EmbedsDispatchContext, useEmbed } from "../hooks/use_embed";
import { ActionRowsActions, useActionRows } from "../hooks/use_actionrows";
import { ActionRowInput } from "./ActionRowInput";
import { useActionRow } from "../hooks/use_actionrow";
import { ActionRowsDispatchContext } from "../hooks/use_actionrow";
import { NewRowButton } from "./NewRowButton";

type FormProps = {
  children: React.ReactNode,
  onSubmit: (embeds: APIEmbed[], components: Partial<APIMessageComponent>[]) => void
}

const Form: React.VFC<FormProps> = ({ children, onSubmit }) => {
  /*
   元データから編集用オブジェクトを形成
  */
  const _baseData: APIEmbed[] = [{
    title: "Hello"
  }];

  const _baseData2: APIActionRowComponent[] = [{
    type: 1,
    components: [
      {
        type: 2,
        url: "",
        style: 2,
        label: "おー"
      }
    ]
  }]

  const { embeds, dispatch: embedsDispatch } = useEmbeds(_baseData);
  const { actionRows, dispatch: actionRowsDispatch } = useActionRows(_baseData2);

  return (
    <form onSubmit={() => onSubmit(embeds, actionRows)} className={styles.root}>
      <MessageInput className={styles.input}>
        <EmbedsDispatchContext.Provider value={embedsDispatch}>
          <div className={styles.embedInputs}>
            {
              useMemo(() => embeds.map((embed, i) => (
                <EmbedInput key={i} embed={embed} index={i} />
                )
              ), [embeds])
            }
          </div>
        </EmbedsDispatchContext.Provider>
        <input type="button" onClick={() => embedsDispatch({ type: "newEmbed" })} value="埋め込みを追加する" />
        <ActionRowsDispatchContext.Provider value={ actionRowsDispatch }>
          {
            useMemo(() => actionRows.map(
              (row, rowIndex) => (
                <ActionRowInput key={rowIndex} rowIndex={rowIndex} actionRow={row} />
              )
            ), [actionRows])
          }
          <NewRowButton />
        </ActionRowsDispatchContext.Provider>
      </MessageInput>
      <MessagePreview embeds={embeds} actionRows={actionRows} className={styles.preview} />
      <input type="submit" />
    </form>
  );
}

export { Form }