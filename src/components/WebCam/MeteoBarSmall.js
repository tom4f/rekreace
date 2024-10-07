import { useState, useEffect } from 'react'
import './css/MeteoBarSmall.css'

export const MeteoBarSmall = () => {

    const [meteoText, setMetoText] = useState('')
    const [cssTransitionOut, setCssTransitionOut] = useState('meteo_box_transition_out')

    const meteoBox = (meteoText) => {

        if (!meteoText) return

        const [, date, time, temp, huminidy, presure, wind, dir, , dewPoint, windChill] = meteoText.split('|')

        return (
            <>
                <fieldset className="meteo_value">
                    <legend>{('0' + date).slice(-8).slice(0, 6)}</legend>
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
        )
    }

    const asyncFunction = async () => {
        const getTxt = await fetch(`./../davis/lipnonet_meteo.txt`)
            .then(response => response.text())
            .catch(err => console.log({ err }))

        setMetoText(old => {
            if (old !== getTxt) {
                setCssTransitionOut('meteo_box_transition_out')
                //setTimeout( () => setCssTransitionOut(''), 2000 )
            }
            return getTxt
        })
    }

    useEffect(() => {
        asyncFunction()
        const timer = setInterval(() => asyncFunction(), 10000)
        return () => clearInterval(timer)
    }, [])

    useEffect(() => {
        const timeout = setTimeout(() => setCssTransitionOut(''), 2000)
        return () => clearTimeout(timeout)
    }, [cssTransitionOut])

    return (
        <div className={`meteo_box ${cssTransitionOut}`}>{meteoBox(meteoText)}</div>
    )
}