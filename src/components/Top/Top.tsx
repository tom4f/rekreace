import { NavLink } from 'react-router-dom';
import { GoogleAd } from '../GoogleAd/GoogleAd';
import mainImg from './../../images/main.jpg';
import { Header } from '../Atoms';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const Top = () => {
  const { pathname } = useLocation();

  const [counter, setCounter] = useState(0);

  useEffect(() => setCounter((orig) => orig + 1), [pathname]);

  return (
    <>
      <Header>
        <NavLink to='/'> Start</NavLink> |
        <NavLink to='/apartmany'> Apartmány</NavLink> |
        <NavLink to='/objednavka'> Objednávka</NavLink> |
        <NavLink to='/ceny'> Ceny</NavLink> |
        <NavLink to='/kontakt'> Kontakt</NavLink> |
        <NavLink to='/frymburk'> O Frymburku</NavLink>{' '}
      </Header>

      <div className='text-center w-full'>
        <NavLink to='/'>
          <img
            className='w-full'
            src={mainImg}
            alt='Ubytování u Kučerů ve Frymburku - zima'
          />
        </NavLink>
      </div>

      <Header>
        <NavLink to='/meteostanice'> Meteostanice</NavLink> |
        <NavLink to='/forum'> Fórum</NavLink> |
        <NavLink to='/fotogalerie'> Fotogalerie</NavLink> |
        <NavLink to='/meteoalarm'> MeteoAlarm</NavLink> |
        <NavLink to='/kaliste'> Kaliště</NavLink> |
        <NavLink to='/windsurfing'> Windsurfing</NavLink>{' '}
      </Header>

      <GoogleAd key={counter} counter={counter} />
    </>
  );
};
