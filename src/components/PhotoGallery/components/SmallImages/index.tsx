import './SmallImages.css';
import { SmallImagesTypes } from '../../TypeDefinition';
import { StyledDiv } from './StyledDiv.styled';
import { useLoginStatus } from '../../../../features/login';

export const SmallImages = ({
  eightPhoto,
  arrIndexFromImgId,
  imgPosition,
  setImgPosition,
}: SmallImagesTypes) => {
  const { data: loginData } = useLoginStatus();
  return (
    <header className='imgs'>
      {eightPhoto?.map((img) => (
        <StyledDiv
          key={img.id}
          $imgId={img.id}
          $imgType={img.imgType}
          $arrIndexFromImgId={arrIndexFromImgId}
          $imgPosition={imgPosition}
          onClick={() =>
            setImgPosition((old) => ({
              ...old,
              current: arrIndexFromImgId(+img.id),
            }))
          }
        >
          {loginData.isLogged && img.id}
        </StyledDiv>
      ))}
    </header>
  );
};
