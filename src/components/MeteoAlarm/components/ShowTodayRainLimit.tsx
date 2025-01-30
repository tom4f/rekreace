import { AlarmResponse } from 'features/meteoalarm';
import { Dispatch, SetStateAction } from 'react';

interface ShowTodayRainLimitTypes {
  items: AlarmResponse;
  setItems: Dispatch<SetStateAction<AlarmResponse>>;
}

const optionList = Array.from({ length: 14 }, (_, index) => {
  const value = index;
  return (
    <option key={value} value={value}>
      {value > 0 ? `> ${value} mm` : '- vypnuto -  '}
    </option>
  );
});

export const ShowTodayRainLimit = ({
  items,
  setItems,
}: ShowTodayRainLimitTypes) => {
  return (
    <section className='input-section'>
      <label htmlFor='rain-limit-select'>Limit deště (dnes)</label>
      <select
        id='rain-limit-select'
        value={items.todayRainLimit}
        onChange={(event) =>
          setItems({ ...items, todayRainLimit: +event.target.value })
        }
      >
        {optionList}
      </select>
    </section>
  );
};
