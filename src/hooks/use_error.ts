import React, { useContext } from 'react';

const context = React.createContext<React.Dispatch<boolean> | undefined>(undefined);

const useError = () => {
  const ctx = useContext(context);
  if (ctx === undefined) throw new TypeError();
  return ctx;
};

export { useError, context as SetErrorContext };
