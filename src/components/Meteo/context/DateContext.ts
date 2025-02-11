import { createContext, useContext } from 'react';

import { DateType, ReducerActionType } from './DateProvider';

export const DateContext = createContext<
  | {
      date: DateType;
      dispatch: React.ActionDispatch<[action: ReducerActionType]>;
    }
  | undefined
>(undefined);

export const useDateContext = () => {
  const context = useContext(DateContext);
  if (!context) {
    throw new Error('no DateContext');
  }
  return context;
};
