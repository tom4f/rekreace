import { HttpStatusCode } from 'enums';
import { resolveMock } from 'features/mocks';
import { http, HttpResponse } from 'msw';

import { GET_PHOTO_ENDPOINT, PhotoResponse } from '../hooks';

const handlers = [
  http.get(GET_PHOTO_ENDPOINT, async () => {
    return HttpResponse.json<PhotoResponse>([
      {
        id: 877,
        date: '2025-02-05',
        text: '5',
        autor: '5',
        email: 'tom4f@seznam5.cz',
        typ: 12,
        header: '5',
        votes: 0,
        insertDate: '2025-01-26 21:30:34',
        imgType: 'png',
      },
      {
        id: 876,
        date: '2025-01-18',
        text: '\r\n',
        autor: 'Bed\u0159ich',
        email: '',
        typ: 12,
        header: 'kostel',
        votes: 0,
        insertDate: '2025-01-18 17:28:31',
        imgType: 'jpg',
      },
      {
        id: 875,
        date: '2025-01-18',
        text: '\r\n',
        autor: 'Bed\u0159ich',
        email: '',
        typ: 1,
        header: 'Ve Frymburku se brusl\u00ed-ov\u00e1l cca 4 km',
        votes: 0,
        insertDate: '2025-01-18 17:28:02',
        imgType: 'jpg',
      },
    ]);
  }),
];

export const getPhotoScenarios = {
  e500: [
    http.get(GET_PHOTO_ENDPOINT, async () => {
      return new HttpResponse(null, {
        status: HttpStatusCode.INTERNAL_SERVER_ERROR_500,
      });
    }),
  ],
  e401: [
    http.get(GET_PHOTO_ENDPOINT, async () => {
      return new HttpResponse(null, {
        status: HttpStatusCode.UNAUTHORIZED_401,
      });
    }),
  ],
};

export const getPhotoMock = () =>
  resolveMock(handlers, getPhotoScenarios, GET_PHOTO_ENDPOINT);
