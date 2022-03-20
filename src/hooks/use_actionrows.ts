import {
  APIActionRowComponent,
  APIButtonComponent,
  APISelectMenuComponent,
  ButtonStyle,
} from 'discord-api-types/payloads/v9';
import { useReducer } from 'react';
import { isButton, isButtonWithCustomID, isButtonWithURL } from '../utils/components_type';

interface BaseRowAction {
  rowIndex: number;
}

interface BaseComponentAction extends BaseRowAction {
  componentIndex: number;
}

type ActionRowsActions =
  | {
      type: 'newRow';
    }
  | {
      type: 'newButton';
      payload: BaseRowAction;
    }
  | {
      type: 'newSelectMenu';
      payload: BaseRowAction;
    }
  | {
      type: 'setButtonLabel';
      payload: BaseComponentAction & { label: string };
    }
  | {
      type: 'setButtonURL';
      payload: BaseComponentAction & { url: string };
    }
  | {
      type: 'setButtonCustomID';
      payload: BaseComponentAction & { custom_id: string };
    }
  | {
      type: 'toggleButtonDisabled';
      payload: BaseComponentAction;
    }
  | {
      type: 'removeComponent';
      payload: BaseComponentAction;
    }
  | {
      type: 'removeRow';
      payload: BaseRowAction;
    }
  | {
      type: 'setButtonStyle';
      payload: BaseComponentAction & { style: ButtonStyle };
    };

/**
 * 特定の`ActionRow`に対してMessage Componentを追加したStateを返します
 * @param  {APIActionRowComponent[]} state - 追加先のState
 * @param  {APIButtonComponent|APISelectMenuComponent} content - 追加するMessage Component
 * @param  {number} index - Stateにおける、Message Component追加先の`ActionRow`のインデックス
 */
const addComponent = (
  state: APIActionRowComponent[],
  content: APIButtonComponent | APISelectMenuComponent,
  index: number,
) => {
  return state.map((row, i) =>
    i === index ? { ...row, components: [...row.components, content] } : row,
  );
};
/**
 * 特定のボタンオブジェクトの内容を変更したStateを返します
 * @param  {APIActionRowComponent[]} state - 追加先のState
 * @param  {APIButtonComponent} content - 変更するボタン
 * @param  {number} rowIndex - 変更先のボタンを含む`ActionRow`のインデックス
 * @param  {number} buttonIndex - `ActionRow`における変更先のボタンのインデックス
 */
const setButton = (
  state: APIActionRowComponent[],
  content: APIButtonComponent,
  rowIndex: number,
  buttonIndex: number,
) => {
  return state.map((row, i) =>
    i === rowIndex
      ? {
          ...row,
          components: row.components.map((component, n) =>
            component.type === 2 && n === buttonIndex ? content : component,
          ),
        }
      : row,
  );
};

const getComponent = (state: APIActionRowComponent[], rowIndex: number, index: number) =>
  state[rowIndex].components[index];

/**
 * `ActionRow`のState管理用Reducerの実装です。
 * @param  {APIActionRowComponent[]} state - 現在のState
 * @param  {ActionRowsActions} action - 実行するaction
 * @returns 新しいState
 */
const reducer = (
  state: APIActionRowComponent[],
  action: ActionRowsActions,
): APIActionRowComponent[] => {
  switch (action.type) {
    case 'newRow':
      return [...state, { type: 1, components: [] }];
    case 'newButton':
      return addComponent(
        state,
        { type: 2, label: '', custom_id: Date.now().toString(), style: 1 }, // 暫定の実装, customIDとURLの設定を実装したら変更する
        action.payload.rowIndex,
      );
    case 'newSelectMenu':
      return addComponent(state, { type: 3, custom_id: '' }, action.payload.rowIndex);
    case 'setButtonLabel':
    case 'toggleButtonDisabled': {
      const { rowIndex, componentIndex } = action.payload;
      const prev = getComponent(state, rowIndex, componentIndex);
      if (!isButton(prev)) return state;

      /**
       * 無理やりすぎる
       * 三項演算子では拡張性が低いと感じswitch文で分岐させ、かつ変更先を定数で扱えるようにしたらこうなりました.
       */
      const next = (() => {
        switch (action.type) {
          case 'setButtonLabel':
            return { ...prev, label: action.payload.label };
          case 'toggleButtonDisabled':
            return { ...prev, disabled: !(prev.disabled ?? false) };
        }
      })();

      return setButton(state, next, rowIndex, componentIndex);
    }
    case 'removeComponent':
      return state.map((row, index) =>
        index === action.payload.rowIndex
          ? {
              ...row,
              components: row.components.filter((_, i) => i !== action.payload.componentIndex),
            }
          : row,
      );
    case 'removeRow':
      return state.filter((_, index) => index !== action.payload.rowIndex);

    case 'setButtonCustomID':
    case 'setButtonURL': {
      const { rowIndex, componentIndex } = action.payload;
      const button = getComponent(state, rowIndex, componentIndex);

      if (!isButton(button)) return state;
      if (isButtonWithCustomID(button) && action.type === 'setButtonCustomID') {
        return setButton(
          state,
          { ...button, custom_id: action.payload.custom_id },
          rowIndex,
          componentIndex,
        );
      }
      if (isButtonWithURL(button) && action.type === 'setButtonURL') {
        return setButton(state, { ...button, url: action.payload.url }, rowIndex, componentIndex);
      }
      return state;
    }
    case 'setButtonStyle': {
      const { rowIndex, componentIndex, style } = action.payload;

      const button = getComponent(state, rowIndex, componentIndex);
      if (!isButton(button)) return state;
      if (style === 5) return state; // styleがButtonStyle.Link の場合

      if (isButtonWithCustomID(button) || isButtonWithCustomID(button))
        // 型エラー対策
        return setButton(state, { ...button, style }, rowIndex, componentIndex);
      return state;
    }
  }
};

/**
 * `ActionRow`の管理用Stateを生成します。
 * @param  {APIActionRowComponent[]} defaultValue? - `ActionRow`の既定値
 * @returns state
 */
const useActionRows = (defaultValue?: APIActionRowComponent[]) => {
  const [state, dispatch] = useReducer(reducer, defaultValue ?? []);

  return {
    actionRows: state,
    dispatch,
  };
};

export { useActionRows };
export type { ActionRowsActions };
