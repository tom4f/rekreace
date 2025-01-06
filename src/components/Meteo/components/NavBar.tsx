import { NavLink, Outlet } from 'react-router-dom';
import { CustomNavLinkType } from './TypeDefinition';
import { Header } from '../../Atoms';
import styled from 'styled-components';

const isFullscreen = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('fullscreen') === 'true';
};

const CustomNavLink: CustomNavLinkType = ({ to, header }) => (
  <NavLink
    style={({ isActive }) =>
      isActive ? { backgroundColor: 'gray', color: 'white' } : undefined
    }
    to={to}
  >
    {header}
  </NavLink>
);

export const NavBar = () => (
  <>
    {!isFullscreen() && (
      <>
        <Header>Meteostanice u Kučerů</Header>
        <StyledHeader>
          <CustomNavLink to='/meteostanice/frymburk' header='Meteo Frymburk' />
          <CustomNavLink to='/meteostanice/lipno' header='Meteo Lipno' />
          <CustomNavLink to='/meteostanice/oldStation' header='Meteo původní' />
        </StyledHeader>
      </>
    )}
  </>
);

export const NavBarDavis = () => {
  return (
    <>
      {!isFullscreen() && (
        <StyledHeader>
          <CustomNavLink to='week' header='Týden' />
          <CustomNavLink to='year' header='od roku 2012' />
          <CustomNavLink to='table' header='tabulka' />
          <CustomNavLink to='statistics' header='statistiky' />
        </StyledHeader>
      )}
      <Outlet />
    </>
  );
};

export const NavBarLipno = () => {
  return (
    <>
      {!isFullscreen() && (
        <StyledHeader>
          <CustomNavLink to='graphs' header='grafy od roku 2000' />
          <CustomNavLink to='table' header='tabulka' />
        </StyledHeader>
      )}
      <Outlet />
    </>
  );
};

export const NavBarOldStation = () => {
  return (
    <>
      {!isFullscreen() && (
        <StyledHeader>
          <CustomNavLink to='graphs' header='grafy do roku 2000' />
          <CustomNavLink to='table' header='tabulka' />
        </StyledHeader>
      )}
      <Outlet />
    </>
  );
};

const StyledHeader = styled(Header)`
  display: flex;
  gap: 4px;

  @media screen and (max-width: 500px) {
    flex-wrap: wrap;
  }

  a {
    height: 100%;
    width: 100%;
    text-align: center;
    text-decoration: none;
    background-color: white;
    color: black;

    &:visited {
      color: black;
    }

    a.active {
      background-color: gray;
      color: white;
    }

    &:hover,
    &:active,
    &:focus {
      background-color: gray;
      color: white;
    }
  }
`;
