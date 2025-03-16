import {
  faCommentMedical,
  faCommentSlash,
} from '@fortawesome/free-solid-svg-icons';
import { useCallback, useState } from 'react';
import { OnePhotoResponse, usePhoto } from 'src/features/photo';
import styled from 'styled-components';

import { CommonIconWrapper } from './Presentation';

export const InfoText = () => {
  const [showInfo, setShowInfo] = useState(true);
  const { bigPhoto } = usePhoto();

  const toggleShowInfo = useCallback(() => setShowInfo((prev) => !prev), []);

  return (
    <>
      {showInfo && (
        <BigImgInfo>
          {bigPhoto ? (
            <BigImgDetails bigPhoto={bigPhoto} />
          ) : (
            <p>No image information available.</p>
          )}
        </BigImgInfo>
      )}
      <CommonIconWrapper
        style={{ right: '25%' }}
        icon={showInfo ? faCommentSlash : faCommentMedical}
        onClick={toggleShowInfo}
        aria-label={showInfo ? 'Hide info' : 'Show info'}
      />
    </>
  );
};

const BigImgDetails = ({ bigPhoto }: { bigPhoto: OnePhotoResponse }) => (
  <>
    <p>
      {bigPhoto.id} <b>{bigPhoto.header}</b>
    </p>
    <p>{bigPhoto.text}</p>
    <p>
      {bigPhoto.insertDate?.slice(0, 10)} / {bigPhoto.autor}
    </p>
  </>
);

const BigImgInfo = styled.div`
  position: absolute;
  padding: 10px;
  bottom: 0px;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 15px;
  background-color: rgba(0, 0, 0, 0.3);
  text-align: center;
  z-index: 2;

  &:hover {
    background-color: transparent;
    color: transparent;
  }
`;
