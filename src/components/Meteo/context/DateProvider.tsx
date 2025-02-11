import { useEffect, useReducer } from 'react';

import { DateContext } from './DateContext';

export type MeteoDataSourceType =
  | 'davisDaily'
  | 'lipnoDaily'
  | 'davisTextSummary'
  | 'oldStationDaily';

export type ReducerActionType =
  | {
      type: 'UPDATE_DATE';
      payload: {
        meteoDataSource: MeteoDataSourceType;
        meteoDate: Date;
      };
    }
  | {
      type: 'RESET_DATE';
      payload: {
        meteoDataSource: MeteoDataSourceType;
      };
    };

export type DateType = {
  [key in MeteoDataSourceType]: Date;
};

const defaultDate: DateType = {
  davisDaily: new Date(),
  lipnoDaily: new Date(),
  davisTextSummary: new Date(),
  oldStationDaily: new Date(2012, 8, 22),
};

export class Store {
  static getDateFromStorage() {
    const localStore = localStorage.getItem('myDate');

    if (localStore !== null) {
      const { davisDaily, lipnoDaily, davisTextSummary, oldStationDaily } =
        JSON.parse(localStore);
      return {
        davisDaily: new Date(davisDaily),
        lipnoDaily: new Date(lipnoDaily),
        davisTextSummary: new Date(davisTextSummary),
        oldStationDaily: new Date(oldStationDaily),
      };
    }

    return defaultDate;
  }
}

export const DateProvider = ({ children }: { children: React.ReactNode }) => {
  const reducerFunc = (currentDate: DateType, action: ReducerActionType) => {
    switch (action.type) {
      case 'UPDATE_DATE':
        return {
          ...currentDate,
          [action.payload.meteoDataSource]: action.payload.meteoDate,
        };
      case 'RESET_DATE':
        return {
          ...currentDate,
          [action.payload.meteoDataSource]:
            action.payload.meteoDataSource === 'oldStationDaily'
              ? new Date(2012, 7, 22)
              : new Date(),
        };

      default:
        return currentDate;
    }
  };
  const [date, dispatch] = useReducer(reducerFunc, Store.getDateFromStorage());

  useEffect(() => {
    localStorage.setItem(
      'myDate',
      JSON.stringify(date, (_, value) =>
        value instanceof Date ? value.toISOString() : value
      )
    );
  }, [date]);

  return (
    <DateContext.Provider value={{ date, dispatch }}>
      {children}
    </DateContext.Provider>
  );
};
