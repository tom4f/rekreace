import { HttpStatusCode } from 'enums';
import { resolveMock } from 'features/mocks';
import { http, HttpResponse } from 'msw';

import { GET_BOOKING_ENDPOINT, GetBookingResponse } from '../hooks';

const handlers = [
  http.get(GET_BOOKING_ENDPOINT, async () => {
    return HttpResponse.json<GetBookingResponse>([
      {
        week: 1,
        g1_status: 1,
        g1_text: 'w1 okwwww',
        g2_status: 0,
        g2_text: '',
        g3_status: 0,
        g3_text: 'mimo provoz',
        lastUpdate: '2025-01-05 15:36:28',
      },
      {
        week: 2,
        g1_status: 2,
        g1_text: 'Mock !!!',
        g2_status: 0,
        g2_text: '',
        g3_status: 2,
        g3_text: 'mimo  provoz',
        lastUpdate: '2024-12-05 08:47:25',
      },
      {
        week: 3,
        g1_status: 0,
        g1_text: '',
        g2_status: 0,
        g2_text: '',
        g3_status: 0,
        g3_text: '',
        lastUpdate: '2024-12-07 14:40:02',
      },
      {
        week: 4,
        g1_status: 1,
        g1_text: 'week6',
        g2_status: 0,
        g2_text: '',
        g3_status: 1,
        g3_text: 'a',
        lastUpdate: '2025-01-05 15:07:24',
      },
      {
        week: 5,
        g1_status: 0,
        g1_text: 'week7',
        g2_status: 0,
        g2_text: '',
        g3_status: 1,
        g3_text: '',
        lastUpdate: '2024-11-13 12:10:08',
      },
      {
        week: 6,
        g1_status: 1,
        g1_text: 'aaaaaaaaaaa',
        g2_status: 0,
        g2_text: '',
        g3_status: 0,
        g3_text: '',
        lastUpdate: '2024-12-07 16:27:54',
      },
      {
        week: 7,
        g1_status: 0,
        g1_text: '',
        g2_status: 0,
        g2_text: '',
        g3_status: 4,
        g3_text: '',
        lastUpdate: '2024-11-13 12:03:29',
      },
      {
        week: 8,
        g1_status: 0,
        g1_text: '',
        g2_status: 0,
        g2_text: '',
        g3_status: 0,
        g3_text: '',
        lastUpdate: '2024-11-13 12:03:29',
      },
      {
        week: 9,
        g1_status: 0,
        g1_text: '',
        g2_status: 0,
        g2_text: '',
        g3_status: 0,
        g3_text: '',
        lastUpdate: '2025-01-05 15:36:34',
      },
      {
        week: 10,
        g1_status: 0,
        g1_text: '',
        g2_status: 0,
        g2_text: '',
        g3_status: 0,
        g3_text: 'week10',
        lastUpdate: '2024-12-05 08:47:42',
      },
      {
        week: 11,
        g1_status: 0,
        g1_text: '',
        g2_status: 0,
        g2_text: '',
        g3_status: 0,
        g3_text: '',
        lastUpdate: '2024-11-13 12:02:54',
      },
      {
        week: 12,
        g1_status: 0,
        g1_text: '',
        g2_status: 0,
        g2_text: '',
        g3_status: 0,
        g3_text: '',
        lastUpdate: '2024-11-13 12:02:54',
      },
      {
        week: 13,
        g1_status: 3,
        g1_text: '',
        g2_status: 0,
        g2_text: '',
        g3_status: 0,
        g3_text: '',
        lastUpdate: '2025-01-05 15:07:54',
      },
      {
        week: 14,
        g1_status: 0,
        g1_text: '',
        g2_status: 0,
        g2_text: '',
        g3_status: 0,
        g3_text: '',
        lastUpdate: '2024-11-13 12:02:54',
      },
      {
        week: 15,
        g1_status: 0,
        g1_text: '',
        g2_status: 0,
        g2_text: '',
        g3_status: 0,
        g3_text: '',
        lastUpdate: '2024-11-13 12:02:54',
      },
      {
        week: 16,
        g1_status: 0,
        g1_text: '',
        g2_status: 0,
        g2_text: '',
        g3_status: 0,
        g3_text: '',
        lastUpdate: '2024-11-13 12:02:54',
      },
      {
        week: 17,
        g1_status: 0,
        g1_text: '',
        g2_status: 0,
        g2_text: '',
        g3_status: 0,
        g3_text: '',
        lastUpdate: '2024-11-13 12:02:54',
      },
      {
        week: 18,
        g1_status: 0,
        g1_text: '',
        g2_status: 0,
        g2_text: '',
        g3_status: 0,
        g3_text: '',
        lastUpdate: '2024-11-13 12:02:54',
      },
      {
        week: 19,
        g1_status: 0,
        g1_text: '',
        g2_status: 0,
        g2_text: '',
        g3_status: 0,
        g3_text: '',
        lastUpdate: '2024-11-13 12:02:54',
      },
      {
        week: 20,
        g1_status: 0,
        g1_text: '',
        g2_status: 0,
        g2_text: '',
        g3_status: 0,
        g3_text: '',
        lastUpdate: '2024-11-13 12:02:54',
      },
      {
        week: 21,
        g1_status: 0,
        g1_text: '',
        g2_status: 0,
        g2_text: '',
        g3_status: 0,
        g3_text: '',
        lastUpdate: '2024-11-13 12:02:19',
      },
      {
        week: 22,
        g1_status: 0,
        g1_text: '',
        g2_status: 0,
        g2_text: '',
        g3_status: 0,
        g3_text: '',
        lastUpdate: '2024-11-13 12:02:19',
      },
      {
        week: 23,
        g1_status: 0,
        g1_text: '',
        g2_status: 0,
        g2_text: '',
        g3_status: 0,
        g3_text: '',
        lastUpdate: '2024-11-13 12:02:19',
      },
      {
        week: 24,
        g1_status: 0,
        g1_text: '',
        g2_status: 0,
        g2_text: '',
        g3_status: 0,
        g3_text: '',
        lastUpdate: '2024-11-13 12:02:19',
      },
      {
        week: 25,
        g1_status: 0,
        g1_text: '',
        g2_status: 0,
        g2_text: '',
        g3_status: 0,
        g3_text: '',
        lastUpdate: '2024-11-13 12:02:19',
      },
      {
        week: 26,
        g1_status: 0,
        g1_text: '',
        g2_status: 0,
        g2_text: '',
        g3_status: 0,
        g3_text: '',
        lastUpdate: '2024-11-13 12:02:19',
      },
      {
        week: 27,
        g1_status: 0,
        g1_text: '',
        g2_status: 0,
        g2_text: '',
        g3_status: 0,
        g3_text: '',
        lastUpdate: '2024-11-13 12:02:19',
      },
      {
        week: 28,
        g1_status: 0,
        g1_text: '',
        g2_status: 0,
        g2_text: '',
        g3_status: 0,
        g3_text: '',
        lastUpdate: '2024-11-13 12:02:19',
      },
      {
        week: 29,
        g1_status: 0,
        g1_text: '',
        g2_status: 0,
        g2_text: '',
        g3_status: 0,
        g3_text: '',
        lastUpdate: '2024-11-13 12:02:19',
      },
      {
        week: 30,
        g1_status: 0,
        g1_text: '',
        g2_status: 0,
        g2_text: '',
        g3_status: 0,
        g3_text: '',
        lastUpdate: '2024-11-13 12:02:19',
      },
      {
        week: 31,
        g1_status: 1,
        g1_text: 'obsaazxsdsxzeno/Hol',
        g2_status: 0,
        g2_text: '',
        g3_status: 1,
        g3_text: '(31) 26.07-02.08.2025',
        lastUpdate: '2024-11-13 17:53:22',
      },
      {
        week: 32,
        g1_status: 3,
        g1_text: 'obsazenou00edt',
        g2_status: 0,
        g2_text: '',
        g3_status: 0,
        g3_text: '',
        lastUpdate: '2024-11-13 11:59:36',
      },
      {
        week: 33,
        g1_status: 0,
        g1_text: '',
        g2_status: 0,
        g2_text: '',
        g3_status: 0,
        g3_text: '',
        lastUpdate: '2024-11-13 11:59:36',
      },
      {
        week: 34,
        g1_status: 0,
        g1_text: '',
        g2_status: 0,
        g2_text: '',
        g3_status: 0,
        g3_text: '',
        lastUpdate: '2024-11-13 11:59:36',
      },
      {
        week: 35,
        g1_status: 0,
        g1_text: '',
        g2_status: 0,
        g2_text: '',
        g3_status: 0,
        g3_text: '',
        lastUpdate: '2024-11-13 11:59:36',
      },
      {
        week: 36,
        g1_status: 0,
        g1_text: '',
        g2_status: 0,
        g2_text: '',
        g3_status: 0,
        g3_text: '',
        lastUpdate: '2024-11-13 11:59:36',
      },
      {
        week: 37,
        g1_status: 0,
        g1_text: '',
        g2_status: 0,
        g2_text: '',
        g3_status: 0,
        g3_text: '',
        lastUpdate: '2024-11-13 11:59:36',
      },
      {
        week: 38,
        g1_status: 0,
        g1_text: '',
        g2_status: 0,
        g2_text: '',
        g3_status: 0,
        g3_text: '',
        lastUpdate: '2024-11-13 11:59:36',
      },
      {
        week: 39,
        g1_status: 0,
        g1_text: '',
        g2_status: 0,
        g2_text: '',
        g3_status: 0,
        g3_text: '',
        lastUpdate: '2024-11-13 11:59:36',
      },
      {
        week: 40,
        g1_status: 0,
        g1_text: '',
        g2_status: 0,
        g2_text: '',
        g3_status: 0,
        g3_text: '',
        lastUpdate: '2024-11-13 11:59:36',
      },
      {
        week: 41,
        g1_status: 0,
        g1_text: '',
        g2_status: 0,
        g2_text: '',
        g3_status: 0,
        g3_text: '',
        lastUpdate: '2024-11-13 11:59:13',
      },
      {
        week: 42,
        g1_status: 0,
        g1_text: '',
        g2_status: 0,
        g2_text: '',
        g3_status: 0,
        g3_text: '',
        lastUpdate: '2024-11-13 11:59:13',
      },
      {
        week: 43,
        g1_status: 0,
        g1_text: '',
        g2_status: 0,
        g2_text: '',
        g3_status: 0,
        g3_text: '',
        lastUpdate: '2024-11-13 11:59:13',
      },
      {
        week: 44,
        g1_status: 0,
        g1_text: '',
        g2_status: 0,
        g2_text: '',
        g3_status: 0,
        g3_text: '',
        lastUpdate: '2024-11-13 11:59:13',
      },
      {
        week: 45,
        g1_status: 1,
        g1_text: 'week46 ano',
        g2_status: 0,
        g2_text: '',
        g3_status: 0,
        g3_text: '',
        lastUpdate: '2024-11-13 12:11:41',
      },
      {
        week: 46,
        g1_status: 1,
        g1_text: '(46) 08.11-15.11.2025',
        g2_status: 0,
        g2_text: '',
        g3_status: 0,
        g3_text: '',
        lastUpdate: '2024-11-13 17:49:45',
      },
      {
        week: 47,
        g1_status: 0,
        g1_text: 'week48okok',
        g2_status: 0,
        g2_text: '',
        g3_status: 0,
        g3_text: '',
        lastUpdate: '2024-11-13 14:15:12',
      },
      {
        week: 48,
        g1_status: 0,
        g1_text: ' (48) 23.11-30.11.2024',
        g2_status: 1,
        g2_text: 'week48',
        g3_status: 0,
        g3_text: '',
        lastUpdate: '2024-11-14 09:58:12',
      },
      {
        week: 49,
        g1_status: 0,
        g1_text: '',
        g2_status: 0,
        g2_text: '',
        g3_status: 0,
        g3_text: '',
        lastUpdate: '2024-11-13 11:59:13',
      },
      {
        week: 50,
        g1_status: 0,
        g1_text: '',
        g2_status: 0,
        g2_text: '',
        g3_status: 0,
        g3_text: '',
        lastUpdate: '2024-11-13 11:59:13',
      },
      {
        week: 51,
        g1_status: 0,
        g1_text: '',
        g2_status: 0,
        g2_text: '',
        g3_status: 0,
        g3_text: '',
        lastUpdate: '2024-11-13 11:57:11',
      },
      {
        week: 52,
        g1_status: 0,
        g1_text: '',
        g2_status: 3,
        g2_text: 'vnvnv',
        g3_status: 0,
        g3_text: '',
        lastUpdate: '2024-12-07 14:46:16',
      },
      {
        week: 53,
        g1_status: 2,
        g1_text: 'week53posledni',
        g2_status: 1,
        g2_text: '5',
        g3_status: 3,
        g3_text: 'mimo6',
        lastUpdate: '2024-11-13 14:16:14',
      },
    ]);
  }),
];

export const getBookingScenarios = {
  e500: [
    http.get(GET_BOOKING_ENDPOINT, async () => {
      return new HttpResponse(null, {
        status: HttpStatusCode.INTERNAL_SERVER_ERROR_500,
      });
    }),
  ],
  e401: [
    http.get(GET_BOOKING_ENDPOINT, async () => {
      return new HttpResponse(null, {
        status: HttpStatusCode.UNAUTHORIZED_401,
      });
    }),
  ],
};

export const getBookingMock = () =>
  resolveMock(handlers, getBookingScenarios, GET_BOOKING_ENDPOINT);
