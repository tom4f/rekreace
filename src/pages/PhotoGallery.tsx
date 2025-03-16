import { fotoGalleryOwner } from 'api/paths';
import { Header } from 'components/Atoms';
import { BigImage, SmallImages } from 'components/PhotoGallery';
import { useGetPhoto } from 'features/photo';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { usePhotoGalleryStore } from 'src/store';

export const PhotoGallery = ({ category }: { category?: number }) => {
  const { data: allPhoto } = useGetPhoto({ fotoGalleryOwner });

  const setImgPosition = usePhotoGalleryStore.getState().setImgPosition;

  const { pathname } = useLocation();

  useEffect(() => {
    setImgPosition({ category: category ?? 99999 });
  }, [category, setImgPosition]);

  if (!Array.isArray(allPhoto)) {
    return null;
  }

  return (
    <div>
      <Header>
        {pathname === '/' || pathname === '/kaliste' ? (
          <Link to='/fotogalerie'>Fotogalerie</Link>
        ) : (
          <Link to='/'>Start</Link>
        )}
      </Header>
      <SmallImages />
      <BigImage />
    </div>
  );
};
