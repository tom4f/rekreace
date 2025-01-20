import { apiPost } from './apiPost';
import { apiPut } from './apiPut';
import { apiGet } from './get';
import { apiDelete } from './delete';

export const api = {
  get: apiGet,
  post: apiPost,
  put: apiPut,
  delete: apiDelete,
};
