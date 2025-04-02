import './css/main.css';

import styled from '@emotion/styled';
import React, { Suspense } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import { ProtectedRoute } from './components/Atoms';
import { Bottom } from './components/Bottom/Bottom';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { GlobalModal } from './components/Modal';
import { Top, TopBedrich } from './components/Top';
import { useFullscreen } from './features/meteo';
import { useAuthStore } from './store';

const lazyImport = (componentName: string) => {
  return React.lazy(() =>
    import('pages').then((module) => ({
      default: (module as { [key: string]: React.FC })[componentName],
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
const Orders = lazyImport('Orders');
const Order = lazyImport('Order');

export const App = () => {
  const isLogged = useAuthStore().isLogged;
  const pathname = useLocation().pathname;
  const isFullscreen = useFullscreen().isFullscreen;

  return (
    <AppContainer isFullscreen={isFullscreen} pathname={pathname}>
      <ErrorBoundary fallback={<div>Custom Error Message</div>}>
        {isLogged && <TopBedrich />}
        {!isFullscreen && <Top />}
        <Suspense
          fallback={<div style={{ color: 'white' }}>Loading index...</div>}
        >
          <Routes>
            <Route path='/' element={<Start />} />
            <Route path='/apartmany' element={<Apartments />} />
            <Route path='/objednavka' element={<Booking />} />
            <Route path='/ceny' element={<Prices />} />
            <Route path='/kontakt' element={<Contact />} />
            <Route path='/frymburk' element={<Frymburk />} />
            <Route path='/meteostanice/*' element={<Meteo />} />
            <Route path='/forum' element={<Forum />} />
            <Route path='/fotogalerie' element={<PhotoGallery />} />
            <Route path='/meteoalarm' element={<MeteoAlarm />} />
            <Route path='/kaliste' element={<Kaliste />} />
            <Route path='/windsurfing' element={<Windsurfing />} />
            <Route path='/bedrich' element={<Bedrich />} />
            <Route element={<ProtectedRoute />}>
              <Route path='/fotogalerie/edit' element={<PhotoGallery />} />
              <Route path='/objednavka/edit' element={<Booking />} />
              <Route path='/orders' element={<Orders />}>
                <Route path=':id' element={<Order />} />
              </Route>
            </Route>
          </Routes>
          <GlobalModal />
        </Suspense>
        {!isFullscreen && <Bottom />}
      </ErrorBoundary>
    </AppContainer>
  );
};

const AppContainer = styled.div<{ isFullscreen: boolean; pathname: string }>`
  max-width: ${(props) => (props.isFullscreen ? '100%' : '724px')};
  margin: 0 auto;
  font-family: ${(props) =>
    props.pathname === '/meteoalarm'
      ? 'BenchNine, Arial, Helvetica, sans-serif'
      : 'Verdana, Helvetica, sans-serif'};
`;
