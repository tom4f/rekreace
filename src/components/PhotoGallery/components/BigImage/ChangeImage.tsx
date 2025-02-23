import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faArrowLeft,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ImgPositionType, SetStateType } from 'components/PhotoGallery';

interface eightPhotoTypes {
  imgPosition: ImgPositionType;
  setImgPosition: SetStateType;
  length: number;
}

export const ChangeImage = ({
  setImgPosition,
  imgPosition,
  length,
}: eightPhotoTypes) => {
  const { current, smallImgsSize } = imgPosition;

  const changePhoto = (newCurrent: number) => {
    if (newCurrent >= 0 && newCurrent < length) {
      setImgPosition((old) => {
        const newSmallImgStart = newCurrent - (newCurrent % smallImgsSize);
        return {
          ...old,
          smallImgStart: newSmallImgStart,
          current: newCurrent,
        };
      });
    }
  };

  return (
    <>
      <FontAwesomeIcon
        className='prevPhoto'
        icon={faArrowLeft}
        onClick={() => changePhoto(current - 1)}
      />
      <FontAwesomeIcon
        className='nextPhoto'
        icon={faArrowRight}
        onClick={() => changePhoto(current + 1)}
      />
      <FontAwesomeIcon
        className='prevPhotoBig'
        icon={faArrowLeft}
        onClick={() => changePhoto(current - 1)}
      />
      <FontAwesomeIcon
        className='nextPhotoBig'
        icon={faArrowRight}
        onClick={() => changePhoto(current + 1)}
      />
      <FontAwesomeIcon
        className='prev8'
        icon={faAngleDoubleLeft}
        onClick={() => changePhoto(current - 8)}
      />
      <FontAwesomeIcon
        className='next8'
        icon={faAngleDoubleRight}
        onClick={() => changePhoto(current + 8)}
      />
    </>
  );
};
