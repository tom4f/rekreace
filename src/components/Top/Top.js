import mainImg from "./../../images/main.jpg";
import GoogleAd from "../GoogleAd";
import "./css/top.css";
import { NavLink } from "react-router-dom";

export const Top = () => {
  return (
    <>
      <div className="header">
        <NavLink className="menu" to="/">
          {" "}
          Start
        </NavLink>{" "}
        |
        <NavLink className="menu" to="/apartments">
          {" "}
          Apartmány
        </NavLink>{" "}
        |
        <a className="menu" href="./booking-form/" target="_top">
          {" "}
          Objednávka
        </a>{" "}
        |
        <a className="menu" href="./ceny.php" target="_top">
          {" "}
          Ceny
        </a>{" "}
        |
        <NavLink className="menu" to="/contact">
          {" "}
          Kontakt
        </NavLink>{" "}
        |
        <a className="menu" href="./frymburk.php" target="_top">
          {" "}
          O Frymburku
        </a>
      </div>

      <div className="mainpictures">
        <a href="rekreace.php">
          <img
            className="img"
            src={mainImg}
            alt="Ubytování u Kučerů ve Frymburku - zima"
          />
        </a>
      </div>

      <div className="header">
        <NavLink className="menu" to="/meteo">
          {" "}
          Meteostanice
        </NavLink>{" "}
        |
        <a className="menu" href="./forum/" target="_top">
          {" "}
          Fórum
        </a>{" "}
        |
        <a className="menu" href="./photo-gallery/" target="_top">
          {" "}
          Fotogalerie
        </a>{" "}
        |
        <a className="menu" href="./windsms/" target="_top">
          {" "}
          MeteoAlarm
        </a>{" "}
        |
        <a className="menu" href="./kaliste.php" target="_top">
          {" "}
          Kaliště
        </a>{" "}
        |
        <a className="menu" href="../4f/" target="_top">
          {" "}
          Windsurfing
        </a>
      </div>

      <GoogleAd />
    </>
  );
};
