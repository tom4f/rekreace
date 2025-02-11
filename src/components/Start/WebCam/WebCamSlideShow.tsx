import './css/WebCamSlideShow.css';

import { faPlayCircle, faStopCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

import { WebCamState } from './WebCam';

export const WebCamSlideShow = ({
  state: { day, hour, minute, timer },
  reactChange,
}: {
  state: WebCamState;
  reactChange: React.Dispatch<React.SetStateAction<WebCamState>>;
}) => {
  const [startButton, setStartButton] = useState(true);

  const startShow = () => {
    const Presentation = () => {
      const add15minutes = () => {
        if (minute < 45) return (minute += 15);
        minute = 12;
        if (hour < 22) return hour++;
        hour = 7;
        if (day < 31) return day++;
        day = 1;
      };
      add15minutes();

      reactChange((old: WebCamState) => ({
        ...old,
        day,
        hour,
        minute,
      }));
    };

    timer = setInterval(Presentation, 2000);
    reactChange((old: WebCamState) => ({
      ...old,
      timer: timer,
      isLiveImg: false,
    }));

    setStartButton((prev) => !prev);
  };

  const stopShow = () => {
    clearInterval(timer);
    setStartButton((prev) => !prev);
    reactChange((old: WebCamState) => ({
      ...old,
      isLiveImg: true,
    }));
  };

  return (
    <div>
      {startButton ? (
        <FontAwesomeIcon
          className='slide-show'
          size='3x'
          icon={faPlayCircle}
          onClick={() => startShow()}
        />
      ) : (
        <FontAwesomeIcon
          className='slide-show'
          size='3x'
          icon={faStopCircle}
          onClick={() => stopShow()}
        />
      )}
    </div>
  );
};
