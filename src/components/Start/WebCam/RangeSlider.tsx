import './css/slider.css';

import { SliderWithText } from 'components/Start/WebCam/css/SliderWithText';
import { useWebCamStore } from 'store';

import { sliderToDavisMonth } from './utils';

export const RangeSlider = () => {
  const {
    updateWebCam,
    webCam: { day, hour, minute },
  } = useWebCamStore();

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'day') {
      updateWebCam({
        month: sliderToDavisMonth(+value, hour, minute),
        day: +value,
        state: 'stopped',
      });
    } else if (name === 'time') {
      const totalMinutes = parseInt(value);
      const selectedHour = Math.floor(totalMinutes / 60);
      const selectedMinute = totalMinutes % 60;
      updateWebCam({
        month: sliderToDavisMonth(day, selectedHour, selectedMinute),
        hour: selectedHour,
        minute: selectedMinute,
        state: 'stopped',
      });
    }
  };

  const currentMonth = sliderToDavisMonth(day, hour, minute);

  return (
    <div className='sliders-container'>
      <div className='slide-container'>
        <SliderWithText
          $time={`${day}.${currentMonth}.`}
          className='slider'
          type='range'
          name='day'
          min='1'
          max='31'
          onChange={handleSliderChange}
          value={day}
        />
      </div>
      <div className='slide-container'>
        <SliderWithText
          $time={`${hour}:${minute}`}
          className='slider'
          type='range'
          name='time'
          min={7 * 60 + 12}
          max={22 * 60 + 57}
          step='15'
          onChange={handleSliderChange}
          value={hour * 60 + minute}
        />
      </div>
    </div>
  );
};
