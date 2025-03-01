import { Url } from 'api/paths';
import { useEffect, useState } from 'react';
import { useWebCamStore } from 'store';

export const ShowWebCam = () => {
  const {
    webCam: { day, hour, minute, state },
  } = useWebCamStore();

  const [liveImgSrc, setLiveImgSrc] = useState(
    `${Url.KAMERA}/archive/ip_kamera.jpg`
  );
  const [getCamera, setGetCamera] = useState(<></>);

  const updateImage = () => {
    const updateImgLogic = () => {
      const randomId = new Date().getTime();
      const src = `${Url.KAMERA}/archive/ip_kamera.jpg?id=${randomId}`;
      setLiveImgSrc(src);
      const iFrame = `<iframe src='${Url.GET_IP_KAMERA}?id=${randomId}' />`;
      const iFrameDiv = (
        <div
          style={{ display: 'none' }}
          dangerouslySetInnerHTML={{ __html: `${iFrame}` }}
        />
      );
      setGetCamera(iFrameDiv);
    };

    const interval = setInterval(() => updateImgLogic(), 10000);
    return () => clearInterval(interval);
  };

  const imgDateText =
    `${('0' + day).slice(-2)}-` +
    `${('0' + hour).slice(-2)}-` +
    `${('0' + minute).slice(-2)}`;

  useEffect(updateImage, []);

  return (
    <>
      <div className='archive_cam'>
        <a href={`${Url.KAMERA}/archive/ip_kamera_full_hd_${imgDateText}.jpg`}>
          {state === 'live' ? (
            <img src={liveImgSrc} alt='WebCam' />
          ) : (
            /*                         <img
                            src={`${Url.KAMERA}/archive/lipnonet_full_hd_00001.jpg`}
                            alt="WebCam"
                        /> */
            <img
              src={`${Url.KAMERA}/archive/ip_kamera_${imgDateText}.jpg`}
              alt='WebCam'
            />
          )}
        </a>
      </div>
      {getCamera}
    </>
  );
};
