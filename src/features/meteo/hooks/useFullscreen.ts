import { useLocation, useSearchParams } from 'react-router-dom';

export const useFullscreen = () => {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();

  const isFullscreenSearch = searchParams.get('fullscreen') === 'true';

  const alwaysFullscreenPaths = [
    '/fotogalerie',
    '/fotogalerie/edit',
    '/orders',
    '/meteoalarm',
  ];

  const conditionalFullscreenPaths = [
    '/meteostanice/lipno/graphs',
    '/meteostanice/frymburk/week',
    '/meteostanice/frymburk/year',
    '/meteostanice/frymburk/table',
    '/meteostanice/oldStation/graphs',
  ];

  const isOrdersDetail = pathname.startsWith('/orders/');

  const isFullscreen =
    alwaysFullscreenPaths.includes(pathname) ||
    isOrdersDetail ||
    (conditionalFullscreenPaths.includes(pathname) && isFullscreenSearch);

  return { isFullscreen, isFullscreenSearch };
};
