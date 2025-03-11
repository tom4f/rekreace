import { faPlayCircle, faStopCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SetStateType } from 'components/PhotoGallery';
import { useRef, useState } from 'react';

interface eightPhotoTypes {
  setImgPosition: SetStateType;
  length: number;
}

export const Presentation = ({ setImgPosition, length }: eightPhotoTypes) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [presentation, setPresentation] = useState(false);

  const startPresentation = () => {
    timerRef.current = setInterval(() => {
      const current = Math.floor(Math.random() * length);
      setImgPosition((old) => ({ ...old, current }));
    }, 5000);
    setPresentation(true);
  };

  const stopPresentation = () => {
    setPresentation(false);
    if (timerRef.current) clearInterval(timerRef.current);
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
