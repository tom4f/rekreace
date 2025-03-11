import './BigImages.css';

import { Modal } from 'components/Modal';
import { BigImageType, EditImage } from 'components/PhotoGallery';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { BigImg } from './BigImg.styled';
import { CategoryList } from './CategoryList';
import { ChangeImage } from './ChangeImage';
import { InfoText } from './InfoText';
import { Presentation } from './Presentation';

export const BigImage = ({
  bigPhoto,
  imgPosition,
  setImgPosition,
  length,
}: BigImageType) => {
  const [fadeIn, setFadeIn] = useState(true);
  const [editPhoto, setEditPhoto] = useState(bigPhoto);
  const { pathname } = useLocation();
  const mainRef = useRef<HTMLElement>(null);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setFadeIn(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => setFadeIn(false), 500);

    if (pathname === '/fotogalerie/edit') {
      setEditPhoto(bigPhoto);
    }

    const controller = new AbortController();
    const signal = controller.signal;

    const imgSizeHandlerWithAbort = () => {
      if (!mainRef.current) return;

      const backgroundImage = window
        .getComputedStyle(mainRef.current, '::after')
        .getPropertyValue('background-image');
      if (!backgroundImage.includes('url')) return;

      const url = backgroundImage.slice(5, -2);
      const img = new Image();
      img.src = url;

      img
        .decode()
        .then(() => {
          if (signal.aborted || !mainRef.current) return;
          const mainWidth = mainRef.current.offsetWidth;
          const { width: imgWidth, height: imgHeight } = img;
          mainRef.current.style.height = `${
            (imgHeight * mainWidth) / imgWidth
          }px`;
          mainRef.current.style.maxHeight = 'calc(100vh - 105px)';
        })
        .catch(() => img.onload?.({} as Event));
    };

    imgSizeHandlerWithAbort();

    const handleResize = () => imgSizeHandlerWithAbort();
    window.addEventListener('resize', handleResize);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      window.removeEventListener('resize', handleResize);
      controller.abort();
    };
  }, [bigPhoto, pathname]);

  return (
    <BigImg
      ref={mainRef}
      className={`main-img`}
      $bigPhoto={bigPhoto}
      $editPhoto={editPhoto}
      $fadeIn={fadeIn}
      $imgPosition={imgPosition}
    >
      <InfoText bigPhoto={bigPhoto} />
      <ChangeImage
        setImgPosition={setImgPosition}
        length={length}
        imgPosition={imgPosition}
      />
      <Presentation setImgPosition={setImgPosition} length={length} />
      <CategoryList setImgPosition={setImgPosition} />
      {pathname === '/fotogalerie/edit' && (
        <Modal
          customStyle={{
            position: 'fixed',
            backgroundColor: 'transparent',
            top: '200px',
            left: 'unset',
            transform: 'none',
          }}
        >
          <EditImage
            setImgPosition={setImgPosition}
            editPhoto={editPhoto}
            setEditPhoto={setEditPhoto}
          />
        </Modal>
      )}
    </BigImg>
  );
};
