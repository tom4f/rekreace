import { useEffect, useRef } from 'react';
import { useWebCamStore } from 'store';

import { ResetShow, StartShow, StopShow } from './';
import { addStep, sliderToDavisMonth } from './utils';

export type IntervalType = 'minutes' | 'days';

export const SlideShow = () => {
  const { updateWebCam, resetWebCam, webCam } = useWebCamStore();
  const { state } = webCam;

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        updateWebCam({ state: 'stopped' });
      }
    };
  }, [updateWebCam]);

  const startShow = (interval: IntervalType) => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    const moveInterval = () => {
      useWebCamStore.setState((prev) => {
        const { day, hour, minute } = prev.webCam;
        const updatedTime = addStep(day, hour, minute, interval);

        return {
          webCam: {
            ...prev.webCam,
            month: sliderToDavisMonth(
              updatedTime.day,
              updatedTime.hour,
              updatedTime.minute
            ),
            ...updatedTime,
            state: interval === 'days' ? 'daysSlideShow' : 'minutesSlideShow',
          },
        };
      });
    };

    moveInterval();
    intervalRef.current = setInterval(moveInterval, 2000);
  };

  const stopShow = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    updateWebCam({ state: 'stopped' });
  };

  return (
    <>
      {state === 'stopped' && <ResetShow onClick={resetWebCam} />}
      {state === 'minutesSlideShow' || state === 'daysSlideShow' ? (
        <StopShow webCamState={state} onClick={stopShow} />
      ) : (
        <>
          <StartShow
            webCamState='daysSlideShow'
            onClick={() => startShow('days')}
          />
          <StartShow
            webCamState='minutesSlideShow'
            onClick={() => startShow('minutes')}
          />
        </>
      )}
    </>
  );
};
