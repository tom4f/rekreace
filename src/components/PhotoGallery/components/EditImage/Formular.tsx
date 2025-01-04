import { useRef, useState } from 'react';
import { AlertBox, Delay } from '../../../AlertBox/AlertBox';
import { AlertType, ChangeType, FormularType } from './../../TypeDefinition';
import './../BigImage/CategoryListEdit.css';
import { EditCategory } from './EditCategory';
import { ImageChange } from './ImageChange';
import { fotoGalleryOwner } from '../../../../api/paths';
import { EditLogicType } from './../../TypeDefinition';
import {
  useAddPhoto,
  useUpdatePhoto,
  useDeletePhoto,
  useGetCategory,
} from '../../../../features/photo';

export const Formular = ({
  editPhoto,
  setEditPhoto,
  setImgPosition,
  categoryObj,
  loginData,
}: FormularType) => {
  const { data: categoryName, isSuccess } = useGetCategory({
    fotoGalleryOwner,
  });

  const { mutate: addPhoto } = useAddPhoto();
  const { mutate: updatePhoto } = useUpdatePhoto();
  const { mutate: deletePhoto } = useDeletePhoto();

  const [alert, setAlert] = useState<AlertType>({ header: '', text: '' });
  Delay(alert, setAlert);

  const [isCategory, setIsCategory] = useState(false);
  const editCategory = (event: React.MouseEvent<HTMLInputElement>) => {
    event.preventDefault();
    setIsCategory((old) => !old);
  };

  const change = (e: ChangeType) =>
    setEditPhoto((orig) => ({ ...orig, [e.target.name]: e.target.value }));

  const form = useRef<HTMLFormElement>(null);

  const category = [];
  if (categoryName) {
    for (const [key, value] of Object.entries(categoryName)) {
      if (key !== '99999') {
        category.push(
          <option key={key} value={key}>
            {value}
          </option>
        );
      }
    }
  }

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
        addPhoto(FD);
        break;
      case 'update':
        updatePhoto(FD, {
          onSuccess: () => {
            setImgPosition((old) => ({ ...old, reload: ++old.reload }));
          },
        });
        break;
      case 'delete':
        deletePhoto(FD);
        break;
      default:
        break;
    }

    setAlert({ header: 'Hotovo', text: ':-)', color: 'lime' });
  };

  return isSuccess && isCategory ? (
    <EditCategory
      categoryName={categoryName}
      categoryObj={categoryObj}
      setImgPosition={setImgPosition}
      editCategory={editCategory}
    />
  ) : (
    <div style={{ overflow: 'visible' }}>
      <form ref={form} name='formular'>
        <div className='form_booking'>
          <div>{editPhoto?.id}</div>
          <input
            name='imgType'
            value={editPhoto?.imgType ?? 'image/jpeg'}
            onChange={change}
            hidden
          />
          <input
            name='id'
            value={editPhoto?.id ?? 0}
            onChange={change}
            hidden
          />
          <div className='input_booking'>
            <label>Název</label>
            <input
              value={editPhoto?.header ?? 'loading...'}
              onChange={change}
              placeholder='zadej název'
              name='header'
              size={34}
            />
          </div>
          <div className='input_booking' style={{ width: '40%' }}>
            <label>Kategorie</label>
            <select value={editPhoto?.typ ?? ''} onChange={change} name='typ'>
              <option value=''>--- vyber kategorii</option>
              {category}
            </select>
          </div>
          <div className='input_booking' style={{ width: '40%' }}>
            <label>Datum focení</label>
            <input
              name='date'
              value={editPhoto?.date ?? '2021-01-01'}
              onChange={change}
              size={10}
              type='date'
            />
          </div>
          <div className='input_booking'>
            <label>Popis</label>
            <textarea
              value={editPhoto?.text ?? 'loading...'}
              onChange={change}
              name='text'
              rows={2}
              cols={60}
              placeholder='popis fotky'
              wrap='Yes'
            ></textarea>
          </div>
          <div className='input_booking' style={{ width: '40%' }}>
            <label>Autor</label>
            <input
              value={editPhoto?.autor ?? 'loading...'}
              onChange={change}
              name='autor'
              placeholder='autor'
              size={10}
            />
          </div>
          <div className='input_booking' style={{ width: '40%' }}>
            <label>Email</label>
            <input
              placeholder='email'
              name='email'
              value={editPhoto?.email ?? 'loading...'}
              onChange={change}
              size={20}
            />
          </div>
          <div className='input_booking'>
            <label>otoceni vlevo o kolik stupňů</label>
            <input
              value={editPhoto?.rotate ?? 0}
              onChange={change}
              type='number'
              name='rotate'
              min='0'
              max='270'
              step='90'
            />
          </div>

          <ImageChange imgId={editPhoto?.id} setEditPhoto={setEditPhoto} />

          {alert.header && (
            <div className='input_booking'>
              <AlertBox alert={alert} />
            </div>
          )}
          <div className='submit_booking green'>
            <input
              type='Submit'
              onClick={editLogic}
              name='create'
              defaultValue='Přidej'
            />
          </div>
          <div className='submit_booking blue'>
            <input
              type='Submit'
              onClick={editLogic}
              name='update'
              defaultValue='Uprav'
            />
          </div>
          <div
            className='submit_booking red'
            style={{ backgroundColor: 'rgba(256, 0, 0, 0.4)' }}
          >
            <input
              type='Submit'
              onClick={editLogic}
              name='delete'
              defaultValue='Smaž'
            />
          </div>

          {isCategory ? null : (
            <div
              className='submit_booking red'
              style={{ backgroundColor: 'rgba(256, 0, 256, 0.4)' }}
            >
              <input
                type='Submit'
                onClick={(event) => editCategory(event)}
                name='delete'
                defaultValue='Kategorie'
              />
            </div>
          )}
        </div>
      </form>
    </div>
  );
};
