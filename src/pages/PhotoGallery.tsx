import { fotoGalleryOwner } from 'api/paths';
import { Header } from 'components/Atoms';
import { BigImage, SmallImages } from 'components/PhotoGallery';
import { useGetPhoto } from 'features/photo';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export const PhotoGallery = ({ category }: { category?: number }) => {
  const { data: allPhoto } = useGetPhoto({ fotoGalleryOwner });

  const { pathname } = useLocation();
  const [imgPosition, setImgPosition] = useState({
    smallImgStart: 0,
    smallImgsSize: 8,
    current: 0,
    category: category || 99999,
    reload: 0,
  });

  if (!Array.isArray(allPhoto)) {
    return null;
  }

  const filteredPhoto =
    imgPosition.category === 99999
      ? allPhoto
      : allPhoto?.filter((one) => +one['typ'] === imgPosition.category);

  const arrIndexFromImgId = (clickedImgId: number): number =>
    filteredPhoto.findIndex((img) => +img['id'] === clickedImgId);

  const bigPhoto = filteredPhoto[imgPosition.current];

  const eightPhoto = filteredPhoto.slice(
    imgPosition.smallImgStart,
    imgPosition.smallImgStart + imgPosition.smallImgsSize
  );

  return (
    <div>
      <Header>
        {pathname === '/' || pathname === '/kaliste' ? (
          <Link to='/fotogalerie'>Fotogalerie</Link>
        ) : (
          <Link to='/'>Start</Link>
        )}
      </Header>
      <SmallImages
        key={imgPosition.reload}
        imgPosition={imgPosition}
        setImgPosition={setImgPosition}
        bigPhoto={bigPhoto}
        eightPhoto={eightPhoto}
        arrIndexFromImgId={arrIndexFromImgId}
      />
      <BigImage
        imgPosition={imgPosition}
        setImgPosition={setImgPosition}
        bigPhoto={bigPhoto}
        length={filteredPhoto.length}
      />
    </div>
  );
};
