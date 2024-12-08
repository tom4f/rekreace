import { NavLink, useLocation } from 'react-router-dom';

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
    <header id='detail_graphs' className='header'>
      <NavLink className='menu' to={toggleFullscreen}>
        HISTORIE - dynamické grafy - {toggleText}&nbsp;
        <i className={toggleClassName}></i>
      </NavLink>
    </header>
  );
};
