import { Forum } from 'components/Start/Forum/Forum';
import { PhotoGallery } from 'pages/PhotoGallery';
import { NavLink } from 'react-router-dom';

export const Kaliste = () => {
  return (
    <>
      <div className='header'>
        <b>Kopec Kaliště 993 m n.m. - tip na procházku</b>
      </div>
      <iframe
        title='Kaliště'
        style={{ border: 0, marginBottom: '-6px' }}
        src='https://frame.mapy.cz/s/guvuzapuze'
        width='100%'
        height='400px'
      ></iframe>
      <div className='header'>
        <NavLink className='menu' to='/forum?category=8'>
          FÓRUM + vložit nový příspěvek...
        </NavLink>
      </div>
      <Forum showHeader={false} searchCriteria='WHERE typ = 8' />
      <PhotoGallery category={11} />
    </>
  );
};
