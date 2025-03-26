import { Modal } from 'components/Modal';
import { Formular } from 'components/PhotoGallery';
import { useLocation } from 'react-router-dom';
import { useAuthStore } from 'src/store';

import {
  BigImgWrapper,
  CategoryList,
  ChangeImage,
  InfoText,
  Presentation,
} from './';

export const BigImage = () => {
  const { pathname } = useLocation();
  const { isLogged } = useAuthStore();

  return (
    <BigImgWrapper>
      <InfoText />
      <ChangeImage />
      <Presentation />
      <CategoryList />
      {pathname === '/fotogalerie/edit' && isLogged && (
        <Modal
          customStyle={{
            position: 'fixed',
            backgroundColor: 'transparent',
            top: '200px',
            left: 'unset',
            transform: 'none',
          }}
        >
          <Formular />
        </Modal>
      )}
    </BigImgWrapper>
  );
};
