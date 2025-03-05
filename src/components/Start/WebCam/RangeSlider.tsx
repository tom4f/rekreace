import styled from '@emotion/styled';
import { useWebCamStore } from 'store';

import { SliderWithText } from './';
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
    <SlidersWrapper>
      <SliderWithText
        $time={`${day}.${currentMonth}.`}
        type='range'
        name='day'
        min='1'
        max='31'
        onChange={handleSliderChange}
        value={day}
      />

      <SliderWithText
        $time={`${hour}:${minute}`}
        type='range'
        name='time'
        min={7 * 60 + 12}
        max={22 * 60 + 57}
        step='15'
        onChange={handleSliderChange}
        value={hour * 60 + minute}
      />
    </SlidersWrapper>
  );
};

const SlidersWrapper = styled.div`
  margin-left: 60px;
  position: absolute;
  width: calc(100% - 60px);
  bottom: 0px;
  display: flex;
  flex-direction: column;
`;
