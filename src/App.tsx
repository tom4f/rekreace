import { Route, Routes, useLocation } from 'react-router-dom';
import { Apartments } from './components/Apartments';
import { BookingForm } from './components/BookingForm/BookingForm';
import { Bottom } from './components/Bottom/Bottom';
import { Contact } from './components/Contact/Contact';
import { Forum } from './pages/Forum';
import { Frymburk } from './components/Frymburk/Frymburk';
import { Kaliste } from './components/Kaliste/Kaliste';
import { Meteo } from './components/Meteo';
import { MeteoAlarm } from './components/MeteoAlarm/MeteoAlarm';
import { PhotoGallery } from './components/PhotoGallery/PhotoGallery';
import { Prices } from './components/Prices/Prices';
import { Start } from './components/Start/Start';
import { Top } from './components/Top/Top';
import { Windsurfing } from './components/Windsurfing/Windsurfing';
import { Bedrich } from './components/Bedrich/Bedrich';
import './css/main.css';
import { TopBedrich } from './components/Top/TopBedrich';
import { useLoginStatus } from './features/login/hooks/useGetLoginStatus';
import { MockDevTools } from './components/MockDevTools';
import { APP_MOCKS, ENV_MODE } from './env';

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
        fontFamily: `${
          pathname === '/meteoalarm'
            ? 'BenchNine, Arial, Helvetica, sans-serif'
            : 'Verdana, Helvetica, sans-serif'
        }`,
      }}
    >
      <div
        style={{
          maxWidth: `${hideTopBottom ? '100%' : '724px'}`,
        }}
      >
        {loginData?.isLogged && <TopBedrich />}
        {!hideTopBottom && <Top />}
        {ENV_MODE !== 'production' && APP_MOCKS && <MockDevTools />}
        <Routes>
          <Route path='/' element={<Start />} />
          <Route path='/apartmany/*' element={<Apartments />} />
          <Route path='/objednavka/*' element={<BookingForm />} />
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
      </div>
    </div>
  );
};
