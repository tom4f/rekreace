import { useEffect, useState } from "react";
import "./css/MeteoBarSmall.css";
import { Url } from "../../../api/paths";

export const MeteoBarSmall = () => {
  const [meteoText, setMetoText] = useState("");
  const [cssTransitionOut, setCssTransitionOut] = useState(
    "meteo_box_transition_out"
  );

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
      dir,
      ,
      dewPoint,
      windChill,
    ] = meteoText.split("|");

    return (
      <>
        <fieldset className="meteo_value">
          <legend>{("0" + date).slice(-8).slice(0, 6)}</legend>
          {time}
        </fieldset>
        <fieldset className="meteo_value">
          <legend>Teplota</legend>
          {temp}&deg;C
        </fieldset>
        <fieldset className="meteo_value">
          <legend>Vlhkost</legend>
          {huminidy}%
        </fieldset>
        <fieldset className="meteo_value">
          <legend>Tlak</legend>
          {presure}hPa
        </fieldset>
        <fieldset className="meteo_value">
          <legend>Vítr</legend>
          {wind}m/s
        </fieldset>
        <fieldset className="meteo_value">
          <legend>Směr</legend>
          {dir}&deg;
        </fieldset>
        <fieldset className="meteo_value">
          <legend>Ros. bod</legend>
          {dewPoint}&deg;C
        </fieldset>
        <fieldset className="meteo_value">
          <legend>Pocit.tep.</legend>
          {windChill}&deg;C
        </fieldset>
      </>
    );
  };

  const asyncFunction = async () => {
    try {
      const response = await fetch(`${Url.DAVIS}/lipnonet_meteo.txt`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const text = await response.text();

      setMetoText((old) => {
        if (old !== text) {
          setCssTransitionOut("meteo_box_transition_out");
          //setTimeout( () => setCssTransitionOut(''), 2000 )
        }
        return text;
      });
    } catch (error) {
      console.error("Error fetching the text file:", error);
    }
  };

  useEffect(() => {
    asyncFunction();
    const timer = setInterval(() => asyncFunction(), 10000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => setCssTransitionOut(""), 2000);
    return () => clearTimeout(timeout);
  }, [cssTransitionOut]);

  return (
    <div className={`meteo_box ${cssTransitionOut}`}>{meteoBox(meteoText)}</div>
  );
};
