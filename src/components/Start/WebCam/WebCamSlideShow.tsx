import './css/WebCamSlideShow.css';

import {
  faPlayCircle,
  faStopCircle,
  faVideo,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef } from 'react';
import { useWebCamStore } from 'store';

export const WebCamSlideShow = () => {
  const { updateWebCam, webCam } = useWebCamStore();

  let { day, hour, minute } = webCam;
  const { state } = webCam;

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startShow = () => {
    const presentation = () => {
      const add15minutes = () => {
        if (minute < 45) return (minute += 15);
        minute = 12;
        if (hour < 22) return hour++;
        hour = 7;
        if (day < 31) return day++;
        day = 1;
      };
      add15minutes();

      updateWebCam({
        day,
        hour,
        minute,
        state: 'slideShowStarted',
      });
    };

    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => presentation(), 2000);
    }
  };

  const stopShow = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    updateWebCam({ state: 'slideShowStopped' });
  };

  return (
    <div>
      {state === 'slideShowStopped' && (
        <FontAwesomeIcon
          className='slide-reset'
          size='3x'
          icon={faVideo}
          onClick={() => updateWebCam({ state: 'live' })}
        />
      )}

      {state === 'slideShowStopped' || state === 'live' ? (
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
