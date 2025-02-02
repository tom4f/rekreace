import { apiPost } from './apiPost';
import { apiPut } from './apiPut';
import { apiDelete } from './delete';
import { apiGet } from './get';

export const api = {
  get: apiGet,
  post: apiPost,
  put: apiPut,
  delete: apiDelete,
};
