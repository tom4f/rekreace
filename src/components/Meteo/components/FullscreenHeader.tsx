import { NavLink, useLocation } from 'react-router-dom';
import { Header } from 'src/components/Atoms';

export const FullscreenHeader = () => {
  const { search } = useLocation();
  const isFullscreen =
    new URLSearchParams(search).get('fullscreen') === 'true' || false;

  const toggleFullscreen = isFullscreen
    ? '?fullscreen=false'
    : '?fullscreen=true';

  const toggleText = isFullscreen ? 'návrat zpět' : 'na celou obrazovku';

  const toggleClassName = isFullscreen
    ? 'fas fa-compress-arrows-alt'
    : 'fas fa-expand-arrows-alt';
  return (
    <Header id='detail_graphs'>
      <NavLink className='menu' to={toggleFullscreen}>
        HISTORIE - dynamické grafy - {toggleText}&nbsp;
        <i className={toggleClassName}></i>
      </NavLink>
    </Header>
  );
};
