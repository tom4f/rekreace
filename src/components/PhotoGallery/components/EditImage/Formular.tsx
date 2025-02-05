import { fotoGalleryOwner } from 'api/paths';
import { AlertBox } from 'components/AlertBox/AlertBox';
import { Button, Input, Select, TextArea } from 'components/Atoms';
import {
  CategoryObjType,
  PhotoType,
  SetStateType,
} from 'components/PhotoGallery';
import { useAlert } from 'features/alert';
import { LoginResponse } from 'features/login';
import {
  useAddPhoto,
  useDeletePhoto,
  useGetCategory,
  useUpdatePhoto,
} from 'features/photo';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
import styled from 'styled-components';

import { EditCategory } from './EditCategory';
import { ImageChange } from './ImageChange';
type ChangeType = React.ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>;
type EditType = React.MouseEvent<
  HTMLButtonElement | HTMLInputElement,
  MouseEvent
>;

type EditLogicType = (event: EditType) => void;

export type EditCategoryToggleType = (
  event: React.MouseEvent<HTMLButtonElement>
) => void;

type FormularType = {
  editPhoto: PhotoType;
  setEditPhoto: Dispatch<SetStateAction<PhotoType>>;
  setImgPosition: SetStateType;
  categoryObj: CategoryObjType;
  loginData: LoginResponse;
};

export const Formular = ({
  editPhoto,
  setEditPhoto,
  setImgPosition,
  loginData,
}: FormularType) => {
  const { data: categoryNamesData, isSuccess: isSuccessCategoryNames } =
    useGetCategory({
      fotoGalleryOwner,
    });

  const { mutate: addPhoto } = useAddPhoto();
  const { mutate: updatePhoto } = useUpdatePhoto();
  const { mutate: deletePhoto } = useDeletePhoto();

  const { alert, setAlert } = useAlert();

  const [isCategory, setIsCategory] = useState(false);
  const editCategory: EditCategoryToggleType = (event) => {
    event.preventDefault();
    setIsCategory((old) => !old);
  };

  const change = (e: ChangeType) =>
    setEditPhoto((orig) => ({ ...orig, [e.target.name]: e.target.value }));

  const form = useRef<HTMLFormElement>(null);

  const category = Object.entries(categoryNamesData ?? {})
    .filter(([key]) => key !== '99999')
    .map(([key, value]) => ({ value: key, label: value }));

  const editLogic: EditLogicType = async (event) => {
    event.preventDefault();
    const action = (event.target as HTMLButtonElement).name;

    const formCurrent = form.current;

    if (!formCurrent) return;

    setAlert({
      header: 'Ukládám změny',
      text: 'malý moment...',
      color: 'lime',
    });

    const FD = new FormData(formCurrent);

    FD.append('webToken', loginData.webToken);
    FD.append('webAccess', loginData.webAccess);
    FD.append('webUser', loginData.webUser);

    switch (action) {
      case 'create':
        FD.delete('id');
        addPhoto(FD, {
          onSuccess: () => {
            setEditPhoto((orig) => ({ ...orig, rotate: '0' }));
            setAlert({ header: 'Foto přidáno', text: ':-)', color: 'lime' });
          },
        });
        break;
      case 'update':
        updatePhoto(FD, {
          onSuccess: () => {
            setImgPosition((old) => ({ ...old, reload: ++old.reload }));
            setEditPhoto((orig) => ({ ...orig, rotate: '0' }));
            setAlert({ header: 'Foto upraveno', text: ':-)', color: 'lime' });
          },
        });
        break;
      case 'delete':
        deletePhoto(FD, {
          onSuccess: () => {
            setAlert({ header: 'Foto smazáno', text: ':-)', color: 'lime' });
          },
        });
        break;
      default:
        break;
    }
  };

  if (!isSuccessCategoryNames && !categoryNamesData) {
    return null;
  }

  return isCategory ? (
    <EditCategory
      categoryNames={categoryNamesData}
      editCategory={editCategory}
    />
  ) : (
    <form ref={form}>
      <StyledForm>
        <div style={{ width: '100%', textAlign: 'center' }}>
          {editPhoto.id}
          {alert.header && (
            <AlertBox
              style={{ width: '100%', textAlign: 'center' }}
              alert={alert}
            />
          )}
        </div>
      </StyledForm>
      <StyledForm>
        <Input
          label='Název'
          value={editPhoto.header}
          onChange={change}
          placeholder='zadej název'
          name='header'
        />

        <Select
          label='Kategorie'
          options={category}
          value={editPhoto.typ}
          onChange={change}
          name='typ'
        />

        <TextArea
          label='Popis'
          value={editPhoto.text ?? 'loading...'}
          onChange={change}
          name='text'
          placeholder='popis fotky'
          wrap='Yes'
        />

        <Input
          label='Datum focení'
          name='date'
          value={editPhoto.date}
          onChange={change}
          type='date'
        />

        <Input
          label='Autor'
          value={editPhoto.autor ?? 'loading...'}
          onChange={change}
          name='autor'
          placeholder='autor'
        />

        <Input
          label='Email'
          placeholder='email'
          name='email'
          value={editPhoto.email}
          onChange={change}
        />

        <Input
          label='otoceni vlevo o kolik stupňů'
          value={editPhoto.rotate}
          onChange={change}
          type='number'
          name='rotate'
          min='0'
          max='270'
          step='90'
        />

        <ImageChange imgId={editPhoto.id} setEditPhoto={setEditPhoto} />
      </StyledForm>

      <StyledForm>
        <Button label='Přidej' onClick={editLogic} name='create' />

        <Button
          label='Uprav'
          onClick={editLogic}
          name='update'
          variant='secondary'
        />

        <Button label='Smaž' onClick={editLogic} name='delete' variant='red' />

        {isCategory ? null : (
          <Button
            label='Kategorie'
            onClick={(e) => editCategory(e)}
            name='delete'
            variant='blue'
          />
        )}
      </StyledForm>
      <input
        name='imgType'
        value={editPhoto.imgType ?? 'image/jpeg'}
        onChange={change}
        hidden
      />
      <input name='id' value={editPhoto.id ?? 0} onChange={change} hidden />
    </form>
  );
};

const StyledForm = styled.div`
  max-width: 600px;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  text-align: left;
  border-radius: 5px;
  border: 1px solid #555;
  z-index: 3;

  & > * {
    flex: 1 1 40%;
  }
`;
