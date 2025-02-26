import { produce } from 'immer';
import { create } from 'zustand';
import { createJSONStorage, persist, PersistOptions } from 'zustand/middleware';

const defaultDate: DateType = {
  davisDaily: new Date(),
  lipnoDaily: new Date(),
  davisTextSummary: new Date(),
  oldStationDaily: new Date(2012, 8, 22),
};

export const useDateStore = create(
  persist<DateStore>(
    (set) => ({
      dates: defaultDate,
      updateDate: (key, newDate) =>
        set(
          produce((state: DateStore) => {
            state.dates[key] = newDate;
          })
        ),
      resetDate: (key) =>
        set(
          produce((state: DateStore) => {
            state.dates[key] =
              key === 'oldStationDaily' ? new Date(2012, 7, 22) : new Date();
          })
        ),
    }),
    {
      name: 'date-storage',
      storage: createJSONStorage(() => localStorage, {
        reviver: (_key, value) => {
          if (typeof value === 'string' && !isNaN(Date.parse(value))) {
            return new Date(value);
          }
          return value;
        },
      }),
    } as PersistOptions<DateStore>
  )
);

export type MeteoDataSourceType =
  | 'davisDaily'
  | 'lipnoDaily'
  | 'davisTextSummary'
  | 'oldStationDaily';

type DateType = {
  [key in MeteoDataSourceType]: Date;
};

type DateStore = {
  dates: DateType;
  updateDate: (key: keyof DateType, newDate: Date) => void;
  resetDate: (key: keyof DateType) => void;
};
