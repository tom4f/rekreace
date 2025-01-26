import {
  faCommentMedical,
  faCommentSlash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PhotoType } from 'components/PhotoGallery';
import { useState } from 'react';

interface eightPhotoTypes {
  bigPhoto: PhotoType;
}

export const InfoText = ({ bigPhoto }: eightPhotoTypes) => {
  const [showInfo, setShowInfo] = useState(true);

  const bigImgInfo = bigPhoto && (
    <>
      <b>{bigPhoto.id}</b> {bigPhoto.insertDate.slice(0, 10)}{' '}
      <b>{bigPhoto.header}</b> Autor: {bigPhoto.autor}
      <br />
      {bigPhoto.text}
    </>
  );

  return (
    <>
      {showInfo ? <div className='photoInfo'>{bigImgInfo}</div> : null}
      {showInfo ? (
        <FontAwesomeIcon
          className='textOff'
          icon={faCommentSlash}
          onClick={() => setShowInfo(false)}
        />
      ) : (
        <FontAwesomeIcon
          className='textOn'
          icon={faCommentMedical}
          onClick={() => setShowInfo(true)}
        />
      )}
    </>
  );
};
