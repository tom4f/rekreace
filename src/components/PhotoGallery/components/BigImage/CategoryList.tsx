import './CategoryList.css';

import { faAlignJustify } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SetStateType } from 'components/PhotoGallery';
import { useCategoryCounter } from 'features/photo';
import { useState } from 'react';

type SetImgPosition = {
  setImgPosition: SetStateType;
};

export const CategoryList = ({ setImgPosition }: SetImgPosition) => {
  const { categoryCounter, categoryNames, isGetCategorySuccess } =
    useCategoryCounter();

  const [showCategory, setShowCategory] = useState(false);

  if (!isGetCategorySuccess || !categoryNames) return null;

  const category = [];

  for (const [key, value] of Object.entries(categoryCounter)) {
    const changeCategory = () =>
      setImgPosition((prev) => ({
        ...prev,
        category: +key,
        smallImgStart: 0,
        current: 0,
      }));
    category.push(
      <div className='oneCategory' key={key} onClick={changeCategory}>
        <header>{categoryNames[+key] ?? 'loading'}</header>
        <article>{value}</article>
      </div>
    );
  }

  return (
    <>
      <FontAwesomeIcon
        data-testid='category-icon'
        className='category'
        icon={faAlignJustify}
        onMouseOver={() => setShowCategory(true)}
      />
      {showCategory && (
        <div
          data-testid='category-list'
          className='categoryList'
          onMouseLeave={() => setShowCategory(false)}
        >
          <fieldset>
            <legend>Kategorie / počet fotek</legend>
            <section>{category}</section>
          </fieldset>
        </div>
      )}
    </>
  );
};
