import './css/MeteoBarSmall.css';

import { MeteoFiles, useGetTextFile } from 'features/meteo';
import { useEffect, useState } from 'react';
import { useWebCamStore } from 'store';

export const MeteoBarSmall = () => {
  const {
    webCam: { state },
  } = useWebCamStore();

  const [cssTransitionOut, setCssTransitionOut] = useState(
    'meteo_box_transition_out'
  );

  const {
    data: meteoText,
    error,
    isLoading,
  } = useGetTextFile(MeteoFiles.LIPNONET_METEO, 10000);

  useEffect(() => {
    if (meteoText) {
      setCssTransitionOut('meteo_box_transition_out');
      setTimeout(() => setCssTransitionOut(''), 2000);
    }
  }, [meteoText]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching the text file: {error.message}</div>;
  }

  if (state !== 'live') {
    return null;
  }

  const meteoBox = (meteoText: string) => {
    if (!meteoText) return;

    const [
      ,
      date,
      time,
      temp,
      huminidy,
      presure,
      wind,
      ,
      ,
      dewPoint,
      windChill,
    ] = meteoText.split('|');

    return (
      <>
        <fieldset className='meteo_value'>
          <legend>{('0' + date).slice(-8).slice(0, 6)}</legend>
          {time}
        </fieldset>
        <fieldset className='meteo_value'>
          <legend>Teplota</legend>
          {temp}&deg;C
        </fieldset>
        <fieldset className='meteo_value'>
          <legend>Vlhkost</legend>
          {huminidy}%
        </fieldset>
        <fieldset className='meteo_value'>
          <legend>Tlak</legend>
          {presure}hPa
        </fieldset>
        <fieldset className='meteo_value'>
          <legend>Vítr</legend>
          {wind}m/s
        </fieldset>
        {/*         <fieldset className='meteo_value'>
          <legend>Směr</legend>
          {dir}&deg;
        </fieldset> */}
        <fieldset className='meteo_value'>
          <legend>Ros. bod</legend>
          {dewPoint}&deg;C
        </fieldset>
        <fieldset className='meteo_value'>
          <legend>Pocit.tep.</legend>
          {windChill}&deg;C
        </fieldset>
      </>
    );
  };

  return (
    <div className={`meteo_box ${cssTransitionOut}`}>
      {meteoText ? meteoBox(meteoText) : null}
    </div>
  );
};
