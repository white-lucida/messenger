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

const reducer = (
  state: APIActionRowComponent[],
  action: ActionRowsActions,
): APIActionRowComponent[] => {
  const addComponent = (content: APIButtonComponent | APISelectMenuComponent, index: number) => {
    return state.map((row, i) =>
      i === index ? { ...row, components: [...row.components, content] } : row,
    );
  };

  const setButton = (content: APIButtonComponent, rowIndex: number, buttonIndex: number) => {
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

  switch (action.type) {
    case 'newRow':
      return [...state, { type: 1, components: [] }];
    case 'newButton':
      return addComponent({ type: 2, label: '', url: '', style: 1 }, action.payload.index);
    case 'newSelectMenu':
      return addComponent({ type: 3, custom_id: '' }, action.payload.index);
    case 'setButtonLabel':
    case 'toggleButtonDisabled':
      const rowIndex = action.payload.rowIndex;
      const buttonIndex = action.payload.buttonIndex;
      const prev = state[rowIndex].components[buttonIndex];
      if (prev.type !== 2) return state;

      let next: APIButtonComponent = { ...prev };
      switch (action.type) {
        case 'setButtonLabel':
          next = { ...prev, label: action.payload.label };
          break;
        case 'toggleButtonDisabled':
          next = { ...prev, disabled: !(prev.disabled ?? false) };
          break;
      }
      return setButton(next, rowIndex, buttonIndex);
  }
};

const useActionRows = (defaultValue?: APIActionRowComponent[]) => {
  const [state, dispatch] = useReducer(reducer, defaultValue ?? []);

  return {
    actionRows: state,
    dispatch,
  };
};

export { useActionRows };
export type { ActionRowsActions };
