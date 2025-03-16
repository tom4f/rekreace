import { Url } from 'api/paths';
import { OnePhotoResponse, PhotoType } from 'features/photo';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { usePhoto } from 'src/features/photo';
import { ImgPositionType, usePhotoGalleryStore } from 'src/store';
import styled, { css } from 'styled-components';

type BigImgWrapperType = {
  $editPhoto: PhotoType;
  $bigPhoto: OnePhotoResponse;
  $fadeIn: boolean;
  $imgPosition: ImgPositionType;
};

export const BigImgWrapper = ({ children }: { children: ReactNode }) => {
  const { bigPhoto } = usePhoto();
  const { imgPosition, editPhoto, setEditPhoto } = usePhotoGalleryStore();
  const [fadeIn, setFadeIn] = useState(true);

  const { pathname } = useLocation();
  const mainRef = useRef<HTMLElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setFadeIn(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => setFadeIn(false), 500);

    if (pathname === '/fotogalerie/edit') {
      setEditPhoto({ ...bigPhoto });
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
          mainRef.current.style.maxHeight = 'calc(100vh - 117px)';
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
  }, [bigPhoto, pathname, setEditPhoto]);

  if (!bigPhoto) return null;

  return (
    <>
      <StyledBigImg
        ref={mainRef}
        className='main-img'
        $bigPhoto={bigPhoto}
        $editPhoto={editPhoto}
        $fadeIn={fadeIn}
        $imgPosition={imgPosition}
      >
        {children}
      </StyledBigImg>
    </>
  );
};

const StyledBigImg = styled.main<BigImgWrapperType>`
  background-size: contain;
  background-repeat: no-repeat;
  background-position: top center;
  height: calc(100vh - 77px);
  width: auto;
  max-width: 100%;
  position: relative;

  &::after {
    background-size: contain;
    background-repeat: no-repeat;
    background-position: top center;
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  ${({ $bigPhoto, $editPhoto, $fadeIn, $imgPosition }) =>
    $bigPhoto &&
    css`
      & {
        ${$fadeIn &&
        css`
          opacity: 0;
          animation: fadeIn 0.5s ease-in 1 forwards;
        `}
      }

      &::after {
        background-image: url(${($editPhoto?.url as string) ||
        `${Url.FOTOGALERIE}/${$bigPhoto.id}b.${$bigPhoto.imgType}?${$imgPosition.reload}`});
        background-position: ${($editPhoto?.rotate === '0' &&
          'top    center') ||
        ($editPhoto?.rotate === '90' && 'center center') ||
        ($editPhoto?.rotate === '180' && 'bottom center') ||
        ($editPhoto?.rotate === '270' && 'center center')};
        transform: rotate(${-($editPhoto?.rotate ?? 0)}deg);
      }

      @keyframes fadeIn {
        to {
          opacity: 1;
        }
      }
    `}
`;
