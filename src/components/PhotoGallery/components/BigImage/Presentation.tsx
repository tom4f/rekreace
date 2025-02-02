import { faPlayCircle, faStopCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SetStateType } from 'components/PhotoGallery';
import { useState } from 'react';

interface eightPhotoTypes {
  setImgPosition: SetStateType;
  length: number;
}

export const Presentation = ({ setImgPosition, length }: eightPhotoTypes) => {
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [presentation, setPresentation] = useState(false);

  const startPresentation = () => {
    const timer: ReturnType<typeof setInterval> = setInterval(() => {
      const current = Math.floor(Math.random() * length);
      setImgPosition((old) => ({ ...old, current }));
    }, 5000);
    setTimer(timer);
    setPresentation(true);
  };

  const stopPresentation = () => {
    setPresentation(false);
    if (timer) clearInterval(timer);
  };
  return (
    <>
      {presentation ? (
        <FontAwesomeIcon
          className='stop'
          icon={faStopCircle}
          onClick={() => stopPresentation()}
        />
      ) : (
        <FontAwesomeIcon
          className='play'
          icon={faPlayCircle}
          onClick={() => startPresentation()}
        />
      )}
    </>
  );
};
