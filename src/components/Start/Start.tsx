import { PhotoGallery } from "../PhotoGallery/PhotoGallery";
import { Forum } from "./Forum/Forum";
import { MeteoBarBig } from "./MeteoBarBig/MeteoBarBig";
import { WebCam } from "./WebCam/WebCam";

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
