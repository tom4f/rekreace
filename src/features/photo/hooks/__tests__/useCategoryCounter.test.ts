import { waitFor } from '@testing-library/react';
import {
  CategoryScenarios,
  PhotoScenarios,
} from 'features/mocks/enums/scenariosEnums';
import limitedCategories from 'src/features/photo/mocks/mockFiles/limitedCategories.json?raw';
import manyCategories from 'src/features/photo/mocks/mockFiles/manyCategories.json?raw';
import { renderHookWithProviders } from 'utils/test/testHelpers';

import { useCategoryCounter } from '../useCategoryCounter';
import { CategoryResponse, GET_CATEGORY_ENDPOINT } from '../useGetCategory';
import { GET_PHOTO_ENDPOINT } from '../useGetPhoto';

const manyCategoryData: CategoryResponse = JSON.parse(manyCategories);
const limitedCategoriesData: CategoryResponse = JSON.parse(limitedCategories);

describe('useCategoryCounter hook', () => {
  test('should return default values initially', () => {
    const { result } = renderHookWithProviders(() => useCategoryCounter());
    expect(result.current.isGetCategorySuccess).toBe(false);
    expect(result.current.isGetPhotoSuccess).toBe(false);
    expect(result.current.categoryCounter).toEqual({});
    expect(result.current.categoryNames).toBeUndefined();
  });

  test('test scenario error500', async () => {
    const { result } = renderHookWithProviders(useCategoryCounter, {
      [GET_CATEGORY_ENDPOINT]: CategoryScenarios.ERROR_500,
      [GET_PHOTO_ENDPOINT]: PhotoScenarios.ERROR_500,
    });
    await waitFor(() => expect(result.current.categoryCounter).toEqual({}));
    expect(result.current.isGetCategorySuccess).toBe(false);
    expect(result.current.isGetPhotoSuccess).toBe(false);
    expect(result.current.categoryNames).toBeUndefined();
  });

  test('test default mock', async () => {
    const { result } = renderHookWithProviders(useCategoryCounter, {
      [GET_CATEGORY_ENDPOINT]: CategoryScenarios.DEFAULT,
      [GET_PHOTO_ENDPOINT]: PhotoScenarios.DEFAULT,
    });
    await waitFor(() =>
      expect(result.current.categoryCounter).toEqual({
        '1': 1,
        '4': 1,
        '12': 1,
        '99999': 3,
      })
    );
    expect(result.current.isGetCategorySuccess).toBe(true);
    expect(result.current.isGetPhotoSuccess).toBe(true);
    expect(result.current.categoryNames).toEqual(
      manyCategoryData.categoryNames
    );
  });

  test('test scenario mock', async () => {
    const { result } = renderHookWithProviders(useCategoryCounter, {
      [GET_CATEGORY_ENDPOINT]: CategoryScenarios.LIMITED_CATEGORIES,
      [GET_PHOTO_ENDPOINT]: PhotoScenarios.MANY_PHOTOS,
    });
    await waitFor(() =>
      expect(result.current.categoryCounter).toEqual({
        '1': 3,
        '2': 2,
        '4': 1,
        '5': 3,
        '12345': 1,
        '99999': 10,
      })
    );
    expect(result.current.isGetCategorySuccess).toBe(true);
    expect(result.current.isGetPhotoSuccess).toBe(true);
    expect(result.current.categoryNames).toEqual(
      limitedCategoriesData.categoryNames
    );
  });
});
