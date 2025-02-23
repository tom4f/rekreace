import './css/webcam-archive.css';

import { useState } from 'react';

import { MeteoBarSmall, RangeSlider, ShowWebCam, WebCamSlideShow } from './';

export type WebCamState = {
  day: number;
  hour: number;
  minute: number;
  slideId: number;
  timer: NodeJS.Timeout | undefined;
  liveImgTimer: number;
  isLiveImg: boolean;
  webAuthor: string;
};

export const WebCam = () => {
  const minutesNormailzed = () => {
    const minutesNow = 60 * new Date().getHours() + new Date().getMinutes();
    if (minutesNow > 1377) {
      return 1377;
    } else if (minutesNow < 432) {
      return 432;
    } else {
      return minutesNow - 3 - (minutesNow % 15);
    }
  };
  const [state, reactChange] = useState<WebCamState>({
    day: new Date().getDate(),
    hour: Math.floor(minutesNormailzed() / 60),
    minute: minutesNormailzed() % 60,
    slideId: 0,
    timer: undefined,
    liveImgTimer: 0,
    isLiveImg: true,
    webAuthor: 'empty',
  });

  return (
    <>
      <div className='header'>
        <b>
          <a href='https://www.ipcamlive.com/62d9a9a2cb1ff'>
            Live kamera --&gt; klikněte zde!
          </a>
        </b>
      </div>
      <div className='webcam-container'>
        <WebCamSlideShow state={state} reactChange={reactChange} />
        <RangeSlider state={state} reactChange={reactChange} />
        <ShowWebCam state={state} />
        <MeteoBarSmall />
      </div>
    </>
  );
};
