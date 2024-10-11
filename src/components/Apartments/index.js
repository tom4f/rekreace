import { NavLink } from 'react-router-dom'
import penzion_leto_zezadu from './../../images/penzion_leto_zezadu.jpg'
import rekreace_solary from './../../images/rekreace_solary.jpg'
import rekreace_zboku from './../../images/rekreace_zboku.jpg'
import rekreace_zepredu from './../../images/rekreace_zepredu.jpg'
import './css/apartments.css'

export const Apartments = () => {
    return (
        <>
            <div className="header">
                <b>Ve třech apartmánech</b>
            </div>
            <div className="text">
                <a href="fotogalerie_ubytovani/484b.jpg">
                    <img
                        className="img-float-left"
                        src={rekreace_solary}
                        width="300"
                        height="225"
                        alt="Ubytování u Kučerů"
                    />
                </a>
                Jestliže máte zájem o ubytování, podívejte se nejprve na&nbsp;
                <b>
                    <NavLink className="menu" to="/objednavka">
                        aktuální obsazenost
                    </NavLink>
                </b>
                &nbsp;v našich apartmánech. Pokud je Váš termín volný, stačí
                vyplnit a odeslat &nbsp;
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
                . Obratem Vám pošleme zprávu s doplňkovými informacemi.
                Kontaktovat nás můžete samozřejmě i telefonicky. Pro snažší
                orientaci jsme pro Vás připravili&nbsp;
                <b>
                    <NavLink className="menu" to="/kontakt">
                        popis cesty
                    </NavLink>
                </b>
                k nám.&nbsp;
                <br clear="all" />
                Podrobnosti:
                <b>
                    &nbsp;<a href="garsonka.php#4">Apartmán č.1</a>&nbsp;
                    <a href="garsonka.php#2">Apartmán č.2</a>&nbsp;
                    <a href="garsonka.php#3">Apartmán č.3</a>&nbsp;
                    <NavLink className="menu" to="/ceny">
                        CENÍK
                    </NavLink>
                </b>
            </div>

            <div className="header">
                <b>Po celý rok</b>
            </div>
            <div className="text">
                <a href="fotogalerie_ubytovani/483b.jpg">
                    <img
                        className="img-float-left"
                        src={rekreace_zepredu}
                        width="300"
                        height="224"
                        alt="Ubytování u Kučerů"
                    />
                </a>
                <b>Frymburk</b> - malebné rekreační městečko, rozkládající se na
                poloostrově u{' '}
                <b>
                    &nbsp;<a href="lipno.php">Lipenského jezera</a>&nbsp;
                </b>
                . Svou širokou nabídkou se stává oblíbeným cílem mnoha českých i
                zahraničních turistů. V létě zde můžete prožít bezpočet
                příjemných, ale také velmi vzrušujících okamžiků při vodních
                sportech a jiných atrakcích na hladině největšího jezera ve
                střední Evropě. Široká nabídka na Vás čeká také &quot;na
                souši&quot;. Na jaře, v létě a na podzim Vám doporučujeme vydat
                se pěšky, na kolech či na koních na výlety do okolí, kde je k
                dispozici dostatek značených tras pro milovníky šumavské přírody
                a kulturních památek. Pestrá paleta možností je připravena také
                pro rybáře, lovce i houbaře.
                <a href="rekreace_zboku_big.jpg">
                    <img
                        className="img-float-left"
                        src={rekreace_zboku}
                        width="300"
                        height="225"
                        alt=""
                    />
                </a>
                V zimní sezóně na Vás čeká při příznivém počasí zamrzlá hladina
                jezera spojená s bruslením a zimním jachtingem, upravené bězecké
                lyžarské stopy i volný zasněžený terén pro romantické vyjíždky,
                ale také svahy upravené pro{' '}
                <b>
                    &nbsp;
                    <a href="http://www.lipno.info" target="_new">
                        sjezdové lyžování
                    </a>
                    &nbsp;
                </b>
                . Lákavé jsou také zážitky gastronomické při posezení v některé
                z místních restaurací. Nabízíme Vám po celý rok ubytovací
                kapacitu ve třech apartmánech pro celkem 10 osob.
            </div>

            <div className="header">
                <b>Vybavení</b>
            </div>
            <div className="text">
                <a href="fotogalerie_ubytovani/641b.jpg">
                    <img
                        className="img-float-left"
                        src={penzion_leto_zezadu}
                        width="300"
                        height="225"
                        alt="Ubytování u Kučerů"
                    />
                </a>
                Přímo v objektu mohou naši hosté využívat masáže. Velkou výhodou
                je možnost parkování třech automobilů přímo na naší zahradě.
                Dále můžete využívat{' '}
                <b>
                    &nbsp;<a href="vybaveni.php#2">příjemné posezení</a>&nbsp;
                </b>{' '}
                na zahradě, nebo v zahradním altánku. Ubytování poskytujeme od
                roku 1992 a naši hosté se k nám rádi vracejí.{' '}
                <b>
                    &nbsp;<a href="vybaveni.php">Vybavení</a>&nbsp;
                </b>{' '}
                v jednotlivých apartmánech umožňuje dlouhodobou rekreaci.
            </div>
        </>
    )
}
