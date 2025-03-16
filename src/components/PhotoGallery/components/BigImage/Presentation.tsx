import { faPlayCircle, faStopCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback, useEffect, useRef, useState } from 'react';
import { usePhoto } from 'src/features/photo';
import { usePhotoGalleryStore } from 'src/store';
import styled from 'styled-components';

export const Presentation = () => {
  const { filteredPhoto } = usePhoto();
  const { setImgPosition } = usePhotoGalleryStore();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [presentation, setPresentation] = useState(false);

  const stopPresentation = useCallback(() => {
    setPresentation(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startPresentation = useCallback(() => {
    if (filteredPhoto.length === 0) return;

    stopPresentation();
    timerRef.current = setInterval(() => {
      setImgPosition({
        current: Math.floor(Math.random() * filteredPhoto.length),
      });
    }, 5000);
    setPresentation(true);
  }, [filteredPhoto.length, setImgPosition, stopPresentation]);

  useEffect(() => {
    return () => stopPresentation();
  }, [stopPresentation]);

  return (
    <CommonIconWrapper
      style={{ left: '25%' }}
      icon={presentation ? faStopCircle : faPlayCircle}
      onClick={presentation ? stopPresentation : startPresentation}
    />
  );
};

export const CommonIconWrapper = styled(FontAwesomeIcon)`
  padding: 10px;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.2);
  outline: none;
  color: rgba(255, 255, 255, 0.7);
  font-size: 3vw;
  top: 1%;
  z-index: 2;

  &:hover {
    background: white;
    color: black;
    cursor: pointer;
  }

  @media (min-width: 1000px) {
    font-size: 30px;
  }
`;
