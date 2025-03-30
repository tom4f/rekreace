import { Formular } from 'components/PhotoGallery';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuthStore, useModalStore } from 'src/store';

import {
  BigImgWrapper,
  CategoryList,
  ChangeImage,
  InfoText,
  Presentation,
} from './';

export const BigImage = () => {
  const { pathname } = useLocation();
  const isLogged = useAuthStore((state) => state.isLogged);
  const openModal = useModalStore((state) => state.openModal);
  const closeModal = useModalStore((state) => state.closeModal);

  useEffect(() => {
    if (pathname === '/fotogalerie/edit' && isLogged) {
      openModal({
        content: <Formular />,
        customStyle: {
          maxWidth: '600px',
          height: 'auto',
          maxHeight: 'auto',
          background: 'transparent',
        },
        isCloseButton: false,
      });
    }

    return () => closeModal();
  }, [pathname, isLogged, openModal, closeModal]);

  return (
    <BigImgWrapper>
      <InfoText />
      <ChangeImage />
      <Presentation />
      <CategoryList />
    </BigImgWrapper>
  );
};
