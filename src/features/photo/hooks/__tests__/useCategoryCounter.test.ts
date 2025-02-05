import { waitFor } from '@testing-library/react';
import { renderHookWithProviders } from 'utils/test/testHelpers';

import { useCategoryCounter } from '../useCategoryCounter';

describe('useCategoryCounter hook', () => {
  test('should return default values initially', () => {
    const { result } = renderHookWithProviders(() => useCategoryCounter());

    expect(result.current.isCategorySuccess).toBe(false);
    expect(result.current.categoryCounter).toEqual({});
    expect(result.current.categoryNames).toBeUndefined();
  });

  test('should return correct data when fetching is successful', async () => {
    const { result } = renderHookWithProviders(() => useCategoryCounter());

    await waitFor(() => expect(result.current.isCategorySuccess).toBe(true));

    expect(result.current.categoryCounter).toBeDefined();
    expect(typeof result.current.categoryCounter).toBe('object');

    expect(result.current.categoryNames).toBeDefined();
    expect(result.current.categoryNames).not.toEqual({});
  });
});
