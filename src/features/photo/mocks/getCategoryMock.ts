import { HttpStatusCode } from 'enums';
import { resolveMock } from 'features/mocks';
import { http, HttpResponse } from 'msw';

import { CategoryResponse, GET_CATEGORY_ENDPOINT } from '../hooks';

const handlers = [
  http.get(GET_CATEGORY_ENDPOINT, async () => {
    return HttpResponse.json<CategoryResponse>({
      categoryNames: {
        '0': 'Ubytování',
        '1': 'Lipenská přehrada',
        '2': 'Příroda',
        '3': 'Obce',
        '4': 'Historie',
        '5': 'Sport',
        '6': 'Ostatní',
        '10': 'Kaliště - kniha',
        '11': 'Kaliště',
        '12': 'Jawa450',
        '13': '13 13 13',
        '14': '14',
        '15': 'value',
        '16': 'value1',
        '99999': 'Všechny',
      },
      fotoGalleryOwner: '_ubytovani',
    });
  }),
];

export const getCategoryScenarios = {
  e500: [
    http.get(GET_CATEGORY_ENDPOINT, async () => {
      return new HttpResponse(null, {
        status: HttpStatusCode.INTERNAL_SERVER_ERROR_500,
      });
    }),
  ],
  e401: [
    http.get(GET_CATEGORY_ENDPOINT, async () => {
      return new HttpResponse(null, {
        status: HttpStatusCode.UNAUTHORIZED_401,
      });
    }),
  ],
};

export const getCategoryMock = () =>
  resolveMock(handlers, getCategoryScenarios, GET_CATEGORY_ENDPOINT);
