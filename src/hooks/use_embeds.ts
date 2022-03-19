import { APIEmbed, APIEmbedAuthor, APIEmbedFooter } from 'discord-api-types';
import { useReducer } from 'react';

interface BaseEmbedPayload {
  embedIndex: number;
}

interface BaseFieldPayload {
  fieldIndex: number;
}

type EmbedActions =
  | {
      type: 'newEmbed';
    }
  | {
      type: 'newField';
      payload: BaseEmbedPayload;
    }
  | {
      type: 'setTitle';
      payload: BaseEmbedPayload & {
        title: string;
      };
    }
  | {
      type: 'setDescription';
      payload: BaseEmbedPayload & {
        description: string;
      };
    }
  | {
      type: 'setFieldName';
      payload: BaseEmbedPayload &
        BaseFieldPayload & {
          name: string;
        };
    }
  | {
      type: 'setFieldValue';
      payload: BaseEmbedPayload &
        BaseFieldPayload & {
          value: string;
        };
    }
  | {
      type: 'removeEmbed';
      payload: BaseEmbedPayload;
    }
  | {
      type: 'changeColor';
      payload: BaseEmbedPayload & { color: string };
    }
  | {
      type: 'setFooterText';
      payload: BaseEmbedPayload & { text: string };
    }
  | {
      type: 'setFooterIconURL';
      payload: BaseEmbedPayload & { icon_url: string };
    }
  | {
      type: 'setThumbnailURL';
      payload: BaseEmbedPayload & { url: string };
    }
  | {
      type: 'setAuthorName';
      payload: BaseEmbedPayload & { name: string };
    }
  | {
      type: 'setAuthorURL';
      payload: BaseEmbedPayload & { url: string };
    }
  | {
      type: 'setAuthorIconURL';
      payload: BaseEmbedPayload & { icon_url: string };
    }
  | {
      type: 'setImageURL';
      payload: BaseEmbedPayload & { url: string };
    }
  | {
      type: 'setURL';
      payload: BaseEmbedPayload & { url: string };
    }
  | {
      type: 'setTimestamp';
      payload: BaseEmbedPayload & { timestamp: string };
    }
  | {
      type: 'removeField';
      payload: BaseEmbedPayload & BaseFieldPayload;
    };

/**
 * 特定の`Embed`を変更したStateを返します
 * @param  {APIEmbed[]} state - 変更したいState
 * @param  {APIEmbed} content - 変更する`Embed`
 * @param  {number} index - 変更先の`Embed`のインデックス
 * @returns 変更後のState
 */
const setEmbed = (state: APIEmbed[], content: APIEmbed, index: number) =>
  state.map((embed, i) => (i === index ? content : embed));

const setAuthor = (state: APIEmbed[], author: Partial<APIEmbedAuthor>, index: number) =>
  setEmbed(state, { ...state[index], author: { ...author, name: author.name ?? '' } }, index);

const setFooter = (state: APIEmbed[], footer: Partial<APIEmbedFooter>, index: number) =>
  setEmbed(state, { ...state[index], footer: { ...footer, text: footer?.text ?? '' } }, index);

/**
 * `Embed`のState管理用Reducerの実装
 * @param  {APIEmbed[]} state
 * @param  {EmbedActions} action
 * @returns APIEmbed
 */
