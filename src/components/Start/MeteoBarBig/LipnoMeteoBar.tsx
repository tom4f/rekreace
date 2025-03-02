import { LipnoItem } from 'features/meteo';
import { getDateParts } from 'utils';

import { Fieldset } from './DavisMeteoBar';

export const LipnoMeteoBar = ({ lipnoData }: { lipnoData: LipnoItem }) => {
  const lipnoLatestDateParts =
    lipnoData && getDateParts(new Date(lipnoData.datum));

  return (
    <>
      <Fieldset>
        <legend>
          Voda na Lipně{' '}
          {lipnoLatestDateParts && (
            <span>{`${lipnoLatestDateParts.day}.${lipnoLatestDateParts.month}.`}</span>
          )}
        </legend>
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
            {lipnoData.voda} &deg;C
            <p />
            {lipnoData.pritok} m3
            <p />
            {lipnoData.odtok} m3
            <p />
            {lipnoData.hladina} m n.m.
          </article>
        </section>
      </Fieldset>
    </>
  );
};
