import { waitFor } from '@testing-library/react';
import { Url } from 'src/api/paths';
import { PhotoScenarios } from 'src/features/mocks/enums/scenariosEnums';
import { renderHookWithProviders } from 'utils/test/testHelpers';

import { forumResponseFirstPageMock } from '../../mock/mockData/forumResponseFirstPageMock';
import { useGetForumGraphQL } from '../useGetForumGraphQL';

describe('useGetForumGraphQL hook', () => {
  test('should return default values initially', () => {
    const { result } = renderHookWithProviders(useGetForumGraphQL);

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBe(undefined);
  });

  test('test default mock', async () => {
    const { result } = renderHookWithProviders(useGetForumGraphQL);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe(undefined);
    expect(result.current.data).toEqual(forumResponseFirstPageMock);
  });

  test('test error500 mock', async () => {
    const { result } = renderHookWithProviders(useGetForumGraphQL, {
      [Url.GRAPH_QL_API]: PhotoScenarios.ERROR_500,
    });

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).not.toBe(undefined);
    expect(result.current.error?.message).toContain('Received status code 500');
    expect(result.current.data).toEqual([]);
  });
});
