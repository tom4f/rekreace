import { useState } from 'react';
import { setStateType, categoryObjType } from './../../TypeDefinition';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignJustify } from '@fortawesome/free-solid-svg-icons';
import './CategoryList.css';
import { useGetCategory } from '../../../../features/photo';
import { fotoGalleryOwner } from '../../../../api/paths';

interface eightPhotoTypes {
  setImgPosition: setStateType;
  categoryObj: categoryObjType;
}

export const CategoryList = ({
  setImgPosition,
  categoryObj,
}: eightPhotoTypes) => {
  const { data: categoryName } = useGetCategory({
    fotoGalleryOwner,
  });

  const [showCategory, setShowCategory] = useState(false);

  const category = [];

  for (const [key, value] of Object.entries(categoryObj)) {
    const changeCategory = () =>
      setImgPosition((prev) => ({
        ...prev,
        category: +key,
        smallImgStart: 0,
        current: 0,
      }));
    category.push(
      <div className='oneCategory' key={key} onClick={changeCategory}>
        <header>{categoryName?.[+key] ?? 'loading'}</header>
        <article>{value}</article>
      </div>
    );
  }

  return (
    <>
      <FontAwesomeIcon
        className='category'
        icon={faAlignJustify}
        onMouseOver={() => setShowCategory(true)}
      />
      {showCategory ? (
        <div
          className='categoryList'
          onMouseLeave={() => setShowCategory(false)}
        >
          <fieldset>
            <legend>Kategorie / počet fotek</legend>
            <section>{category}</section>
          </fieldset>
        </div>
      ) : null}
    </>
  );
};
