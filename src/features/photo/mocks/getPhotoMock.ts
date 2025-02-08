import { HttpStatusCode } from 'enums';
import { resolveMock } from 'features/mocks';
import { PhotoScenarios } from 'features/mocks/enums/scenariosEnums';
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
        typ: 1,
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
        typ: 4,
        header: 'Ve Frymburku se brusl\u00ed-ov\u00e1l cca 4 km',
        votes: 0,
        insertDate: '2025-01-18 17:28:02',
        imgType: 'jpg',
      },
    ]);
  }),
];

export const getPhotoScenarios = {
  [PhotoScenarios.ERROR_500]: [
    http.get(GET_PHOTO_ENDPOINT, async () => {
      return new HttpResponse(null, {
        status: HttpStatusCode.INTERNAL_SERVER_ERROR_500,
      });
    }),
  ],
  [PhotoScenarios.MANY_PHOTOS]: [
    http.get(GET_PHOTO_ENDPOINT, async () => {
      return HttpResponse.json<PhotoResponse>([
        {
          id: 879,
          date: '2025-02-04',
          text: '\r\n',
          autor: 'Bed\u0159ich',
          email: '',
          typ: 2,
          header: 'Alpsk\u00e1 vyhl\u00eddka',
          votes: 0,
          insertDate: '2025-02-04 19:47:12',
          imgType: 'jpg',
        },
        {
          id: 878,
          date: '2025-02-04',
          text: '\r\n',
          autor: 'Bed\u0159ich',
          email: '',
          typ: 2,
          header: 'Pl\u00edskov nov\u00e1 v\u00fdstavba',
          votes: 0,
          insertDate: '2025-02-04 19:46:04',
          imgType: 'jpg',
        },
        {
          id: 877,
          date: '2025-01-27',
          text: '\r\n',
          autor: 'Bed\u0159ich',
          email: '',
          typ: 1,
          header: 'prvn\u00ed leto\u0161n\u00ed kv\u011bt',
          votes: 0,
          insertDate: '2025-01-28 08:47:13',
          imgType: 'jpg',
        },
        {
          id: 876,
          date: '2025-01-18',
          text: '\r\n',
          autor: 'Bed\u0159ich',
          email: '',
          typ: 1,
          header: 'Ve Frymburku se brusl\u00ed-ov\u00e1l cca 4 km',
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
        {
          id: 874,
          date: '2025-01-04',
          text: '\r\n',
          autor: 'Bed\u0159ich',
          email: '',
          typ: 5,
          header: 'Brusla\u0159sk\u00e1 dr\u00e1ha ve Frymburku',
          votes: 0,
          insertDate: '2025-01-04 22:12:16',
          imgType: 'jpg',
        },
        {
          id: 873,
          date: '2024-12-31',
          text: '\r\n',
          autor: 'Tom\u00e1\u0161',
          email: '',
          typ: 5,
          header: 'Ly\u017eov\u00e1n\u00ed ve Frymburku',
          votes: 0,
          insertDate: '2024-12-31 16:40:21',
          imgType: 'jpg',
        },
        {
          id: 872,
          date: '2024-12-31',
          text: '',
          autor: 'Tom\u00e1\u0161',
          email: '',
          typ: 4,
          header: 'Opraven\u00e1 kosteln\u00ed v\u011b\u017e',
          votes: 0,
          insertDate: '2024-12-31 16:34:15',
          imgType: 'jpg',
        },
        {
          id: 871,
          date: '2024-12-31',
          text: 'led ve Frymburku\r\n',
          autor: 'Bed\u0159ich',
          email: '',
          typ: 5,
          header: 'led na Lipn\u011b je jako zrcadlo',
          votes: 0,
          insertDate: '2024-12-31 12:08:31',
          imgType: 'jpg',
        },
        {
          id: 870,
          date: '2024-12-27',
          text: 'd\u011btsk\u00fd vlek\r\n',
          autor: 'Bed\u0159ich',
          email: '',
          typ: 12345,
          header: 'ly\u017eov\u00e1n\u00ed ve Frymburku zah\u00e1jeno',
          votes: 0,
          insertDate: '2024-12-28 09:53:48',
          imgType: 'jpg',
        },
      ]);
    }),
  ],
};

export const getPhotoMock = () =>
  resolveMock(handlers, getPhotoScenarios, GET_PHOTO_ENDPOINT);
