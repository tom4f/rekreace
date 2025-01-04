import styled, { css } from 'styled-components';
import { Url } from '../../../../api/paths';
import { imgPositionType } from '../../TypeDefinition';

interface StyledDivTypes {
  imgPosition: imgPositionType;
  arrIndexFromImgId: (clickedId: number) => number;
  imgId: string;
  imgType: string;
}

export const StyledDiv = styled.div<StyledDivTypes>`
  ${({ imgPosition, arrIndexFromImgId, imgId, imgType }) => css`
        color           : 'white';
        opacity         : ${
          arrIndexFromImgId(+imgId) === imgPosition.current ? 0.5 : 1
        };
        background-image: url(${Url.FOTOGALERIE}/${imgId}.${imgType}?${
    imgPosition.reload
  }) }};
    `}
`;
