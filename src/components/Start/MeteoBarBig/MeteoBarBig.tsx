import { Header } from 'components/Atoms';
import { useGetDavis, useGetLipno } from 'features/meteo';
import { Link } from 'react-router-dom';
import { useWebCamStore } from 'store';
import styled from 'styled-components';
import { getDateParts } from 'utils';

export const MeteoBarBig = () => {
  const {
    webCam: { day: webCamDay, month: webCamMonth },
  } = useWebCamStore();

  const sliderToDavisDate = `${new Date().getFullYear()}-${webCamMonth}-${webCamDay}`;

  const { data: davisData, isFetching: isFetchingDavis } = useGetDavis({
    startDate: sliderToDavisDate,
    endDate: sliderToDavisDate,
    requestType: 'date',
    orderBy: 'date',
    sort: 'DESC',
    refetchInterval: 10000,
  });
  const { data: pocasiData, isFetching: isFetchingPocasi } = useGetLipno({
    startDate: sliderToDavisDate,
    endDate: sliderToDavisDate,
    requestType: 'date',
    orderBy: 'datum',
    sort: 'DESC',
    refetchInterval: 10000,
  });

  if (!davisData?.length || !pocasiData?.length)
    return <div style={{ color: 'white' }}>Loading...</div>;

  const {
    date: davisDate,
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

  const MeteoTable = () => {
    return (
      <MainSection>
        <Fieldset>
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
        </Fieldset>
        <Fieldset>
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
        </Fieldset>
        <Fieldset>
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
        </Fieldset>
        <Fieldset>
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
        </Fieldset>
        <Fieldset>
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
        </Fieldset>
        <Fieldset>
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
        </Fieldset>
      </MainSection>
    );
  };

  if (!davisDate) return <div style={{ color: 'white' }}>Loading...</div>;

  const { day, month, year } = getDateParts(new Date(davisDate));

  return (
    <>
      <Header>
        <Link to='/meteostanice'>
          <FadeInText $isFetching={isFetchingDavis || isFetchingPocasi}>
            METEOSTANICE {day}.{month}.{year}
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

const MainSection = styled.section`
  color: white;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
`;

const Fieldset = styled.fieldset`
  margin: 3px;
  padding: 3px;
  font-size: 0.7rem;
  border: 2px solid green;
  border-radius: 8px;

  section {
    display: flex;
    width: auto;
  }

  section header {
    text-align: right;
    padding-right: 3px;
    border-right: 1px dotted #00b300;
  }

  section article {
    text-align: left;
    padding-left: 3px;
  }
`;
