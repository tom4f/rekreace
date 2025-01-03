import { NavLink, Outlet } from 'react-router-dom';
import navBarStyle from './../css/NavBar.module.css';
import { CustomNavLinkType } from './TypeDefinition';

const CustomNavLink: CustomNavLinkType = ({ to, header }) => {
  const activeStyle = (navData: { isActive: boolean }) =>
    navData.isActive ? navBarStyle.active : '';
  return (
    <NavLink className={(navData) => activeStyle(navData)} to={to}>
      {header}
    </NavLink>
  );
};

export const NavBar = () => {
  const urlParams = new URLSearchParams(new URL(document.URL).search);
  const isFullscreen = () => urlParams.get('fullscreen') === 'true' || false;
  return (
    <>
      {isFullscreen() ? null : (
        <header className={navBarStyle.header}>
          <nav>
            <CustomNavLink
              to='/meteostanice/frymburk'
              header='Meteo Frymburk'
            />
            <CustomNavLink to='/meteostanice/lipno' header='Meteo Lipno' />
            <CustomNavLink
              to='/meteostanice/oldStation'
              header='Meteo původní'
            />
          </nav>
        </header>
      )}
    </>
  );
};

export const NavBarDavis = () => {
  const urlParams = new URLSearchParams(new URL(document.URL).search);
  const isFullscreen = () => urlParams.get('fullscreen') === 'true' || false;
  return (
    <>
      {isFullscreen() ? null : (
        <header className={navBarStyle.header}>
          <nav>
            <CustomNavLink to='week' header='Týden' />
            <CustomNavLink to='year' header='od roku 2012' />
            <CustomNavLink to='table' header='tabulka' />
            <CustomNavLink to='statistics' header='statistiky' />
          </nav>
        </header>
      )}
      <Outlet />
    </>
  );
};

export const NavBarLipno = () => {
  const urlParams = new URLSearchParams(new URL(document.URL).search);
  const isFullscreen = () => urlParams.get('fullscreen') === 'true' || false;
  return (
    <>
      {isFullscreen() ? null : (
        <header className={navBarStyle.header}>
          <nav>
            <CustomNavLink to='graphs' header='grafy od roku 2000' />
            <CustomNavLink to='table' header='tabulka' />
          </nav>
        </header>
      )}
      <Outlet />
    </>
  );
};

export const NavBarOldStation = () => {
  const urlParams = new URLSearchParams(new URL(document.URL).search);
  const isFullscreen = () => urlParams.get('fullscreen') === 'true' || false;
  return (
    <>
      {isFullscreen() ? null : (
        <header className={navBarStyle.header}>
          <nav>
            <CustomNavLink to='graphs' header='grafy do roku 2000' />
            <CustomNavLink to='table' header='tabulka' />
          </nav>
        </header>
      )}
      <Outlet />
    </>
  );
};
