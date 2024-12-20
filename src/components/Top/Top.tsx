import { NavLink } from 'react-router-dom';
import { GoogleAd } from '../GoogleAd';
import mainImg from './../../images/main.jpg';
import { Header } from '../Atoms';

export const Top = () => {
  return (
    <>
      <Header>
        <NavLink to='/'> Start</NavLink> |
        <NavLink to='/apartmany'> Apartmány</NavLink>|
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

      <GoogleAd />
    </>
  );
};
