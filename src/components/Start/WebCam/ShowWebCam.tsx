import { Url } from 'api/paths';
import { useSaveImage } from 'features/webcam';
import { useMemo } from 'react';
import { useWebCamStore } from 'store';

export const ShowWebCam = () => {
  const {
    webCam: { day, hour, minute, state },
  } = useWebCamStore();

  const { data } = useSaveImage();

  const normalize = (value: number) => value.toString().padStart(2, '0');

  const imgDateText = useMemo(() => {
    return `${normalize(day)}-${normalize(hour)}-${normalize(minute)}`;
  }, [day, hour, minute]);

  const imageTimestamp = data?.timestamp || Date.now();

  return (
    <div className='archive_cam'>
      <a href={`${Url.KAMERA}/archive/ip_kamera_full_hd_${imgDateText}.jpg`}>
        {state === 'live' ? (
          <img
            src={`${Url.KAMERA}/archive/ip_kamera.jpg?id=${imageTimestamp}`}
            alt='WebCam'
            loading='lazy'
          />
        ) : (
          <img
            src={`${Url.KAMERA}/archive/ip_kamera_${imgDateText}.jpg`}
            alt='WebCam'
            loading='lazy'
          />
        )}
      </a>
    </div>
  );
};
