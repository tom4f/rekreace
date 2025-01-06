import styled, { css } from 'styled-components';
import { Url } from '../../../../api/paths';
import { AllPhotoType, imgPositionType, PhotoType } from '../../TypeDefinition';

type BigImgType = {
  $editPhoto: PhotoType;
  $bigPhoto: AllPhotoType;
  $fadeIn: boolean;
  $imgPosition: imgPositionType;
};

export const BigImg = styled.main<BigImgType>`
 
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
      `${Url.FOTOGALERIE}/${$bigPhoto?.id}b.${$bigPhoto?.imgType}?${$imgPosition.reload}`});
      background-position: ${($editPhoto?.rotate === '0' && 'top    center') ||
      ($editPhoto?.rotate === '90' && 'center center') ||
      ($editPhoto?.rotate === '180' && 'bottom center') ||
      ($editPhoto?.rotate === '270' && 'center center')};
      transform: rotate(${-$editPhoto?.rotate}deg);
    }
  `}
}

`;
