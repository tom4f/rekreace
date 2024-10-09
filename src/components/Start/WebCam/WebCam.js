import { Component } from 'react';
import { ShowWebCam } from './ShowWebCam';
import { WebCamSlideShow } from './WebCamSlideShow';
import { MeteoBarSmall } from './MeteoBarSmall';
import RangeSlider from './RangeSlider';
import './css/webcam-archive.css';

export default class WebCam extends Component {
    // MOUNTING : 1st live cycle method = constructor()
    constructor(props) {
        super(props);
        // initial states

        const minutesNormailzed = () => {
            const minutesNow = 60 * new Date().getHours() + new Date().getMinutes()
            if (minutesNow > 1377) {
                return 1377
            } else if (minutesNow < 432) {
                return 432
            } else {
                return minutesNow - 3 - minutesNow % 15
            }
        }

        this.state = {
            day: new Date().getDate(),
            hour: Math.floor(minutesNormailzed() / 60),
            minute: minutesNormailzed() % 60,
            slideId: 0,
            timer: 0,
            liveImgTimer: 0,
            isLiveImg: true,
            webAuthor: 'empty'
        };
    }


    // MOUNTING : 2nd live cycle method = read parents prop; use sparingly
    // UPDATING : 1st live cycle method - e.g. place to set state based  on props
    static getDerivedStateFromProps(props, state) {
        return { webAuthor: 'Tomas ' + props.autor }
    }

    // UPDATING : 2nd live cycle method - false/true = React should continue with rendering or not
    shouldComponentUpdate() {
        return true;
    }

    // Change page
    reactChange = (value) => {
        this.setState(value);
    }
    // MOUNTING : 3rd live cycle method = render() -> will be always called
    // UPDATING : 3rd live cycle method = render() -> will be always called
    render() {
        // descructing states, e.g. this.state.allEntrie -> allEntries
        return (
            <>
                <div className="header"><b><a href="https://www.ipcamlive.com/62d9a9a2cb1ff">Testujeme živé video --&gt; klikněte zde!</a></b></div>
                <div className="webcam-container">
                    <WebCamSlideShow state={this.state} reactChange={this.reactChange} />
                    <RangeSlider state={this.state} reactChange={this.reactChange} />
                    <ShowWebCam state={this.state} reactChange={this.reactChange} />
                    <MeteoBarSmall />
                </div>
            </>
        ) // return end
    } // render end


    // UPDATING : 3rd live cycle method - access to props and state before update - componentDidUpdate() must be also present
    getSnapshotBeforeUpdate(prevProps, prevState) {
        //console.log('prevState.day: ' + prevState.day);
        return null
    }

    // UPDATING : 4th live cycle method - called after component is updated in DOM
    componentDidUpdate() {
        //console.log('this.state.day: ' + this.state.day);
    }

    // MOUNTING : 4th live cycle method - called after component is rendered
    componentDidMount() {
        this.setState({
            day: new Date().getDate()
        });
    }

    // UNMOUNTING: only one live cycle method - called if component is removed from DOM - e.g. clearInterval(timer)
    // componentWillUnmount() {
    // }

}
