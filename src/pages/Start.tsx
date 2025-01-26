import { PhotoGallery } from './PhotoGallery';
import { Forum } from 'components/Start/Forum/Forum';
import { MeteoBarBig } from 'components/Start/MeteoBarBig/MeteoBarBig';
import { WebCam } from 'components/Start/WebCam/WebCam';

export const Start = () => {
  return (
    <>
      <WebCam />
      <MeteoBarBig />
      <Forum />
      <PhotoGallery />
    </>
  );
};
