import { Url } from 'api/paths';
import { useSaveImage } from 'features/webcam';
import { createSvgFallback } from 'src/utils';
import { useWebCamStore } from 'store';

export const ShowWebCam = () => {
  const { day, hour, minute, state } = useWebCamStore().webCam;
  const { data } = useSaveImage();

  const normalize = (value: number) => value.toString().padStart(2, '0');
  const imgDateText = `${normalize(day)}-${normalize(hour)}-${normalize(
    minute
  )}`;
  const imageTimestamp = data?.timestamp || Date.now();

  const fallbackSvg = createSvgFallback({
    fallbackText: `image ${imgDateText} not found`,
    width: 724,
    height: 407,
  });

  return (
    <a href={`${Url.WEBCAM}/archive/ip_kamera_full_hd_${imgDateText}.jpg`}>
      <img
        src={
          state === 'live'
            ? `${Url.WEBCAM}/archive/ip_kamera.jpg?id=${imageTimestamp}`
            : `${Url.WEBCAM}/archive/ip_kamera_${imgDateText}.jpg`
        }
        alt='WebCam'
        loading='lazy'
        onError={(e) => (e.currentTarget.src = fallbackSvg)}
      />
    </a>
  );
};
