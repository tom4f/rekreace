import './css/MeteoBarBig.css';

import { Header } from 'components/Atoms';
import { useGetDavis, useGetLipno } from 'features/meteo';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const MeteoBarBig = () => {
  const { data: davisData, isFetching: isFetchingDavis } = useGetDavis({
    start: 0,
    limit: 1,
    requestType: 'amount',
    orderBy: 'date',
    sort: 'DESC',
    refetchInterval: 10000,
  });
  const { data: pocasiData, isFetching: isFetchingPocasi } = useGetLipno({
    start: 0,
    limit: 1,
    requestType: 'amount',
    orderBy: 'datum',
    sort: 'DESC',
    refetchInterval: 10000,
  });

  if (!davisData?.length || !pocasiData?.length) return null;

  const MeteoTable = () => {
    const {
      // date,
      temp_mean,
      temp_high,
      // temp_high_time,
      temp_low,
      // temp_low_time,
      // heat_deg_days,
      // cool_deg_days,
      rain,
      wind_speed_avg,
      wind_speed_high,
      // wind_speed_high_time,
      // dir,
      wind3,
      wind6,
      wind9,
      // wind12,
      bar_min,
      bar_avg,
      bar_max,
      huminidy_min,
      huminidy_avg,
      huminidy_max,
      // air_density_min,
      // air_density_avg,
      // air_density_max,
      rain_rate_max,
    } = davisData[0];

    const {
      //id, datum, cas,
      hladina,
      pritok,
      odtok,
      //vzduch,
      voda,
    } = pocasiData[0];

    return (
      <section className='happyMeteo'>
        <fieldset>
          <legend>Vítr</legend>
          <section>
            <header>
              &gt;3 m/s
              <p />
              &gt;6 m/s
              <p />
              &gt;9 m/s
              <p />
              avg
              <p />
              max
            </header>
            <article>
              {wind3} min
              <p />
              {wind6} min
              <p />
              {wind9} min
              <p />
              {wind_speed_avg} m/s
              <p />
              {wind_speed_high} m/s
            </article>
          </section>
        </fieldset>
        <fieldset>
          <legend>Teplota</legend>
          <section>
            <header>
              min
              <p />
              avg
              <p />
              max
            </header>
            <article>
              {temp_low} &deg;C
              <p />
              {temp_mean} &deg;C
              <p />
              {temp_high} &deg;C
            </article>
          </section>
        </fieldset>
        <fieldset>
          <legend>Tlak</legend>
          <section>
            <header>
              min
              <p />
              avg
              <p />
              max
            </header>
            <article>
              {bar_min} hPa
              <p />
              {bar_avg} hPa
              <p />
              {bar_max} hPa
            </article>
          </section>
        </fieldset>
        <fieldset>
          <legend>Rel. vlhkost</legend>
          <section>
            <header>
              min
              <p />
              avg
              <p />
              max
            </header>
            <article>
              {huminidy_min} %
              <p />
              {huminidy_avg} %
              <p />
              {huminidy_max} %
            </article>
          </section>
        </fieldset>
        <fieldset>
          <legend>Srážky</legend>
          <section>
            <header>
              celk
              <p />
              max
            </header>
            <article>
              {rain} mm
              <p />
              {rain_rate_max} mm/h
            </article>
          </section>
        </fieldset>
        <fieldset>
          <legend>Voda na Lipně</legend>
          <section>
            <header>
              teplota
              <p />
              přítok
              <p />
              odtok
              <p />
              hladina
            </header>
            <article>
              {voda} &deg;C
              <p />
              {pritok} m3
              <p />
              {odtok} m3
              <p />
              {hladina} m n.m.
            </article>
          </section>
        </fieldset>
      </section>
    );
  };

  return (
    <>
      <Header>
        <Link to='/meteostanice'>
          <FadeInText $isFetching={isFetchingDavis || isFetchingPocasi}>
            METEOSTANICE dnes
          </FadeInText>
        </Link>
      </Header>
      {MeteoTable()}
    </>
  );
};

const FadeInText = styled.span<{ $isFetching: boolean }>`
  animation: ${({ $isFetching }) => ($isFetching ? 'fadeOut 2s' : 'fadeIn 2s')};

  @keyframes fadeIn {
    0% {
      color: lime;
    }
    100% {
      color: white;
    }
  }

  @keyframes fadeOut {
    0% {
      color: white;
    }
    100% {
      color: lime;
    }
  }
`;
