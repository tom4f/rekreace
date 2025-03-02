import { DavisItem } from 'features/meteo';
import styled from 'styled-components';

export const DavisMeteoBar = ({ davisData }: { davisData: DavisItem }) => {
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
  } = davisData;

  return (
    <>
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
    </>
  );
};

export const Fieldset = styled.fieldset`
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
