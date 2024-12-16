import { useState } from 'react';
import { StyledImage, StyledSmallImage } from '../Apartments';
import { Modal } from '../Modal/Modal';
import frymburk_old1 from './../../images/frymburk_old1.jpg';
import frymburk_old1_small from './../../images/frymburk_old1_small.jpg';
import frymburk_old2 from './../../images/frymburk_old2.jpg';
import frymburk_old2_small from './../../images/frymburk_old2_small.jpg';
import frymburk_old3 from './../../images/frymburk_old3.jpg';
import frymburk_old3_small from './../../images/frymburk_old3_small.jpg';
import kovarov from './../../images/kovarov.jpg';
import kovarov1 from './../../images/kovarov1.jpg';
import kovarov_b from './../../images/kovarov_b.jpg';

export const Frymburk = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [imgUrl, setImgUrl] = useState('');

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
      <div className='header'>
        <b>Historie</b>
      </div>
      <div className='text'>
        <div onClick={() => showImage(frymburk_old1)}>
          <StyledSmallImage
            src={frymburk_old1_small}
            alt='Frymburk'
            width='260'
            height='171'
          />
        </div>
        Prehistorické nálezy osídlení jsou datovány 8 až 10 tisíc let před naším
        letopočtem. Novodobá historie se spojuje s koncem 13. století, kdy zde
        vznikla na význačném přechodu přes řeku, na obchodní stezce z Horních
        Rakous do Českého Krumlova, trhová ves. Odtud jméno Frymburk, to jest
        hrad k ochraně míru a bezpečnosti. Rožmberkové zřídili u frymburského
        mostu mýto, zmíněné již v roce 1305. Do roku 1405 byl na této stezce
        velký provoz. Ještě v roce 1464 se po ní vracelo od francouzského krále
        do Čech významné české mírové poselstvo krále Jiřího z Poděbrad.
        <div onClick={() => showImage(frymburk_old2)}>
          <StyledSmallImage
            src={frymburk_old2_small}
            alt='Frymburk'
            width='260'
            height='186'
          />
        </div>
        Kaple ve Frymburku původně náležela ostrovskému klášteru u soutoku
        Vltavy se Sázavou. Roku 1305 daroval Jindřich z Rožmberka kapli i s
        jejími příjmy premonstrátskému klášteru ve Schlagelu. Samotný Frymburk
        byl až do roku 1848 součástí panství Rožmberk. V roce 1379 byl Frymburk
        poprvé nazván městem, od 16.stol. zde byl též městský pivovar. Na jižní
        straně náměstí s parkem, jehož charakter naznačuje, že zde bývalo
        tržište, stojí původně ranně gotický kostel sv.Bartoloměje z roku 1277,
        přestavěný kolem roku 1530 pozdně goticky. Vnitřní zařízení kostela je
        barokní. Západně od kostela stojí stará frymburská škola, která patří k
        jedněm z nejstarších v jižních Čechách.
        <div onClick={() => showImage(frymburk_old3)}>
          <StyledSmallImage
            src={frymburk_old3_small}
            alt='Frymburk'
            width='260'
            height='143'
          />
        </div>
        Již v roce 1474 se připomíná její první kantor. Na budově je umístěna
        pamětní deska významnáho kantora a hudebního skladatele J.W.Maxanta (žil
        zde 1786-1838) a jeho žáka, frymburského rodáka S.Sechtera. Sechter byl
        dvorní varhaník a profesor vídeňské konzervatoře, mezi jeho žáky patřili
        např. Bruckner, Brahms, Bella. Za svou láskou frymburskou rodačkou Fanny
        Greiplovou sem často jezdil &quot;básník ©umavy&quot; - Adalbert
        Stifter. V parku na náměstí stojí kamenná mohyla s bronzovým reliéfem
        A.Stiftera, kamenná kašna z roku 1676, pranýř se zvonem z roku 1651 a
        mariánský sloup zbudovaný v římském slohu z roku 1635, který patří mezi
        nejstarší v Čechách.
      </div>

      <div className='header'>
        <b>Současnot</b>
      </div>
      <div className='text'>
        <b>FRYMBURK</b> - někdejší celkem neznámé městečko při dolní části
        Lipenského přehradního jezera se po výstavbě Lipna stalo vyhledávaným
        rekreačním střediskem. Po zatopení části obce přehradními vodami zde
        bylo postaveno mnoho nových domů a objekty ve staré části obce byly
        pěkně upraveny.
        <br />
        Rychlé spojení Frymburka s protilehlým pravým břehem přehrady umožňuje
        převoz. Skutečně nová éra v dějinách Frymburka nastala po druhé světové
        válce. Začátky nového života nebyly zde stejně jako v podobných místech
        snadné, ale mnohé se s nemalým úsilím překonalo a vybudovala se tu obec
        nového typu. Nad Frymburkem se tyčí vrch Marta s kaplí, odkud je
        nádherný výhled na jezero, okolní vrchy a při jasném počasí i na vrcholy
        Alp. Do Frymburka zajíždí rádi malíři, krajináři i spisovatelé.
        Nákladním převozem se dostanete i se svými vozidly na pravý břeh jezera
        - Frýdavu. Frýdava je východištěm po žluté turistické značce na Vítkův
        Kámen. Je otevřen hraniční přechd Přední Výtoň - Gugelwald (i pro
        motorová vozidla).
      </div>

      <div id='lipno' className='header'>
        <b>Vodní nádrž Lipno</b>
      </div>
      <div className='text'>
        <div onClick={() => showImage(kovarov_b)}>
          <StyledSmallImage
            src={kovarov}
            alt='Frymburk'
            width='260'
            height='171'
          />
        </div>
        Horské jezero ve výšce 720 m nad mořem, s vodou, kterou neznečisšuje
        žádný průmyslový odpad ani provoz motorových lodi, dnes patří k obrazu
        východní části Šumavy. Průměrná hloubka jezera je 6,5 metru, největší
        hloubka 21,5 metru. V prosinci 1997 uplynulo 40 let od dne, kdy se
        začalo s jeho napouštěním. Stavba začala již v roce 1950 výstavbou
        nových cest náhradou za ty, ktere byly později zatopeny, odlesňovaním,
        přeložkou železnični tratě, likvidací tuhových dolů v Hůrce u Černé v
        Pošumaví a přenesením hřbitovu. V přehradním jezeře zmizela rašeliniště
        pod Černou a u Dolní Vltavice i srdce Vltavy nad
        <br />
        <br />
        Přehradni hráz vysoká 28 m je tvořena nasypanou zeminou s betonovým
        jádrem a obložena kameny. Celková délka jezera, u nás nejvetsiho,
        přesahuje čtyřicet kilometrů, vodni plocha má 4650 ha (některé prameny
        uvádějí 4870 ha). Jezero je rozlito v údoli Lipna až k Želnavě, v jednom
        mistě na pravém břehu zasahuje až na rakouské území. Na levém břehu
        vznikla ze šumavských vsí a městeček střediska vodních sportů -
        Frymburk, Dolní Vltavice, Černá v Pošumaví , Horní Planá. Ojedinělým, a
        u nás prvým, bylo technické řešení hydroelektrárny, která provoz
        zahájila v r. 1959. V místech, kde nyni stojí přehradní hráz, začinala
        řeka prudce klesat. V délce toku 12 km měla spád 163 m, čili asi 15 %.
        Již dříve se uvažovalo o využiti této energie. Z části bývala využívána
        malými elektrárnami a průmyslovými závody v Loučovicích. Dostatek
        elektrické energie z místních zdrojů umožnil již v letech 1909-11
        vybudování soukromé elektrické dráhy z Lipna přes Loučovice a Vyšši Brod
        k železniční stanici Rybník. Zvlaštnost zdejšího řešeni spočívá ve
        využití onoho značného, přirodou daného spádu. U levého břehu před
        přehradní hrází je vybudováno zařízení, kterým voda padá šachtou
        vylámanou ve skále do hloubky právě těch 160 m a svou obrovskou silou
        roztáčí kola dvou Francisových turbin uložených v podzemní hale. Odtud
        pak vlastní silou odtéká téměř vodorovným odtokovým kanálem dlouhým 3,5
        km do vyrovnávací nádrže nad Vyššim Brodem. Na této podzemní cestě
        protéká Vltava na jednom místě pod svým starým korytem. Proražení
        odtokového tunelu trvalo přes tři roky. Před půlnocí z 10. na 11. ledna
        1956 se na posledním metru, který zbývalo prorazit od Lipna i od Vyssiho
        Brodu, setkaly party barabů vedené Karlem Skopkem a Miroslavem Salandou.
        Výkon lipenské hydroelektrárny je 120 000 kW elektrické energie. Slouži
        především k okamžitému zvýšení dodávky elektrické energie v době
        spotřební špičky. Na to, aby se z klidu obě turbiny roztočily na plný
        výkon stačí 2 minuty, v připadě pohotovostního zapojení, tj. když jsou
        otevřeny uzávěry vody před turbinou, stačí jen 45 vteřin.
        <br />
        <br />
        <div onClick={() => showImage(kovarov1)}>
          <StyledSmallImage
            src={kovarov1}
            alt='Frymburk'
            width='260'
            height='171'
          />
        </div>
        Lipenská údolní nádrž je nejkvalitnějším jachtařským a windsurferským
        revírem v České Republice, kvalitou přírodních podmínek plně vyhovuje
        pro pořádání vrcholných světových soutěží typu Mistrovství světa(1993)
        či Mistrovství Evropy(1991). Její úctyhodné rozměry to potvrzují: délka
        - 42km, největší šírka skoro 8 km. Olympijské tratě pro regaty
        sportovních plachetnic lze postavit nejméně ve 4 lokalitách - největší
        prostor je k dispozici nad Frymburkem u Kovářova. O bezpečí uživatelů
        vodní plochy se starají 2 záchranářské organizace. Podnebí oblasti je
        většinu roku chladné a vlhké, v letních měsících však teplé, takže
        vytváří příznivé podmínky pro rekreaci u vody. Na jezeru se však za
        silného větru vytvářejí vlny vysoké až 1,5 m, které nebezpečně ohrožují
        plavce a menší lodi.
      </div>
    </>
  );
};
