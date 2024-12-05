import { NavLink } from "react-router-dom";
import g1 from "./../../images/g1.jpg";
import g11 from "./../../images/g11.jpg";
import g11b from "./../../images/g11b.jpg";
import g12 from "./../../images/g12.jpg";
import g12b from "./../../images/g12b.jpg";
import g13 from "./../../images/g13.jpg";
import g13b from "./../../images/g13b.jpg";
import g16 from "./../../images/g16.jpg";
import g16b from "./../../images/g16b.jpg";
import g1b from "./../../images/g1b.jpg";
import g2 from "./../../images/g2.jpg";
import g21 from "./../../images/g21.jpg";
import g21b from "./../../images/g21b.jpg";
import g22 from "./../../images/g22.jpg";
import g22b from "./../../images/g22b.jpg";
import g23 from "./../../images/g23.jpg";
import g23b from "./../../images/g23b.jpg";
import g29 from "./../../images/g29.jpg";
import g29b from "./../../images/g29b.jpg";
import g2b from "./../../images/g2b.jpg";
import g3 from "./../../images/g3.jpg";
import g31 from "./../../images/g31.jpg";
import g31b from "./../../images/g31b.jpg";
import g32 from "./../../images/g32.jpg";
import g32b from "./../../images/g32b.jpg";
import g33 from "./../../images/g33.jpg";
import g33b from "./../../images/g33b.jpg";
import g34 from "./../../images/g34.jpg";
import g34b from "./../../images/g34b.jpg";
import g35 from "./../../images/g35.jpg";
import g35b from "./../../images/g35b.jpg";
import g36 from "./../../images/g36.jpg";
import g36b from "./../../images/g36b.jpg";
import g37 from "./../../images/g37.jpg";
import g37b from "./../../images/g37b.jpg";
import g3b from "./../../images/g3b.jpg";
import z2 from "./../../images/z2.jpg";
import z2b from "./../../images/z2b.jpg";
import z3 from "./../../images/z3.jpg";
import z3b from "./../../images/z3b.jpg";
import z4 from "./../../images/z4.jpg";
import z4b from "./../../images/z4b.jpg";

import { useState } from "react";
import styled from "styled-components";
import { Modal } from "../Modal/Modal";
import garsonka1_planek from "./../../images/garsonka1_planek.gif";
import garsonka2_planek from "./../../images/garsonka2_planek.gif";
import garsonka3_planek from "./../../images/garsonka3_planek.gif";
import penzion_leto_zezadu from "./../../images/penzion_leto_zezadu.jpg";
import rekreace_solary from "./../../images/rekreace_solary.jpg";
import rekreace_zboku from "./../../images/rekreace_zboku.jpg";
import rekreace_zboku_b from "./../../images/rekreace_zboku_b.jpg";
import rekreace_zepredu from "./../../images/rekreace_zepredu.jpg";
import { Url } from "../../api/paths";

export const StyledImage = styled.div<{ url: string }>`
  background: url(${(props) => props.url});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: top center;
  background-attachment: fixed;
  height: calc(100% - 20px);
  width: auto;
  max-width: 100%;
  position: relative;
`;

export const StyledSmallImage = styled.img`
  float: left;
  margin: 0 1rem 1rem 0;
  border: 1px solid black;
  cursor: pointer;
  &:hover {
    filter: brightness(110%);
  }
`;

const SyledApartmentPlanImage = styled.img`
  max-width: 100%;
`;

const StyledText = styled.div`
  text-align: justify;
  padding: 1vw 2vw 2vw 2vw;
  background: #ff9933;
  color: black;

  ul {
    padding: 20px;
  }
`;

