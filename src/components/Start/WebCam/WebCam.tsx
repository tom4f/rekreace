import styled from '@emotion/styled';
import { Header } from 'components/Atoms';

import { MeteoBarSmall, RangeSlider, ShowWebCam, SlideShow } from './';

export const WebCam = () => {
  return (
    <>
      <Header>
        <a href='https://www.ipcamlive.com/62d9a9a2cb1ff'>
          Live kamera {'-->'} klikněte zde!
        </a>
      </Header>
      <WebCamWrapper>
        <SlideShow />
        <RangeSlider />
        <ShowWebCam />
        <MeteoBarSmall />
      </WebCamWrapper>
    </>
  );
};

const WebCamWrapper = styled.div`
  position: relative;
  max-width: 724px;
  margin: auto;
`;
