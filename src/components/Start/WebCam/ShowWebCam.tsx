import { Url } from 'api/paths';
import { useSaveImage } from 'features/webcam';
import { useMemo } from 'react';
import { createSvgFallback } from 'src/utils';
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
    <a href={`${Url.WEBCAM}/archive/ip_kamera_full_hd_${imgDateText}.jpg`}>
      {state === 'live' ? (
        <img
          src={`${Url.WEBCAM}/archive/ip_kamera.jpg?id=${imageTimestamp}`}
          alt='WebCam'
          loading='lazy'
        />
      ) : (
        <img
          src={`${Url.WEBCAM}/archive/ip_kamera_${imgDateText}.jpg`}
          alt='WebCam'
          loading='lazy'
          onError={(e) =>
            (e.currentTarget.src = createSvgFallback({
              fallbackText: `image ${imgDateText} not found`,
              width: 724,
              height: 407,
            }))
          }
        />
      )}
    </a>
  );
};