export const Apartments = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [imgUrl, setImgUrl] = useState("");

  const showImage = (url: string) => {
    setIsVisible(true);
    setImgUrl(url);
  };

  return (
    <>
      {isVisible && (
        <Modal
          setIsVisible={setIsVisible}
          children={<StyledImage url={imgUrl} />}
        />
      )}
      <div className="header">
        <b>Ve třech apartmánech</b>
      </div>
      <StyledText>
        <div onClick={() => showImage(`${Url.FOTOGALERIE}/484b.jpg`)}>
          <StyledSmallImage
            src={rekreace_solary}
            width="300"
            height="225"
            alt="Ubytování u Kučerů"
          />
        </div>
        Jestliže máte zájem o ubytování, podívejte se nejprve na&nbsp;
        <b>
          <NavLink className="menu" to="/objednavka">
            aktuální obsazenost
          </NavLink>
        </b>
        &nbsp;v našich apartmánech. Pokud je Váš termín volný, stačí vyplnit a
        odeslat &nbsp;
        <b>
          <NavLink className="menu" to="/objednavka">
            on-line objednávku ubytování
          </NavLink>
        </b>
        , případně poslat &nbsp;
        <b>
          <NavLink className="menu" to="/kontakt">
            email
          </NavLink>
        </b>
        . Obratem Vám pošleme zprávu s doplňkovými informacemi. Kontaktovat nás
        můžete samozřejmě i telefonicky. Pro snažší orientaci jsme pro Vás
        připravili&nbsp;
        <b>
          <NavLink className="menu" to="/kontakt">
            popis cesty
          </NavLink>
        </b>
        &nbsp; k nám.
        <br />
        Podrobnosti:
        <b>
          &nbsp;<a href="#g1">Apartmán č.1</a>&nbsp;
          <a href="#g2">Apartmán č.2</a>&nbsp;
          <a href="#g3">Apartmán č.3</a>&nbsp;
          <NavLink className="menu" to="/ceny">
            CENÍK
          </NavLink>
        </b>
      </StyledText>

      <div className="header">
        <b>Po celý rok</b>
      </div>
      <StyledText>
        <div onClick={() => showImage(`${Url.FOTOGALERIE}/483b.jpg`)}>
          <StyledSmallImage
            src={rekreace_zepredu}
            width="300"
            height="224"
            alt="Ubytování u Kučerů"
          />
        </div>
        <b>Frymburk</b> - malebné rekreační městečko, rozkládající se na
        poloostrově u
        <b>
          &nbsp;
          <NavLink className="menu" to="/frymburk#lipno">
            Lipenského jezera
          </NavLink>
        </b>
        . Svou širokou nabídkou se stává oblíbeným cílem mnoha českých i
        zahraničních turistů. V létě zde můžete prožít bezpočet příjemných, ale
        také velmi vzrušujících okamžiků při vodních sportech a jiných atrakcích
        na hladině největšího jezera ve střední Evropě. Široká nabídka na Vás
        čeká také &quot;na souši&quot;. Na jaře, v létě a na podzim Vám
        doporučujeme vydat se pěšky, na kolech či na koních na výlety do okolí,
        kde je k dispozici dostatek značených tras pro milovníky šumavské
        přírody a kulturních památek. Pestrá paleta možností je připravena také
        pro rybáře, lovce i houbaře.
        <div onClick={() => showImage(rekreace_zboku_b)}>
          <StyledSmallImage
            src={rekreace_zboku}
            width="300"
            height="225"
            alt=""
          />
        </div>
        V zimní sezóně na Vás čeká při příznivém počasí zamrzlá hladina jezera
        spojená s bruslením a zimním jachtingem, upravené bězecké lyžarské stopy
        i volný zasněžený terén pro romantické vyjíždky, ale také svahy upravené
        pro
        <b>
          &nbsp;
          <a href="http://www.lipno.info" target="_new">
            sjezdové lyžování
          </a>
        </b>
        . Lákavé jsou také zážitky gastronomické při posezení v některé z
        místních restaurací. Nabízíme Vám po celý rok ubytovací kapacitu ve
        třech apartmánech pro celkem 10 osob.
      </StyledText>

      <div className="header">
        <b>Vybavení</b>
      </div>
      <StyledText>
        <div onClick={() => showImage(`${Url.FOTOGALERIE}/483b.jpg`)}>
          <StyledSmallImage
            src={penzion_leto_zezadu}
            width="300"
            height="225"
            alt="Ubytování u Kučerů"
          />
        </div>
        Přímo v objektu mohou naši hosté využívat masáže. Velkou výhodou je
        možnost parkování třech automobilů přímo na naší zahradě. Dále můžete
        využívat
        <b>
          &nbsp;<a href="#zahrada">příjemné posezení</a>&nbsp;
        </b>
        na zahradě, nebo v zahradním altánku. Ubytování poskytujeme od roku 1992
        a naši hosté se k nám rádi vracejí.
        <b>
          &nbsp;<a href="#vybaveni">Vybavení</a>&nbsp;
        </b>
        v jednotlivých apartmánech umožňuje dlouhodobou rekreaci.
      </StyledText>

      <div id="g1" className="header">
        <b>Apartmán č.1</b>
      </div>
      <StyledText>
        <SyledApartmentPlanImage
          src={garsonka1_planek}
          width="550"
          height="235"
          alt=""
        />

        <ul>
          <li>
            Obytná plocha 35 m<sup>2</sup>
          </li>
          <li>Přízemí s výhledem do zahrady</li>
          <li>Dva samostatné pokoje, samostatná koupelna</li>
          <li>Zahradní posezení, slunečník</li>
        </ul>

        <StyledSmallImage
          onClick={() => showImage(g1b)}
          src={g1}
          width="213"
          height="160"
          alt="Ubytování u Kučerů"
        />
        <StyledSmallImage
          onClick={() => showImage(g11b)}
          src={g11}
          width="213"
          height="160"
          alt="Ubytování u Kučerů"
        />
        <StyledSmallImage
          onClick={() => showImage(g12b)}
          src={g12}
          width="120"
          height="160"
          alt="Ubytování u Kučerů"
        />
        <StyledSmallImage
          onClick={() => showImage(g13b)}
          src={g13}
          width="213"
          height="160"
          alt="Ubytování u Kučerů"
        />
        <StyledSmallImage
          onClick={() => showImage(g16b)}
          src={g16}
          width="120"
          height="160"
          alt="Ubytování u Kučerů"
        />
      </StyledText>

      <div id="g2" className="header">
        <b>Apartmán č.2</b>
      </div>

      <StyledText>
        <SyledApartmentPlanImage
          src={garsonka2_planek}
          width="400"
          height="390"
          alt=""
        />

        <ul>
          <li>
            Obytná plocha 30 m<sup>2</sup>
          </li>
          <li>Přízemí s výhledem do zahrady</li>
          <li>
            Dva samostatné pokoje, samostatná koupelna, manželská postel,
            možnost přistýlky
          </li>
          <li>Zahradní posezení, slunečník</li>
        </ul>

        <StyledSmallImage
          onClick={() => showImage(g2b)}
          src={g2}
          width="213"
          height="160"
          alt="Ubytování u Kučerů"
        />
        <StyledSmallImage
          onClick={() => showImage(g21b)}
          src={g21}
          width="213"
          height="160"
          alt="Ubytování u Kučerů"
        />
        <StyledSmallImage
          onClick={() => showImage(g22b)}
          src={g22}
          width="213"
          height="160"
          alt="Ubytování u Kučerů"
        />
        <StyledSmallImage
          onClick={() => showImage(g29b)}
          src={g29}
          width="213"
          height="160"
          alt="Ubytování u Kučerů"
        />
        <StyledSmallImage
          onClick={() => showImage(g23b)}
          src={g23}
          width="120"
          height="160"
          alt="Ubytování u Kučerů"
        />
      </StyledText>

      <div id="g3" className="header">
        <b>Apartmán č.3</b>
      </div>

      <StyledText>
        <SyledApartmentPlanImage
          src={garsonka3_planek}
          width="550"
          height="240"
          alt=""
        />

        <ul>
          <li>
            Obytná plocha 60 m<sup>2</sup>, pro max. 4 osoby
          </li>
          <li>
            Celé podkroví s výhledem na jezero <br />
            <b>(strmější schodiště, méně vhodné pro starší osoby)</b>
          </li>
          <li>
            Dva samostatné pokoje, samostatná koupelna, chodba využita jako
            kuchyňka
          </li>
          <li>K apartmá přísluší zahradní altánek</li>
        </ul>

        <StyledSmallImage
          onClick={() => showImage(g3b)}
          src={g3}
          width="120"
          height="160"
          alt="Ubytování u Kučerů"
        />
        <StyledSmallImage
          onClick={() => showImage(g31b)}
          src={g31}
          width="213"
          height="160"
          alt="Ubytování u Kučerů"
        />
        <StyledSmallImage
          onClick={() => showImage(g32b)}
          src={g32}
          width="213"
          height="160"
          alt="Ubytování u Kučerů"
        />
        <StyledSmallImage
          onClick={() => showImage(g34b)}
          src={g34}
          width="213"
          height="160"
          alt="Ubytování u Kučerů"
        />
        <StyledSmallImage
          onClick={() => showImage(g36b)}
          src={g36}
          width="213"
          height="160"
          alt="Ubytování u Kučerů"
        />
        <StyledSmallImage
          onClick={() => showImage(g37b)}
          src={g37}
          width="213"
          height="160"
          alt="Ubytování u Kučerů"
        />
        <StyledSmallImage
          onClick={() => showImage(g33b)}
          src={g33}
          width="213"
          height="160"
          alt="Ubytování u Kučerů"
        />
        <StyledSmallImage
          onClick={() => showImage(g35b)}
          src={g35}
          width="120"
          height="160"
          alt="Ubytování u Kučerů"
        />
      </StyledText>

      <div id="vybaveni" className="header">
        <b>Vybavení</b>
      </div>

      <StyledText>
        <ul>
          <li>Poskytujeme ubytování ve třech apartmánech.</li>
          <li>
            Každý apartmán se skládá ze dvou místností a samostatné koupelny s
            WC. Součástí každého apartmá je: sociální zařizení (umyvadlo,
            sprchový kout, WC), televize, rádio, vybavený kuchyňský kout (vařič,
            lednice, dřez na nádobí, kuchyňské nádobí, mikrovlná trouba,
            rychlovarná konvice).
          </li>
          <li>
            Úklid ubytovacích prostor se provádí jedenkrát týdně a nebo na
            požádání.
          </li>
          <li>Parkovací plochy pro tři automobily jsou na zahradě.</li>
          <li>
            Je možno využívat zadní zahradu včetně posezení v altánku. K
            apartmánům v přízemí přísluší venkovní posezení (lavice, stůl,
            slunečník).
          </li>
          <li>
            Kola, lyže a jiné sportovní a rybářské náčiní se ukládá do kolárny,
            která se na noc zamyká.
          </li>
          <li>Prádelnu je možno využít jako sušárnu.</li>
          <li>Wi-fi internet v celém objektu</li>
        </ul>
      </StyledText>

      <div className="header">
        <b>Služby za úplatu</b>
      </div>

      <StyledText>
        <ul>
          <li>Zahradní krb v altánku</li>
        </ul>
      </StyledText>

      <div id="zahrada" className="header">
        <b>Zahrada</b>
      </div>

      <StyledText>
        <div onClick={() => showImage(z2b)}>
          <StyledSmallImage
            src={z2}
            width="200"
            height="160"
            alt="Ubytování u Kučerů"
          />
        </div>
        <div onClick={() => showImage(z3b)}>
          <StyledSmallImage
            src={z3}
            width="200"
            height="160"
            alt="Ubytování u Kučerů"
          />
        </div>
        <div onClick={() => showImage(z4b)}>
          <StyledSmallImage
            src={z4}
            width="200"
            height="160"
            alt="Ubytování u Kučerů"
          />
        </div>
      </StyledText>
    </>
  );
};
