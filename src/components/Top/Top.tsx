import { NavLink } from 'react-router-dom';
import { GoogleAd } from '../GoogleAd';
import mainImg from './../../images/main.jpg';

export const Top = () => {
  return (
    <>
      <div className='header'>
        <NavLink className='menu' to='/'>
          {' '}
          Start
        </NavLink>{' '}
        |
        <NavLink className='menu' to='/apartmany'>
          {' '}
          Apartmány
        </NavLink>{' '}
        |
        <NavLink className='menu' to='/objednavka'>
          {' '}
          Objednávka
        </NavLink>{' '}
        |
        <NavLink className='menu' to='/ceny'>
          {' '}
          Ceny
        </NavLink>{' '}
        |
        <NavLink className='menu' to='/kontakt'>
          {' '}
          Kontakt
        </NavLink>{' '}
        |
        <NavLink className='menu' to='/frymburk'>
          {' '}
          O Frymburku
        </NavLink>{' '}
      </div>

      <div className='text-center w-full'>
        <NavLink className='menu' to='/'>
          <img
            className='w-full'
            src={mainImg}
            alt='Ubytování u Kučerů ve Frymburku - zima'
          />
        </NavLink>
      </div>

      <div className='header'>
        <NavLink className='menu' to='/meteostanice'>
          {' '}
          Meteostanice
        </NavLink>{' '}
        |
        <NavLink className='menu' to='/forum'>
          {' '}
          Fórum
        </NavLink>{' '}
        |
        <NavLink className='menu' to='/fotogalerie'>
          {' '}
          Fotogalerie
        </NavLink>{' '}
        |
        <NavLink className='menu' to='/meteoalarm'>
          {' '}
          MeteoAlarm
        </NavLink>{' '}
        |
        <NavLink className='menu' to='/kaliste'>
          {' '}
          Kaliště
        </NavLink>{' '}
        |
        <NavLink className='menu' to='/windsurfing'>
          {' '}
          Windsurfing
        </NavLink>{' '}
      </div>

      <GoogleAd />
    </>
  );
};
