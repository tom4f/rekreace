import './css/WebCamSlideShow.css';

import {
  faPlayCircle,
  faStopCircle,
  faVideo,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef } from 'react';
import { useWebCamStore, WebCamState } from 'store';

import { addStep, sliderToDavisMonth } from './utils';

export const WebCamSlideShow = () => {
  const { updateWebCam, resetWebCam, webCam } = useWebCamStore();
  const { state } = webCam;

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const startShow = (interval: IntervalType) => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      const { day, hour, minute } = useWebCamStore.getState().webCam;
      const updatedTime = addStep(day, hour, minute, interval);

      updateWebCam({
        month: sliderToDavisMonth(
          updatedTime.day,
          updatedTime.hour,
          updatedTime.minute
        ),
        ...updatedTime,
        state: interval === 'days' ? 'daysSlideShow' : 'minutesSlideShow',
      });
    }, 2000);
  };

  const stopShow = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    updateWebCam({ state: 'stopped' });
  };

  return (
    <div className='slide-show-container'>
      {state === 'stopped' && (
        <FontAwesomeIcon
          className='slide-reset'
          size='3x'
          icon={faVideo}
          onClick={resetWebCam}
        />
      )}

      {state === 'minutesSlideShow' || state === 'daysSlideShow' ? (
        <StopShow webCamState={state} onClick={stopShow} />
      ) : (
        <>
          <StartShow interval='days' onClick={startShow} />
          <StartShow interval='minutes' onClick={startShow} />
        </>
      )}
    </div>
  );
};

export type IntervalType = 'minutes' | 'days';

const StartShow = ({
  onClick,
  interval,
}: {
  onClick: (interval: IntervalType) => void;
  interval: IntervalType;
}) => (
  <FontAwesomeIcon
    className={`slide-show-${interval}`}
    size='2x'
    icon={faPlayCircle}
    onClick={() => onClick(interval)}
  />
);

const StopShow = ({
  onClick,
  webCamState,
}: {
  onClick: () => void;
  webCamState: WebCamState;
}) => (
  <FontAwesomeIcon
    className={
      webCamState === 'daysSlideShow' ? 'slide-show-days' : 'slide-show-minutes'
    }
    size='2x'
    icon={faStopCircle}
    onClick={onClick}
  />
);
