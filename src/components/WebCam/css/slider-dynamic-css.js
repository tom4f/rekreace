const svgEncoder = (sliderText) => {
    const svgOrig = `
        <svg viewBox='0 0 50 30' xmlns='http://www.w3.org/2000/svg'>
            <style>
                .heavy{
                    font: bold 17px sans-serif;
                    dominant-baseline:central;
                    text-anchor:middle;
                }
            </style>
            <text x='50%' y='50%' class='heavy' fill='black'>
                ${sliderText}
            </text>
        </svg>
    `
    const replaceLogic = {
        '<' : '%3C',
        '>' : '%3E',
        '{' : '%7B',
        '}' : '%7D'
    }

    return svgOrig.replace( /[<>{}]/g, oneString => replaceLogic[oneString] )
} 

export const sliderDynamicCss = (day, hour, minute) => {

    const now = new Date()
    const monthToday = now.getMonth() + 1

    const dateFromSlider = new Date()
    dateFromSlider.setDate(day)
    dateFromSlider.setHours(hour, minute)

    const sliderDate = now > dateFromSlider ? `${day}.${monthToday}.` : `${day}.${monthToday - 1}.`

    return `
        .slider-day::-webkit-slider-thumb {
            background-image: url("data:image/svg+xml, ${svgEncoder(sliderDate)} ");
        }
        .slider-day::-moz-range-thumb {
            background-image: url("data:image/svg+xml, ${svgEncoder(sliderDate)} ");
        }
        .slider-hour::-webkit-slider-thumb {
            background-image: url("data:image/svg+xml, ${svgEncoder( hour + ':' + minute )} ");
        }
        .slider-hour::-moz-range-thumb {
            background-image: url("data:image/svg+xml, ${svgEncoder( hour + ':' + minute )} ");
        }
    `
}