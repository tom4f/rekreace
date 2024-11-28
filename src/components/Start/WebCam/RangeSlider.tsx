import { SliderWithText } from "./css/slider-dynamic-css";
import "./css/slider.css";

import { WebCamState } from "./WebCam";

export const RangeSlider = ({
  state: { day, hour, minute },
  reactChange,
}: {
  state: WebCamState;
  reactChange: (value: any) => void;
}) => {
  const ranger = (e: any) => {
    const { name: sliderName, value: sliderValue } = e;
    if (sliderName === "day") {
      reactChange((old: {}) => ({
        ...old,
        day: +sliderValue,
        isLiveImg: false,
      }));
    }

    if (sliderName === "time") {
      const hourSelected = Math.floor(sliderValue / 60);
      const minuteSelected = sliderValue - hourSelected * 60;
      reactChange((old: {}) => ({
        ...old,
        hour: hourSelected,
        minute: minuteSelected,
        isLiveImg: false,
      }));
    }
  };

  const now = new Date();
  const monthToday = now.getMonth() + 1;

  const dateFromSlider = new Date();
  dateFromSlider.setDate(+day);
  dateFromSlider.setHours(+hour, +minute);

  const sliderDate =
    now > dateFromSlider
      ? `${day}.${monthToday}.`
      : `${day}.${monthToday - 1}.`;
  return (
    <div className="sliders-container">
      <div className="slide-container">
        <SliderWithText
          time={sliderDate}
          className="slider"
          type="range"
          name="day"
          min="1"
          max="31"
          onChange={(e) => ranger(e.target)}
          value={day}
        />
      </div>
      <div className="slide-container">
        <SliderWithText
          time={hour + ":" + minute}
          className="slider"
          type="range"
          name="time"
          min={7 * 60 + 12}
          max={22 * 60 + 57}
          step="15"
          onChange={(e) => ranger(e.target)}
          value={hour * 60 + minute}
        />
      </div>
    </div>
  );
};
