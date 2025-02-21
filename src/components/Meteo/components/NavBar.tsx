import { Header } from 'components/Atoms';
import { MeteoNavLink } from 'components/Atoms/CustomNavLink/CustomNavLink';
import { useIsFullscreen } from 'features/meteo';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

export const NavBar = () => {
  const isFullscreen = useIsFullscreen();

  if (isFullscreen) return null;

  return (
    <>
      <Header>Meteostanice u Kučerů</Header>
      <StyledHeader>
        <MeteoNavLink to='/meteostanice/frymburk' header='Meteo Frymburk' />
        <MeteoNavLink to='/meteostanice/lipno' header='Meteo Lipno' />
        <MeteoNavLink to='/meteostanice/oldStation' header='Meteo původní' />
      </StyledHeader>
    </>
  );
};

export const NavBarDavis = () => {
  const isFullscreen = useIsFullscreen();

  if (isFullscreen) return <Outlet />;

  return (
    <>
      <StyledHeader>
        <MeteoNavLink to='week' header='Týden' />
        <MeteoNavLink to='year' header='od roku 2012' />
        <MeteoNavLink to='table' header='tabulka' />
        <MeteoNavLink to='statistics' header='statistiky' />
      </StyledHeader>
      <Outlet />
    </>
  );
};

export const NavBarLipno = () => {
  const isFullscreen = useIsFullscreen();

  if (isFullscreen) return <Outlet />;

  return (
    <>
      <StyledHeader>
        <MeteoNavLink to='graphs' header='grafy od roku 2000' />
        <MeteoNavLink to='table' header='tabulka' />
      </StyledHeader>
      <Outlet />
    </>
  );
};

export const NavBarOldStation = () => {
  const isFullscreen = useIsFullscreen();

  if (isFullscreen) return <Outlet />;

  return (
    <>
      <StyledHeader>
        <MeteoNavLink to='graphs' header='grafy do roku 2000' />
        <MeteoNavLink to='table' header='tabulka' />
      </StyledHeader>
      <Outlet />
    </>
  );
};

const StyledHeader = styled(Header)`
  display: flex;
  gap: 4px;
  background: black;

  @media screen and (max-width: 500px) {
    flex-wrap: wrap;
  }

  a {
    width: 100%;
    color: black;
    background: white;

    &:hover {
      background-color: #555555 !important;
      color: white;
    }
  }
`;
