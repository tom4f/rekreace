import { NavLink } from 'react-router-dom'
import { GoogleAd } from '../GoogleAd'
import mainImg from './../../images/main.jpg'
import './css/top.css'

export const Top = () => {
    return (
        <>
            <div className="header">
                <NavLink className="menu" to="/">
                    {' '}
                    Start
                </NavLink>{' '}
                |
                <NavLink className="menu" to="/apartmany">
                    {' '}
                    Apartmány
                </NavLink>{' '}
                |
                <NavLink className="menu" to="/objednavka">
                    {' '}
                    Objednávka
                </NavLink>{' '}
                |
                <NavLink className="menu" to="/ceny">
                    {' '}
                    Ceny
                </NavLink>{' '}
                |
                <NavLink className="menu" to="/kontakt">
                    {' '}
                    Kontakt
                </NavLink>{' '}
                |
                <NavLink className="menu" to="/frymburk">
                    {' '}
                    O Frymburku
                </NavLink>{' '}
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
                <NavLink className="menu" to="/meteostanice">
                    {' '}
                    Meteostanice
                </NavLink>{' '}
                |
                <NavLink className="menu" to="/forum">
                    {' '}
                    Fórum
                </NavLink>{' '}
                |
                <NavLink className="menu" to="/fotogalerie">
                    {' '}
                    Fotogalerie
                </NavLink>{' '}
                |
                <NavLink className="menu" to="/meteoalarm">
                    {' '}
                    MeteoAlarm
                </NavLink>{' '}
                |
                <a className="menu" href="./kaliste.php" target="_top">
                    {' '}
                    Kaliště
                </a>{' '}
                |
                <a className="menu" href="../4f/" target="_top">
                    {' '}
                    Windsurfing
                </a>
            </div>

            <GoogleAd />
        </>
    )
}
