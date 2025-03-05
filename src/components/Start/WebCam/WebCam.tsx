import './css/webcam-archive.css';

import { MeteoBarSmall, RangeSlider, ShowWebCam, SlideShow } from './';

export const WebCam = () => {
  return (
    <>
      <div className='header'>
        <b>
          <a href='https://www.ipcamlive.com/62d9a9a2cb1ff'>
            Live kamera {'-->'} klikněte zde!
          </a>
        </b>
      </div>
      <div className='webcam-container'>
        <SlideShow />
        <RangeSlider />
        <ShowWebCam />
        <MeteoBarSmall />
      </div>
    </>
  );
};
