import { APIEmbed } from 'discord-api-types';
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
      type: 'setAuthorName';
      payload: BaseEmbedPayload & {
        name: string;
      };
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
    };
/**
 *
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
  const setEmbed = (content: APIEmbed, index: number) =>
    state.map((embed, i) => (i === index ? content : embed));
  switch (action.type) {
    case 'newEmbed':
      return [...state, {}];
    case 'newField': {
      const embedIndex = action.payload.embedIndex;
      const embed = state[embedIndex];
      return setEmbed(
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
    case 'setAuthorName': {
      const embedIndex = action.payload.embedIndex;
      return setEmbed(
        {
          ...state[embedIndex],
          author: {
            ...state[embedIndex],
            name: action.payload.name,
          },
        },
        embedIndex,
      );
    }
    case 'setTitle': {
      const embedIndex = action.payload.embedIndex;
      return setEmbed(
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
