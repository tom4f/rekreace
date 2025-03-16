import { faAlignJustify } from '@fortawesome/free-solid-svg-icons';
import { useCategoryCounter } from 'features/photo';
import { useCallback, useState } from 'react';
import { usePhotoGalleryStore } from 'src/store';
import styled from 'styled-components';

import { CommonIconWrapper } from './Presentation';

export const CategoryList = () => {
  const { setImgPosition } = usePhotoGalleryStore();
  const { categoryCounter, categoryNames, isGetCategorySuccess } =
    useCategoryCounter();

  const [showCategory, setShowCategory] = useState(false);

  const handleMouseOver = useCallback(() => setShowCategory(true), []);
  const handleMouseLeave = useCallback(() => setShowCategory(false), []);

  if (!isGetCategorySuccess || !categoryNames) return null;

  const category = Object.entries(categoryCounter).map(([key, value]) => (
    <StyledOneCategory
      key={key}
      onClick={() =>
        setImgPosition({ category: +key, smallImgStart: 0, current: 0 })
      }
    >
      <header>{categoryNames[+key] ?? 'loading'}</header>
      <article>{value}</article>
    </StyledOneCategory>
  ));

  return (
    <>
      <CommonIconWrapper
        style={{ left: '45%' }}
        data-testid='category-icon'
        icon={faAlignJustify}
        onMouseOver={handleMouseOver}
      />
      {showCategory && (
        <StyledCategoryList
          data-testid='category-list'
          onMouseLeave={handleMouseLeave}
        >
          <fieldset>
            <legend>Kategorie / počet fotek</legend>
            <section>{category}</section>
          </fieldset>
        </StyledCategoryList>
      )}
    </>
  );
};

const StyledCategoryList = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  justify-content: center;
  align-items: center;
  z-index: 3;
  width: 270px;

  fieldset {
    margin: 3px;
    padding: 3px;
    font-size: 1rem;
    border: 2px solid green;
    border-radius: 8px;
    color: white;
    background-color: rgba(0, 0, 0, 0.5);

    legend {
      background-color: rgba(0, 0, 0, 0.5);
    }

    section {
      display: flex;
      flex-direction: column;
      width: auto;

      header {
        text-align: right;
        white-space: nowrap;
        padding-right: 10px;
        width: 75%;
      }

      article {
        border-left: 1px dotted #00b300;
        text-align: right;
        padding-left: 10px;
        margin: 0px 5px;
        width: 25%;
      }
    }
  }
`;

const StyledOneCategory = styled.div`
  display: flex;
  cursor: pointer;
  border: 1px solid transparent;
  transition: border 0.2s ease, background-color 0.5s ease;

  &:hover {
    border: 1px solid lime;
    background-color: rgba(0, 0, 0, 0.5);
  }
`;
