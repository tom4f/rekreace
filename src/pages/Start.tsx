import { PhotoGallery } from './PhotoGallery';
import { Forum } from 'src/components/Start/Forum/Forum';
import { MeteoBarBig } from 'src/components/Start/MeteoBarBig/MeteoBarBig';
import { WebCam } from 'src/components/Start/WebCam/WebCam';

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
