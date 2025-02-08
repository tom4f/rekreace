import { HttpStatusCode } from 'enums';
import { resolveMock } from 'features/mocks';
import { CategoryScenarios } from 'features/mocks/enums/scenariosEnums';
import { http, HttpResponse } from 'msw';

import { CategoryResponse, GET_CATEGORY_ENDPOINT } from '../hooks';
import limitedCategories from './mockFiles/limitedCategories.json';
import manyCategories from './mockFiles/manyCategories.json';

const handlers = [
  http.get(GET_CATEGORY_ENDPOINT, async () => {
    return HttpResponse.json<CategoryResponse>(manyCategories);
  }),
];

export const getCategoryScenarios = {
  [CategoryScenarios.LIMITED_CATEGORIES]: [
    http.get(GET_CATEGORY_ENDPOINT, async () => {
      return HttpResponse.json<CategoryResponse>(limitedCategories);
    }),
  ],
  [CategoryScenarios.ERROR_500]: [
    http.get(GET_CATEGORY_ENDPOINT, async () => {
      return new HttpResponse(null, {
        status: HttpStatusCode.INTERNAL_SERVER_ERROR_500,
      });
    }),
  ],
};

export const getCategoryMock = () =>
  resolveMock(handlers, getCategoryScenarios, GET_CATEGORY_ENDPOINT);
