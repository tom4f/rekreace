import { StyledAddress } from 'components/Contact/css/Contact.style';

export const ContactInfo = () => {
  return (
    <StyledAddress>
      <div>
        Adresa :
        <br />
        <b>Ubytování U Kučerů</b>
        <br />
        <b>Frymburk 73</b>
        <br />
        <b>382 79</b>
      </div>
      <div>
        Internet :
        <br />
        <b>
          <a href='https://www.frymburk.com'>www.frymburk.com</a>
        </b>
        <br />
        E-mail :
        <br />
        <b>
          <a href='mailto:ubytovani@lipnonet.cz'>ubytovani@lipnonet.cz</a>
        </b>
      </div>
      <div>
        Telefon :
        <br />
        <b>+420-602496115</b>
        <br />
        Mobil :
        <br />
        <b>+420-724870561</b>
      </div>
    </StyledAddress>
  );
};
