import { Header } from 'components/Atoms';
import { GoogleAd } from 'components/GoogleAd/GoogleAd';
import { CustomNavLinkType } from 'components/Meteo';
import mainImg from 'images/main.jpg';
import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

export const Top = () => {
  const { pathname } = useLocation();
  console.log(pathname);
  const [counter, setCounter] = useState(0);

  useEffect(
    () => setCounter((orig) => (pathname !== '/' ? orig + 1 : orig)),
    [pathname]
  );

  const CustomNavLink: CustomNavLinkType = ({ to, header }) => (
    <NavLink className={({ isActive }) => (isActive ? 'bg-black' : '')} to={to}>
      {header}
    </NavLink>
  );

  return (
    <>
      <Header className='flex flex-wrap justify-center [&>*]:px-2'>
        <CustomNavLink to='/' header='Start' />
        <CustomNavLink to='/apartmany' header='Apartmány' />
        <CustomNavLink to='/objednavka' header='Objednávka' />
        <CustomNavLink to='/ceny' header='Ceny' />
        <CustomNavLink to='/kontakt' header='Kontakt' />
        <CustomNavLink to='/frymburk' header='O Frymburku' />{' '}
      </Header>

      <div className='text-center w-full'>
        <Link to='/'>
          <img
            className='w-full'
            src={mainImg}
            alt='Ubytování u Kučerů ve Frymburku'
          />
        </Link>
      </div>

      <Header className='flex flex-wrap justify-center [&>*]:px-2'>
        <CustomNavLink to='/meteostanice' header='Meteostanice' />
        <CustomNavLink to='/forum' header='Fórum' />
        <CustomNavLink to='/fotogalerie' header='Fotogalerie' />
        <CustomNavLink to='/meteoalarm' header='MeteoAlarm' />
        <CustomNavLink to='/kaliste' header='Kaliště' />
        <CustomNavLink to='/windsurfing' header='Windsurfing' />{' '}
      </Header>

      <GoogleAd key={counter} counter={counter} />
    </>
  );
};
