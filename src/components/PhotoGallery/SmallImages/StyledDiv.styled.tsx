import styled, { css } from 'styled-components'
import { imgFolder } from '../../../api/photoGalleryPath'
import { imgPositionType } from './../types/TypeDefinition'

interface StyledDivTypes {
    imgPosition: imgPositionType
    arrindexfromimgid: (clickedId: number) => number
    imgid: string
    imgtype: string
}

export const StyledDiv = styled.div<StyledDivTypes>`
    ${({
        imgPosition,
        arrindexfromimgid,
        imgid,
        imgtype,
    }: StyledDivTypes) => css`
        color           : 'white';
        opacity         : ${arrindexfromimgid(+imgid) === imgPosition.current ? 0.5 : 1};
        background-image: url(${imgFolder}/${imgid}.${imgtype}?${imgPosition.reload}) }};
    `}
`
