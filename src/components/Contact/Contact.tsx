import { useEffect } from "react";
import cesta from "./../../images/cesta.jpg";
import kde_je_frymburk_republika from "./../../images/kde_je_frymburk_republika.gif";
import mapka from "./../../images/mapka.gif";
import "./css/contact.css";

export const Contact = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.setAttribute("src", `js/formular_kontakt.js`);
    script.setAttribute("id", "formular_kontakt");
    document.head.appendChild(script);
  }, []);

  return (
    <>
      <header className="header">
        <b>Kontaktní informace</b>
      </header>
      <article className="address_and_formular">
        <form id="form_kontakt" name="form_kontakt" autoComplete="off">
          <section className="formular">
            <div className="adresa">
              <div>
                Adresa :
                <br />
                <b>Ubytování U Kučerů</b>
                <br />
                <b>Frymburk 73</b>
                <br />
                <b>382 79</b>
              </div>
              <div>
                Internet :
                <br />
                <b>
                  <a href="http://www.LIPNOnet.cz/rekreace">
                    www.LIPNOnet.cz/rekreace
                  </a>
                </b>
                <br />
                E-mail :
                <br />
                <b>
                  <a href="mailto:ubytovani@lipnonet.cz">
                    ubytovani@lipnonet.cz
                  </a>
                </b>
              </div>
              <div>
                Telefon :
                <br />
                <b>+420-602496115</b>
                <br />
                Mobil :
                <br />
                <b>+420-724870561</b>
              </div>
            </div>

            <div className="contact_result_alert" id="form_result_alert" />

            <div className="input_booking">
              <label>E-mail</label>
              <input
                type="email"
                name="emailova_adresa"
                placeholder="vyplňte svojí e-mailovou adresu"
                required
              />
            </div>

            <div className="input_booking">
              <label>Text</label>
              <textarea
                name="text"
                rows={10}
                cols={68}
                wrap="Yes"
                placeholder="Pokud nám chcete cokoliv sdělit, sem múžete napsat zprávu..."
                required
              ></textarea>
            </div>

            <input
              id="antispam_code_orig"
              type="hidden"
              name="antispam_code_orig"
            />

            <div className="antispam_booking input_booking">
              <label id="antispam_code_label"></label>
              <input
                id="antispam_code_input"
                type="text"
                name="antispam_code"
                size={5}
                placeholder="sem kód"
                required
              />
            </div>

            <div className="submit_booking">
              <input type="submit" name="odesli" value="Odeslat" />
            </div>
          </section>
        </form>
      </article>

      <header className="header">
        <b>Kudy k nám?</b>
      </header>

      <article className="maps">
        <section>
          <img
            className="img-left"
            src={kde_je_frymburk_republika}
            alt="Map"
            width="423"
            height="253"
          />
          <b>Městečko Frymburk</b> se nachází asi 50km na jih od Českých
          Budějovic. Z Českých Budějovic do Frymburka se dostanete následovně:
          Český Krumlov, Větřní, Světlík, Blatná, Frymburk. Frymburk leží na
          břehu lipenského jezera a 7 km od hraničního přechodu s Rakouskem.
          <br />
          <img src={mapka} alt="Map" width="307" height="582" />
          <img src={cesta} alt="Route" width="540" height="253" />
        </section>
      </article>
    </>
  );
};
