import { LOGIN_ENDPOINT, postLoginScenarios } from '../login';
import { GET_FORUM_ENDPOINT, getForumScenarios } from '../forum';

export const availableScenarios = new Map<any, any>([
  [LOGIN_ENDPOINT, postLoginScenarios],
  [GET_FORUM_ENDPOINT, getForumScenarios],
]);
