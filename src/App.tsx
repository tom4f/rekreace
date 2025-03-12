import './css/main.css';

import { useLoginStatus } from 'features/login/hooks';
import React, { Suspense } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import { Bottom } from './components/Bottom/Bottom';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { Top } from './components/Top/Top';
import { TopBedrich } from './components/Top/TopBedrich';

type PagesModule = {
  [key: string]: React.FC;
};

const lazyImport = (componentName: string) => {
  return React.lazy(() =>
    import('pages').then((module) => ({
      default: (module as PagesModule)[componentName],
    }))
  );
};

const Start = lazyImport('Start');
const Apartments = lazyImport('Apartments');
const Booking = lazyImport('Booking');
const Contact = lazyImport('Contact');
const Forum = lazyImport('Forum');
const Frymburk = lazyImport('Frymburk');
const Kaliste = lazyImport('Kaliste');
const Meteo = lazyImport('Meteo');
const MeteoAlarm = lazyImport('MeteoAlarm');
const PhotoGallery = lazyImport('PhotoGallery');
const Prices = lazyImport('Prices');
const Windsurfing = lazyImport('Windsurfing');
const Bedrich = lazyImport('Bedrich');

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
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path='/' element={<Start />} />
            <Route path='/apartmany' element={<Apartments />} />
            <Route path='/objednavka/*' element={<Booking />} />
            <Route path='/ceny' element={<Prices />} />
            <Route path='/kontakt' element={<Contact />} />
            <Route path='/frymburk' element={<Frymburk />} />
            <Route path='/meteostanice/*' element={<Meteo />} />
            <Route path='/forum' element={<Forum />} />
            <Route path='/fotogalerie/*' element={<PhotoGallery />} />
            <Route path='/meteoalarm' element={<MeteoAlarm />} />
            <Route path='/kaliste' element={<Kaliste />} />
            <Route path='/windsurfing' element={<Windsurfing />} />
            <Route path='/bedrich' element={<Bedrich />} />
          </Routes>
        </Suspense>
        {!hideTopBottom && <Bottom />}
      </ErrorBoundary>
    </div>
  );
};
