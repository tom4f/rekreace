import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faArrowLeft,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { usePhoto } from 'src/features/photo';
import { usePhotoGalleryStore } from 'src/store';
import styled from 'styled-components';

import { CommonIconWrapper } from './Presentation';

const STEP_SMALL = 1;
const STEP_LARGE = 8;

export const ChangeImage = () => {
  const { filteredPhoto } = usePhoto();
  const { imgPosition, setImgPosition } = usePhotoGalleryStore();
  const { current, smallImgsSize } = imgPosition;

  const changePhoto = (newCurrent: number) => {
    if (newCurrent >= 0 && newCurrent < filteredPhoto.length) {
      setImgPosition({
        smallImgStart: newCurrent - (newCurrent % smallImgsSize),
        current: newCurrent,
      });
    }
  };

  return (
    <>
      <CommonIconWrapper
        style={{ left: '1%' }}
        icon={faArrowLeft}
        onClick={() => changePhoto(current - STEP_SMALL)}
      />
      <CommonIconWrapper
        style={{ right: '1%' }}
        icon={faArrowRight}
        onClick={() => changePhoto(current + STEP_SMALL)}
      />
      <BigIconWrapper
        style={{ left: '1%' }}
        icon={faArrowLeft}
        onClick={() => changePhoto(current - STEP_SMALL)}
      />
      <BigIconWrapper
        style={{ right: '1%' }}
        icon={faArrowRight}
        onClick={() => changePhoto(current + STEP_SMALL)}
      />
      <CommonIconWrapper
        style={{ left: '13%' }}
        icon={faAngleDoubleLeft}
        onClick={() => changePhoto(current - STEP_LARGE)}
      />
      <CommonIconWrapper
        style={{ right: '13%' }}
        icon={faAngleDoubleRight}
        onClick={() => changePhoto(current + STEP_LARGE)}
      />
    </>
  );
};

export const BigIconWrapper = styled(FontAwesomeIcon)`
  padding: 10px;
  position: absolute;
  background-color: transparent;
  outline: none;
  color: transparent;
  font-size: 3vw;
  top: 20%;
  width: 30%;
  height: 40%;
  z-index: 2;

  &:hover {
    background-color: transparent;
    color: white;
    cursor: pointer;
  }
`;
