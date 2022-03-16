import { ActionRowsActions } from './use_actionrows';
import React, { Dispatch, useContext } from 'react';

const ActionRowsDispatchContext = React.createContext<Dispatch<ActionRowsActions> | undefined>(
  undefined,
);

export { ActionRowsDispatchContext };

/**
 * `ActionRow`Reducerの`dispatch`をContextから取得します
 *  @returns `dispatch`
 */
export const useActionRow = () => {
  const context = useContext(ActionRowsDispatchContext);
  if (context === undefined) throw new Error('action rows dispatch is still undefined');
  return context;
};
