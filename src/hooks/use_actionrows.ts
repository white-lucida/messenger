import {
  APIActionRowComponent,
  APIButtonComponent,
  APISelectMenuComponent,
} from 'discord-api-types/payloads/v9';
import { useReducer } from 'react';

type ActionRowsActions =
  | {
      type: 'newRow';
    }
  | {
      type: 'newButton';
      payload: {
        index: number;
      };
    }
  | {
      type: 'newSelectMenu';
      payload: {
        index: number;
      };
    }
  | {
      type: 'setButtonLabel';
      payload: {
        rowIndex: number;
        buttonIndex: number;
        label: string;
      };
    }
  /*
  | {
      type: 'setButtonURL';
      payload: {
        rowIndex: number;
        buttonIndex: number;
        url: string;
      };
    }
    */
  /* 
    urlを設定する場合型の制御が難しいため現時点では実装を見送ります
   */
  | {
      type: 'toggleButtonDisabled';
      payload: {
        rowIndex: number;
        buttonIndex: number;
      };
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
      return addComponent(state, { type: 2, label: '', url: '', style: 1 }, action.payload.index);
    case 'newSelectMenu':
      return addComponent(state, { type: 3, custom_id: '' }, action.payload.index);
    case 'setButtonLabel':
    case 'toggleButtonDisabled':
      const rowIndex = action.payload.rowIndex;
      const buttonIndex = action.payload.buttonIndex;
      const prev = state[rowIndex].components[buttonIndex];
      if (prev.type !== 2) return state;

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

      return setButton(state, next, rowIndex, buttonIndex);
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
