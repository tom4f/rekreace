import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle, faStopCircle } from '@fortawesome/free-solid-svg-icons'
import './css/WebCamSlideShow.css'

export const WebCamSlideShow = ( { state: { day, hour, minute, timer }, reactChange } ) => {
    const [startButton, setStartButton] = useState(true)

    const startShow = () => {

        const Presentation = () => {

            const add15minutes = () => { 
                if (minute < 45) return minute+=15
                minute = 12
                if (hour < 22)   return hour++
                hour = 7
                if (day < 31)    return day++
                day = 1
            }
            add15minutes()

            reactChange({
                day,
                hour,
                minute
            });
        }

        timer = setInterval(Presentation, 2000);
        reactChange({
            timer: timer,
            isLiveImg: false
        })

        setStartButton( prev => !prev );
    }

    const stopShow = () =>{
        clearInterval(timer);
        setStartButton( prev => !prev );
        reactChange( { isLiveImg: true } )
    }

    return (
        <div>
             { startButton
                ? <FontAwesomeIcon className="slide-show" size="3x" icon={ faPlayCircle } onClick={ () => startShow() }/>
                : <FontAwesomeIcon className="slide-show" size="3x" icon={ faStopCircle } onClick={ () => stopShow()  }/> }
        </div>
    )
}