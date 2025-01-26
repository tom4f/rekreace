import { Login, useLoginStatus } from '../../../../features/login';
import { editImage } from '../../TypeDefinition';
import { Formular } from './Formular';

export const EditImage = ({
  editPhoto,
  setEditPhoto,
  setImgPosition,
  categoryObj,
}: editImage) => {
  const { data: loginData } = useLoginStatus();

  return (
    <>
      {loginData?.isLogged ? (
        <Formular
          editPhoto={editPhoto}
          setEditPhoto={setEditPhoto}
          loginData={loginData}
          setImgPosition={setImgPosition}
          categoryObj={categoryObj}
        />
      ) : (
        <Login />
      )}
    </>
  );
};
