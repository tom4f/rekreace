import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./css/MeteoBarBig.css";
import { Url } from "../../../api/paths";

type DavisType = {
  date: string;
  temp_mean: string;
  temp_high: string;
  temp_high_time: string;
  temp_low: string;
  temp_low_time: string;
  heat_deg_days: string;
  cool_deg_days: string;
  rain: string;
  wind_speed_avg: string;
  wind_speed_high: string;
  wind_speed_high_time: string;
  dir: string;
  wind3: number;
  wind6: number;
  wind9: number;
  wind12: number;
  bar_min: string;
  bar_avg: string;
  bar_max: string;
  huminidy_min: string;
  huminidy_avg: string;
  huminidy_max: string;
  air_density_min: string;
  air_density_avg: string;
  air_density_max: string;
  rain_rate_max: string;
};

type PocasiType = {
  id: number;
  datum: string;
  cas: null;
  hladina: string;
  pritok: string;
  odtok: string;
  vzduch: string;
  voda: string;
  pocasi: string;
};

export const MeteoBarBig = () => {
  const [meteoData, setMeteoData] = useState<[DavisType, PocasiType]>();

  const meteoTable = ([davisData, pocasiData]: [DavisType, PocasiType]) => {
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

    const {
      //id, datum, cas,
      hladina,
      pritok,
      odtok,
      //vzduch,
      voda,
    } = pocasiData;

    if (!meteoData) return <></>;

    return (
      <section className="happyMeteo">
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

  const fetchAllMeteo = async () => {
    const urlList = [
      `${Url.API}/pdo_read_davis.php`,
      `${Url.API}/pdo_read_pocasi.php`,
    ];

    const fetchList = urlList.map((url) =>
      fetch(`${url}`).then((response) => response.json())
    );

    const [davisData, damData] = await Promise.all(fetchList);

    setMeteoData([davisData[0], damData[0]]);
  };

  useEffect(() => {
    fetchAllMeteo();
    const timer = setInterval(() => fetchAllMeteo(), 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div className="header">
        <NavLink className="menu" to="/meteostanice">
          METEOSTANICE dnes
        </NavLink>
      </div>
      {meteoData && meteoTable(meteoData)}
    </>
  );
};
