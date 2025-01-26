import { Forum, MeteoBarBig, WebCam } from 'components/Start';

import { PhotoGallery } from './PhotoGallery';

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
