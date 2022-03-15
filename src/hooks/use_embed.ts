import React, { Dispatch, useContext } from 'react';
import { EmbedActions } from './use_embeds';

const EmbedsDispatchContext = React.createContext<Dispatch<EmbedActions> | undefined>(undefined);

export { EmbedsDispatchContext };
export const useEmbed = () => {
  const context = useContext(EmbedsDispatchContext);
  if (context === undefined) throw new Error('');
  return context;
};
