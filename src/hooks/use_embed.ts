import React, { Dispatch, useContext } from 'react';
import { EmbedActions } from './use_embeds';

const EmbedsDispatchContext = React.createContext<Dispatch<EmbedActions> | undefined>(undefined);

export { EmbedsDispatchContext };
/**
 * `Embed`Reducerの`dispatch`をContextから取得します
 *  @returns `dispatch`
 */
export const useEmbed = () => {
  const context = useContext(EmbedsDispatchContext);
  if (context === undefined) throw new Error('');
  return context;
};
