import { useState } from 'react';
import { AlertBox, Delay } from '../../../AlertBox/AlertBox';
import {
  AlertType,
  EditCategoryType,
  categoryChangeType,
} from './../../TypeDefinition';
import { CategoryNameType } from './../../TypeDefinition';
import { fotoGalleryOwner } from '../../../../api/paths';
import {
  addCategoryLogicType,
  editCategoryLogicType,
} from './../../TypeDefinition';

import { useUpdateCategory } from '../../../../features/photo';

export const EditCategory = ({
  categoryName: initialCategoryName,
  editCategory,
}: EditCategoryType) => {
  const { mutate: updateCategory } = useUpdateCategory();
  const [categoryName, setCategoryName] = useState<CategoryNameType | null>(
    initialCategoryName
  );
  const [alert, setAlert] = useState<AlertType>({ header: '', text: '' });
  Delay(alert, setAlert);

  if (!categoryName) return null;

  const categoryChange = (e: categoryChangeType) => {
    const { name, value } = e.target;
    if (name.startsWith('name-')) {
      const key = name.replace('name-', '');
      setCategoryName((orig) => ({ ...orig, [key]: value }));
    }
  };

  const category = [];
  for (const [key] of Object.entries(categoryName)) {
    category.push(
      <div key={key} className='oneLine'>
        <article>{key}</article>
        <div className='input_booking' style={{ width: '200px' }}>
          <input
            value={categoryName?.[+key] ?? ''}
            onChange={categoryChange}
            name={`name-${key}`}
            placeholder='text'
            size={10}
          />
        </div>
      </div>
    );
  }

  const editCategoryLogic: editCategoryLogicType = async (event) => {
    event.preventDefault();

    if (!categoryName) return;
    setAlert({
      header: 'Ukládám změny',
      text: 'malý moment...',
      color: 'lime',
    });
    updateCategory(
      { categoryName, fotoGalleryOwner },
      {
        onSuccess: () => setAlert({ header: 'OK', text: ':-)', color: 'lime' }),
        onError: (err) =>
          setAlert({ header: 'Error', text: err?.message, color: 'red' }),
      }
    );
  };

  const addCategoryLogic: addCategoryLogicType = async (event) => {
    event.preventDefault();

    setCategoryName((orig) => {
      if (!orig) return orig;
      const highestKey = Math.max(
        ...Object.keys(orig).map((key) => (key !== '99999' ? +key : 0))
      );
      console.log('highestKey', highestKey);
      return { ...orig, [highestKey + 1]: 'value' };
    });
  };

  return (
    <form name='formularCategory'>
      <div className='form_booking'>
        {alert.header && <AlertBox alert={alert} />}
        <div className='input_booking'>
          <section className='categoryListEdit'>{category}</section>
        </div>
        <div
          className='submit_booking red'
          style={{ backgroundColor: 'rgba(256, 0, 256, 0.4)' }}
        >
          <input
            type='Submit'
            onClick={(event) => editCategory(event)}
            defaultValue='Zpět Foto'
          />
        </div>
        <div
          className='submit_booking red'
          style={{ backgroundColor: 'rgba(0, 256, 0, 0.4)' }}
        >
          <input
            type='Submit'
            onClick={(event) => editCategoryLogic(event)}
            defaultValue='Uložit'
          />
        </div>
        <div
          className='submit_booking red'
          style={{ backgroundColor: 'rgba(0, 0, 256, 0.4)' }}
        >
          <input
            type='Submit'
            onClick={(event) => addCategoryLogic(event)}
            defaultValue='Nová kat.'
          />
        </div>
      </div>
    </form>
  );
};
