import './css/slider.css';

import { SliderWithText } from './css/SliderWithText';
import { WebCamState } from './WebCam';

type RangeSliderType = {
  state: WebCamState;
  reactChange: React.Dispatch<React.SetStateAction<WebCamState>>;
};

export const RangeSlider = ({
  state: { day, hour, minute },
  reactChange,
}: RangeSliderType) => {
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'day') {
      reactChange((prevState) => ({
        ...prevState,
        day: +value,
        isLiveImg: false,
      }));
    } else if (name === 'time') {
      const totalMinutes = parseInt(value);
      const selectedHour = Math.floor(totalMinutes / 60);
      const selectedMinute = totalMinutes % 60;
      reactChange((prevState) => ({
        ...prevState,
        hour: selectedHour,
        minute: selectedMinute,
        isLiveImg: false,
      }));
    }
  };

  const now = new Date();
  const currentMonth = now.getMonth() + 1;

  const sliderDate = new Date();
  sliderDate.setDate(day);
  sliderDate.setHours(hour, minute);

  const formattedDate =
    now > sliderDate
      ? `${day}.${currentMonth}.`
      : `${day}.${currentMonth !== 1 ? currentMonth - 1 : 12}.`;

  return (
    <div className='sliders-container'>
      <div className='slide-container'>
        <SliderWithText
          $time={formattedDate}
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