const reducer = (state: APIEmbed[], action: EmbedActions): APIEmbed[] => {
  /**
   * 特定の`Embed`の内容を変更します
   * @param  {APIEmbed} content - 変更後の内容
   * @param  {number} index - 変更したい`Embed`のインデックス
   */

  switch (action.type) {
    case 'newEmbed':
      return [...state, {}];
    case 'newField': {
      const embedIndex = action.payload.embedIndex;
      const embed = state[embedIndex];
      return setEmbed(
        state,
        {
          ...embed,
          fields: [
            ...(embed.fields ?? []),
            {
              name: '',
              value: '',
            },
          ],
        },
        embedIndex,
      );
    }
    case 'setTitle': {
      const embedIndex = action.payload.embedIndex;
      return setEmbed(
        state,
        {
          ...state[embedIndex],
          title: action.payload.title,
        },
        embedIndex,
      );
    }
    case 'setDescription': {
      const embedIndex = action.payload.embedIndex;
      return setEmbed(
        state,
        {
          ...state[embedIndex],
          description: action.payload.description,
        },
        embedIndex,
      );
    }
    case 'setFieldName':
    case 'setFieldValue': {
      const embedIndex = action.payload.embedIndex;
      const fieldIndex = action.payload.fieldIndex;
      const embed = state[embedIndex];
      const data =
        action.type === 'setFieldName'
          ? { name: action.payload.name }
          : { value: action.payload.value };
      return setEmbed(
        state,
        {
          ...embed,
          fields: embed.fields?.map((field, i) =>
            fieldIndex === i
              ? {
                  ...field,
                  ...data,
                }
              : field,
          ),
        },
        embedIndex,
      );
    }
    case 'removeEmbed': {
      return state.filter((_, index) => index !== action.payload.embedIndex);
    }
    case 'changeColor': {
      const embedIndex = action.payload.embedIndex;
      return setEmbed(
        state,
        {
          ...state[embedIndex],
          color: Number.parseInt(action.payload.color.substring(1), 16),
        },
        embedIndex,
      );
    }
    case 'setAuthorIconURL': {
      const embedIndex = action.payload.embedIndex;
      return setAuthor(
        state,
        {
          ...state[embedIndex].author,
          icon_url: action.payload.icon_url,
        },
        embedIndex,
      );
    }
    case 'setAuthorName': {
      const embedIndex = action.payload.embedIndex;
      return setAuthor(
        state,
        { ...state[embedIndex].author, name: action.payload.name },
        embedIndex,
      );
    }
    case 'setAuthorURL': {
      const embedIndex = action.payload.embedIndex;
      return setAuthor(
        state,
        {
          ...state[embedIndex].author,
          url: action.payload.url,
        },
        embedIndex,
      );
    }
    case 'setFooterText': {
      const embedIndex = action.payload.embedIndex;
      return setFooter(
        state,
        {
          ...state[embedIndex].footer,
          text: action.payload.text,
        },
        embedIndex,
      );
    }
    case 'setFooterIconURL': {
      const embedIndex = action.payload.embedIndex;
      return setFooter(
        state,
        {
          ...state[embedIndex].footer,
          icon_url: action.payload.icon_url,
        },
        embedIndex,
      );
    }
    case 'setThumbnailURL': {
      const embedIndex = action.payload.embedIndex;
      const embed = state[embedIndex];
      return setEmbed(
        state,
        {
          ...embed,
          thumbnail: {
            ...embed.thumbnail,
            url: action.payload.url,
          },
        },
        embedIndex,
      );
    }
    case 'setImageURL': {
      const embedIndex = action.payload.embedIndex;
      const embed = state[embedIndex];
      return setEmbed(
        state,
        {
          ...embed,
          image: {
            ...embed.image,
            url: action.payload.url,
          },
        },
        embedIndex,
      );
    }
    case 'setURL': {
      const embedIndex = action.payload.embedIndex;
      return setEmbed(state, { ...state[embedIndex], url: action.payload.url }, embedIndex);
    }
    case 'setTimestamp': {
      const embedIndex = action.payload.embedIndex;
      return setEmbed(
        state,
        { ...state[embedIndex], timestamp: action.payload.timestamp },
        embedIndex,
      );
    }
    case 'removeField': {
      const embedIndex = action.payload.embedIndex;
      const fieldIndex = action.payload.fieldIndex;
      return state.map((embed, i) =>
        i === embedIndex
          ? { ...embed, fields: embed.fields?.filter((_, n) => n !== fieldIndex) }
          : embed,
      );
    }
  }
};

/**
 * `Embed`の管理用Stateを生成します。
 * @param  {APIEmbed[]} defaultValue? - `Embed`の既定値
 * @returns state
 */
const useEmbeds = (defaultValue?: APIEmbed[]) => {
  const [embeds, dispatch] = useReducer(reducer, defaultValue ?? []);

  return {
    embeds,
    dispatch,
  };
};

export { useEmbeds };
export type { EmbedActions };
