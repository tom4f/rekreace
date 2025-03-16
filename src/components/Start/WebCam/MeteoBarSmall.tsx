import styled from '@emotion/styled';
import { MeteoFilesEnum, useGetTextFile } from 'features/meteo';
import { useEffect, useRef, useState } from 'react';
import { useWebCamStore } from 'store';

export const MeteoBarSmall = () => {
  const {
    webCam: { state },
  } = useWebCamStore();

  const [cssTransitionOut, setCssTransitionOut] = useState(true);

  const {
    data: meteoText,
    error,
    isLoading,
  } = useGetTextFile(MeteoFilesEnum.LIPNONET_METEO, 10000);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (meteoText) {
      setCssTransitionOut(true);
      timeoutRef.current = setTimeout(() => setCssTransitionOut(false), 2000);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [meteoText]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching the text file: {error.message}</div>;
  if (state !== 'live' || !meteoText) return null;

  const [, date, time, temp, huminidy, presure, wind, , , dewPoint, windChill] =
    meteoText.split('|');

  return (
    <FieldSetWrapper $cssTransitionOut={cssTransitionOut}>
      <fieldset>
        <legend>{date.padStart(8, '0').slice(0, 6)}</legend>
        {time}
      </fieldset>
      <fieldset>
        <legend>Teplota</legend>
        {temp}&deg;C
      </fieldset>
      <fieldset>
        <legend>Vlhkost</legend>
        {huminidy}%
      </fieldset>
      <fieldset>
        <legend>Tlak</legend>
        {presure}hPa
      </fieldset>
      <fieldset>
        <legend>Vítr</legend>
        {wind}m/s
      </fieldset>
      <fieldset>
        <legend>Ros. bod</legend>
        {dewPoint}&deg;C
      </fieldset>
      <fieldset>
        <legend>Pocit.tep.</legend>
        {windChill}&deg;C
      </fieldset>
    </FieldSetWrapper>
  );
};

const FieldSetWrapper = styled.div<{ $cssTransitionOut: boolean }>`
  position: absolute;
  max-width: 724px;
  background-color: rgba(0, 0, 0, 0.4);
  left: 185px;
  transition: bottom 2s, color 2s, transform 2s;
  white-space: nowrap;
  border-radius: 8px;
  padding: 0px 5px;

  bottom: ${({ $cssTransitionOut }) => ($cssTransitionOut ? '100px' : '60px')};
  color: ${({ $cssTransitionOut }) =>
    $cssTransitionOut ? 'transparent' : 'white'};
  transform: ${({ $cssTransitionOut }) =>
    $cssTransitionOut ? 'rotate(180deg)' : 'translate(-50%, -50%)'};

  fieldset {
    font-size: 10px;
    display: inline;
    padding: 1px 3px;
    margin-right: 1px;
    border: 2px solid green;
    border-radius: 8px;
  }
`;
