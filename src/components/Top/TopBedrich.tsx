import { CustomNavLink, Header } from 'components/Atoms';

export const TopBedrich = () => {
  return (
    <Header className='flex flex-wrap justify-center [&>*]:px-2 !bg-amber-600'>
      <CustomNavLink to='/objednavka/edit-orders' header='Objednávky' />
      <CustomNavLink to='/fotogalerie/edit' header='Fotogalerie' />
      <CustomNavLink to='/objednavka/edit' header='Obsazenost' />
      <CustomNavLink to='/meteostanice/lipno/edit' header='MeteoData' />
      <CustomNavLink to='/bedrich' header='Bedřich' />{' '}
    </Header>
  );
};
