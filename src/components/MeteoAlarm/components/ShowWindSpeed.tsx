import { AlarmResponse } from 'features/meteoalarm';
import { Dispatch, SetStateAction } from 'react';

interface ShowWindSpeedTypes {
  items: AlarmResponse;
  setItems: Dispatch<SetStateAction<AlarmResponse>>;
}

const optionList = Array.from({ length: 14 }, (_, index) => {
  const value = index + 4;
  return (
    <option key={value} value={value}>
      {value < 17 ? `> ${value} m/s` : '- vypnuto -'}
    </option>
  );
});

export const ShowWindSpeed = ({ items, setItems }: ShowWindSpeedTypes) => {
  return (
    <section className='input-section'>
      <label htmlFor='wind-speed-select'>Limit větru</label>
      <select
        id='wind-speed-select'
        value={items.sms}
        onChange={(event) => setItems({ ...items, sms: +event.target.value })}
      >
        {optionList}
      </select>
    </section>
  );
};
