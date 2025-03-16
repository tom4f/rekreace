import { Url } from 'api/paths';
import { useLoginStatus } from 'features/login';
import { usePhoto } from 'src/features/photo';
import { usePhotoGalleryStore } from 'src/store';
import styled, { css } from 'styled-components';

export const SmallImages = () => {
  const { imgPosition, setImgPosition } = usePhotoGalleryStore();
  const { data: loginData } = useLoginStatus();
  const { arrIndexFromImgId, eightPhoto } = usePhoto();

  return (
    <StyledHeader>
      {eightPhoto?.map((img) => {
        const isActive =
          arrIndexFromImgId(Number(img.id)) === imgPosition.current;
        return (
          <StyledDiv
            key={img.id}
            $imgId={img.id.toString()}
            $imgType={img.imgType}
            $isActive={isActive}
            $reload={imgPosition.reload}
            onClick={() =>
              setImgPosition({
                current: arrIndexFromImgId(Number(img.id)),
              })
            }
          >
            {loginData?.isLogged && img.id}
          </StyledDiv>
        );
      })}
    </StyledHeader>
  );
};

type StyledDivTypes = {
  $isActive: boolean;
  $imgId: string;
  $imgType: string;
  $reload: number;
};

const StyledDiv = styled.div<StyledDivTypes>`
  ${({ $isActive, $imgId, $imgType, $reload }) => css`
    color: white;
    opacity: ${$isActive ? 0.5 : 1};
    background-image: url(${Url.FOTOGALERIE}/${$imgId}.${$imgType}?${$reload});
  `}
`;

const StyledHeader = styled.header`
  display: flex;
  justify-content: center;
  max-width: 1000px;
  margin: auto;

  & > div {
    width: 12.5%;
    margin: 1px;
    height: 75px;
    background-size: cover;

    &:hover {
      filter: brightness(110%);
    }
  }
`;
