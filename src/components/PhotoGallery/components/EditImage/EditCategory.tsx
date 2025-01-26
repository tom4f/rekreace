import { useState } from 'react';
import { fotoGalleryOwner } from 'api/paths';
import { AlertBox, Delay } from 'components/AlertBox/AlertBox';
import { Button, Input } from 'components/Atoms';
import { AlertType } from 'features/alert';
import { useUpdateCategory } from 'features/photo';
import styled from 'styled-components';

import { categoryChangeType, CategoryNameType } from './../../TypeDefinition';
import { EditCategoryToggleType } from './Formular';

export type EditCategoryType = {
  editCategory: EditCategoryToggleType;
  categoryName: { [key: string]: string } | null;
};

type categoryLogicType = (event: React.MouseEvent<HTMLButtonElement>) => void;

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

  const editCategoryLogic: categoryLogicType = (event) => {
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

  const addCategoryLogic: categoryLogicType = (event) => {
    event.preventDefault();

    setCategoryName((orig) => {
      if (!orig) return orig;
      const highestKey = Math.max(
        ...Object.keys(orig).map((key) => (key !== '99999' ? +key : 0))
      );
      return { ...orig, [highestKey + 1]: 'value' };
    });
  };

  return (
    <form>
      <StyledCategory>
        <Button label='Zpět Foto' onClick={editCategory} variant='blue' />
        <Button label='Uložit' onClick={editCategoryLogic} />
        <Button
          label='Nová kat.'
          onClick={addCategoryLogic}
          variant='secondary'
        />

        {alert.header && (
          <AlertBox
            alert={alert}
            style={{ width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
          />
        )}
      </StyledCategory>
      <StyledCategory>
        {Object.entries(categoryName).map(([key]) => (
          <Input
            key={key}
            label={key}
            value={categoryName?.[+key] ?? ''}
            onChange={categoryChange}
            name={`name-${key}`}
            placeholder='text'
            size={15}
          />
        ))}
      </StyledCategory>
    </form>
  );
};

const StyledCategory = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 90%;
  background-color: rgba(0, 0, 0, 0.6);
  margin: 10px auto;
  padding: 20px;
`;
