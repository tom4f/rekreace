import { NavLink } from 'react-router-dom';

export const TopBedrich = () => {
  return (
    <div className='header' style={{ backgroundColor: 'red' }}>
      Editace:{' '}
      <NavLink className='menu' to='/fotogalerie/edit'>
        {' '}
        Fotogalerie
      </NavLink>{' '}
      |
      <NavLink className='menu' to='/objednavka/edit'>
        {' '}
        Obsazenost
      </NavLink>{' '}
      |
      <NavLink className='menu' to='/meteostanice/lipno/edit'>
        {' '}
        MeteoData
      </NavLink>{' '}
      |
      <NavLink className='menu' to='/meteostanice/lipno/edit'>
        {' '}
        odhlásit
      </NavLink>{' '}
    </div>
  );
};
