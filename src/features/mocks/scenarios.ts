import { LOGIN_ENDPOINT, postLoginScenarios, LOGIN_KEY } from '../login';
import { GET_FORUM_ENDPOINT, getForumScenarios, GET_FORUM_KEY } from '../forum';
import {
  GET_BOOKING_ENDPOINT,
  getBookingScenarios,
  GET_BOOKING_KEY,
} from '../booking';

export const availableScenarios = new Map<string[], object>([
  [[LOGIN_ENDPOINT, LOGIN_KEY], postLoginScenarios],
  [[GET_FORUM_ENDPOINT, GET_FORUM_KEY], getForumScenarios],
  [[GET_BOOKING_ENDPOINT, GET_BOOKING_KEY], getBookingScenarios],
]);
