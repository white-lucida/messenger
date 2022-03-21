import { APIEmbed, APIEmbedAuthor, APIEmbedFooter } from 'discord-api-types';
import { useReducer } from 'react';

interface BaseEmbedPayload {
  embedIndex: number;
}

interface BaseFieldPayload extends BaseEmbedPayload {
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
      payload: BaseFieldPayload & {
        name: string;
      };
    }
  | {
      type: 'setFieldValue';
      payload: BaseFieldPayload & {
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
      payload: BaseFieldPayload;
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

  if (!('payload' in action)) {
    switch (action.type) {
      case 'newEmbed':
        return [...state, {}];
      default:
        return state;
    }
  }

  const embedIndex = action.payload.embedIndex;

  if (!('fieldIndex' in action.payload)) {
    switch (action.type) {
      case 'removeEmbed':
        return state.filter((_, i) => i !== embedIndex);
      case 'newField': {
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
        const { title } = action.payload;
        return setEmbed(
          state,
          {
            ...state[embedIndex],
            title,
          },
          embedIndex,
        );
      }
      case 'setDescription': {
        const { description } = action.payload;
        return setEmbed(
          state,
          {
            ...state[embedIndex],
            description,
          },
          embedIndex,
        );
      }
      case 'changeColor': {
        const { color } = action.payload;
        return setEmbed(
          state,
          {
            ...state[embedIndex],
            color: Number.parseInt(color.substring(1), 16),
          },
          embedIndex,
        );
      }
      case 'setAuthorIconURL': {
        const { icon_url } = action.payload;
        return setAuthor(
          state,
          {
            ...state[embedIndex].author,
            icon_url,
          },
          embedIndex,
        );
      }
      case 'setAuthorName': {
        const { name } = action.payload;
        return setAuthor(state, { ...state[embedIndex].author, name }, embedIndex);
      }
      case 'setAuthorURL': {
        const { url } = action.payload;
        return setAuthor(
          state,
          {
            ...state[embedIndex].author,
            url,
          },
          embedIndex,
        );
      }
      case 'setFooterText': {
        const { text } = action.payload;
        return setFooter(
          state,
          {
            ...state[embedIndex].footer,
            text,
          },
          embedIndex,
        );
      }
      case 'setFooterIconURL': {
        const { icon_url } = action.payload;
        return setFooter(
          state,
          {
            ...state[embedIndex].footer,
            icon_url,
          },
          embedIndex,
        );
      }
      case 'setThumbnailURL': {
        const { url } = action.payload;
        const embed = state[embedIndex];
        return setEmbed(
          state,
          {
            ...embed,
            thumbnail: {
              ...embed.thumbnail,
              url,
            },
          },
          embedIndex,
        );
      }
      case 'setImageURL': {
        const { url } = action.payload;
        const embed = state[embedIndex];
        return setEmbed(
          state,
          {
            ...embed,
            image: {
              ...embed.image,
              url,
            },
          },
          embedIndex,
        );
      }
      case 'setURL': {
        const { url } = action.payload;
        return setEmbed(state, { ...state[embedIndex], url }, embedIndex);
      }
      case 'setTimestamp': {
        const { timestamp } = action.payload;
        return setEmbed(state, { ...state[embedIndex], timestamp }, embedIndex);
      }
      default:
        return state;
    }
  }

  const { fieldIndex } = action.payload;

  switch (action.type) {
    case 'setFieldName':
    case 'setFieldValue': {
      const embed = state[embedIndex];
      const data =
        'name' in action.payload ? { name: action.payload.name } : { value: action.payload.value };
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
    case 'removeField': {
      return state.map((embed, i) =>
        i === embedIndex
          ? { ...embed, fields: embed.fields?.filter((_, n) => n !== fieldIndex) }
          : embed,
      );
    }
    default:
      return state;
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
