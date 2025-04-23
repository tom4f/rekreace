import { Forum } from 'components/Start/Forum/Forum';
import { PhotoGallery } from 'pages/PhotoGallery';
import { NavLink } from 'react-router-dom';
import { Header } from 'src/components/Atoms';

export const Kaliste = () => {
  return (
    <>
      <Header>Kopec Kaliště 993 m n.m. - tip na procházku</Header>
      <iframe
        title='Kaliště'
        style={{ border: 0, marginBottom: '-6px' }}
        src='https://frame.mapy.cz/s/guvuzapuze'
        width='100%'
        height='400px'
      ></iframe>
      <Header>
        <NavLink className='menu' to='/forum?typ=4'>
          FÓRUM + vložit nový příspěvek...
        </NavLink>
      </Header>
      <Forum showHeader={false} searchCriteria='WHERE typ = 4' />
      <PhotoGallery category={11} />
    </>
  );
};
