import './css/main.css';

import { Route, Routes, useLocation } from 'react-router-dom';

import { Bottom } from './components/Bottom/Bottom';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { Top } from './components/Top/Top';
import { TopBedrich } from './components/Top/TopBedrich';
import { useLoginStatus } from './features/login/hooks/useGetLoginStatus';
import {
  Apartments,
  Bedrich,
  Booking,
  Contact,
  Forum,
  Frymburk,
  Kaliste,
  Meteo,
  MeteoAlarm,
  PhotoGallery,
  Prices,
  Start,
  Windsurfing,
} from './pages';

export const App = () => {
  const { data: loginData } = useLoginStatus();
  const { pathname, search } = useLocation();
  const isFullscreen =
    new URLSearchParams(search).get('fullscreen') === 'true' || false;
  const hideTopBottom =
    pathname === '/fotogalerie' ||
    pathname === '/fotogalerie/edit' ||
    (pathname === '/meteostanice/lipno/graphs' && isFullscreen) ||
    (pathname === '/meteostanice/frymburk/week' && isFullscreen) ||
    (pathname === '/meteostanice/frymburk/year' && isFullscreen) ||
    (pathname === '/meteostanice/frymburk/table' && isFullscreen) ||
    (pathname === '/meteostanice/oldStation/graphs' && isFullscreen) ||
    pathname === '/meteoalarm';

  return (
    <div
      style={{
        maxWidth: `${hideTopBottom ? '100%' : '724px'}`,
        margin: '0 auto',
        fontFamily: `${
          pathname === '/meteoalarm'
            ? 'BenchNine, Arial, Helvetica, sans-serif'
            : 'Verdana, Helvetica, sans-serif'
        }`,
      }}
    >
      <ErrorBoundary fallback={<div>Custom Error Message</div>}>
        {loginData?.isLogged && <TopBedrich />}
        {!hideTopBottom && <Top />}

        <Routes>
          <Route path='/' element={<Start />} />
          <Route path='/apartmany/*' element={<Apartments />} />
          <Route path='/objednavka/*' element={<Booking />} />
          <Route path='/ceny/*' element={<Prices />} />
          <Route path='/kontakt/*' element={<Contact />} />
          <Route path='/frymburk/*' element={<Frymburk />} />
          <Route path='/meteostanice/*' element={<Meteo />} />
          <Route path='/forum/*' element={<Forum />} />
          <Route path='/fotogalerie/*' element={<PhotoGallery />} />
          <Route path='/meteoalarm/*' element={<MeteoAlarm />} />
          <Route path='/kaliste/*' element={<Kaliste />} />
          <Route path='/windsurfing/*' element={<Windsurfing />} />
          <Route path='/bedrich/*' element={<Bedrich />} />
        </Routes>
        {!hideTopBottom && <Bottom />}
      </ErrorBoundary>
    </div>
  );
};
