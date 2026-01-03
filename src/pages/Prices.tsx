import parking from 'images/parking.gif';
import pes from 'images/pes.jpg';
import wiFi from 'images/wi-fi.gif';
import { Header } from 'src/components/Atoms';
import { prices } from 'src/components/Prices';

export const Prices = () => {
  return (
    <>
      <Header>Ceny</Header>
      <div className='text'>
        <table className='max-w-4xl w-full text-center [&_td]:border [&_td]:border-gray-500'>
          <thead>
            <tr>
              <th colSpan={5}>
                cena v Kč / den pro celé apartmá pro rok 2026 :
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>počet osob:</td>
              <td>1</td>
              <td>2</td>
              <td>3</td>
              <td>4</td>
            </tr>
            <tr>
              <td>
                Apartmá <b>č.1</b> - přízemí 35m<sup>2</sup>
              </td>
              <td>{prices.appartement1[1]}</td>
              <td>{prices.appartement1[2]}</td>
              <td>{prices.appartement1[3]}</td>
              <td>-</td>
            </tr>
            <tr>
              <td>
                Apartmá <b>č.2</b> - přízemí 30m<sup>2</sup>
              </td>
              <td>{prices.appartement2[1]}</td>
              <td>{prices.appartement2[2]}</td>
              <td>{prices.appartement2[3]}</td>
              <td>-</td>
            </tr>
            <tr>
              <td>
                Apartmá <b>č.3</b> - podkroví 60m<sup>2</sup>
              </td>
              <td>{prices.appartement3[1]}</td>
              <td>{prices.appartement3[2]}</td>
              <td>{prices.appartement3[3]}</td>
              <td>{prices.appartement3[4]}</td>
            </tr>
            <tr>
              <td colSpan={5}>
                např. pro 3 osoby v apartmá č.2 je cena na osobu{' '}
                <u>
                  <em>
                    <b>{prices.appartement2[3] / 3},-Kč / den</b>
                  </em>
                </u>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <Header>Storno poplatky</Header>
      <div className='text'>
        <table className='max-w-4xl w-full text-center [&_td]:border [&_td]:border-gray-500'>
          <tbody>
            <tr>
              <th colSpan={5}>při zrušení zaplacené rekreace :</th>
            </tr>
            <tr>
              <td>Počet dní před nástupem na rekreaci:</td>
              <td>60-31</td>
              <td>30-15</td>
              <td>14-8</td>
              <td>0-7</td>
            </tr>
            <tr>
              <td>Storno poplatky z celkové ceny pobytu:</td>
              <td>10%</td>
              <td>20%</td>
              <td>30%</td>
              <td>50%</td>
            </tr>
          </tbody>
        </table>
      </div>

      <Header>Další informace</Header>
      <div className='text'>
        <div className='max-w-4xl w-full text-center'>
          Z důvodu bezpečí našich hostů neumožňujeme pobyt domácích zvířat.
          <br />V apartmá č. 2 je třetí lůžko formou rozkládacího křesla.
          <br />
          Každé apartmá se skládá ze dvou samostatných pokojů a koupelny.
          <br />
          Apartmány jsou určeny i pro dlouhodobou rekreaci.
          <br />
          <b>
            V ceně je parkovné v objektu, wi-fi připojení na internet
            <br />a rekreační poplatek pro obec Frymburk.
          </b>
        </div>

        <br />
        <div className='flex justify-center flex-wrap'>
          <img
            src={pes}
            width='100'
            height='100'
            alt='Z důvodu bezpečí našich hostů neumožňujeme pobyt domácích zvířat.'
          />
          <img
            src={wiFi}
            width='121'
            height='100'
            alt='V ceně je wi-fi připojení na internet.'
          />
          <img
            src={parking}
            width='100'
            height='100'
            alt='V ceně je parkování v objektu pro jedno auto.'
          />
        </div>
      </div>
    </>
  );
};
