import {Component} from 'react';
import Style from 'style-it';
import './css/slider.css'
import { sliderDynamicCss } from './css/slider-dynamic-css.js'

export default class RangeSlider extends Component {

    ranger = ( { name: sliderName, value: sliderValue} ) => {
        
        if (sliderName === 'day') {
            this.props.reactChange({
                day: +sliderValue,
                isLiveImg: false,
            }) 
        }

        if (sliderName === 'time') {
            const hourSelected   = Math.floor(sliderValue / 60);
            const minuteSelected = sliderValue - hourSelected * 60 ;
            this.props.reactChange({
                hour :   hourSelected,
                minute : minuteSelected,
                isLiveImg: false,
            })
        }
    }

    render(){
        const { state: { day, hour, minute } } = this.props;
        return Style.it( sliderDynamicCss(day, hour, minute),
            <div className="sliders-container" >
                <div className="slide-container">
                    <input
                        className="slider slider-day"
                        type="range"
                        name="day"
                        min="1"
                        max="31"
                        onChange={ (e) => this.ranger(e.target) }
                        value={ day }
                    />
                </div>
                <div className="slide-container">
                    <input
                        className="slider slider-hour"
                        type="range"
                        name="time"
                        min={  7 * 60 + 12 }
                        max={ 22 * 60 + 57  }
                        step="15"
                        onChange={ (e) => this.ranger(e.target) }
                        value={ hour * 60 + minute }
                    />
                </div>
            </div>
        )
    }
}