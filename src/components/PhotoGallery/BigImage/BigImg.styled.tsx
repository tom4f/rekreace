import styled, { css } from 'styled-components'
import { imgFolder } from '../../../api/photoGalleryPath'
import {
    allPhotoType,
    imgPositionType,
    photoType,
} from '../types/TypeDefinition'

type BigImgType = {
    editPhoto: photoType
    bigPhoto: allPhotoType
    fadein: boolean
    imgPosition: imgPositionType
}

export const BigImg = styled.main<BigImgType>`
 
${({ bigPhoto, editPhoto, fadein, imgPosition }) =>
    bigPhoto &&
    !editPhoto &&
    css`
    & { 
        background-image: url(${`${imgFolder}/${bigPhoto?.id}b.${bigPhoto?.imgType}?${imgPosition.reload}`});
        ${
            fadein &&
            css`
                opacity: 0;
                animation: fadeIn 0.5s ease-in 1 forwards;
            `
        }
    `}
}

${({ bigPhoto, editPhoto, fadein, imgPosition }) =>
    editPhoto &&
    css`
        &::after {
            background-image: url(${(editPhoto?.url as string) ||
            `${imgFolder}/${bigPhoto?.id}b.${bigPhoto?.imgType}?${imgPosition.reload}`});
            background-position: ${(editPhoto?.rotate === '0' &&
                'top    center') ||
            (editPhoto?.rotate === '90' && 'center center') ||
            (editPhoto?.rotate === '180' && 'bottom center') ||
            (editPhoto?.rotate === '270' && 'center center')};
            transform: rotate(${-editPhoto?.rotate}deg);
            ${fadein &&
            css`
                opacity: 0;
                animation: fadeIn 0.5s ease-in 1 forwards;
            `}
        }
    `}

`
