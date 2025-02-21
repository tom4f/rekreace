import { useSearchParams } from 'react-router-dom';

export const useIsFullscreen = () => {
  const [searchParams] = useSearchParams();
  return searchParams.get('fullscreen') === 'true';
};
