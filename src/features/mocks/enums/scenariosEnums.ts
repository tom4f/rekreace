import { MockResolver } from '../mockResolver';

export enum PhotoScenarios {
  DEFAULT = MockResolver.DEFAULT_STATE,
  MANY_PHOTOS = 'manyPhotos',
  ERROR_500 = 'e500',
}

export enum CategoryScenarios {
  DEFAULT = MockResolver.DEFAULT_STATE,
  LIMITED_CATEGORIES = 'limitedCategories',
  ERROR_500 = 'e500',
}
