import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Apartments } from './components/Apartments'
import { BookingForm } from './components/BookingForm/BookingForm'
import { Bottom } from './components/Bottom/Bottom'
import { Contact } from './components/Contact/Contact'
import { Forum } from './components/Forum/Forum'
import { Frymburk } from './components/Frymburk/Frymburk'
import { Kaliste } from './components/Kaliste/Kaliste'
import { Meteo } from './components/Meteo'
import { MeteoAlarm } from './components/MeteoAlarm/MeteoAlarm'
import { PhotoGallery } from './components/PhotoGallery/PhotoGallery'
import { Prices } from './components/Prices/Prices'
import { Start } from './components/Start/Start'
import { Top } from './components/Top/Top'
import { Windsurfing } from './components/Windsurfing/Windsurfing'
import './css/main.css'

export const App = () => {
    const { pathname } = useLocation()
    const hideTopBottom =
        pathname === '/fotogalerie' || pathname === '/meteoalarm'
    return (
        <HelmetProvider>
            <div>
                <Helmet>
                    <style type="text/css">{`
                    body {
                        line-height: 1.6;
 
                        background: ${
                            pathname === '/meteoalarm'
                                ? 'url("windsurf.jpg")'
                                : 'black'
                        };
                            background-repeat: no-repeat;
                            background-size: cover;
                            background-position: center;
                        font-family: ${
                            pathname === '/meteoalarm'
                                ? 'BenchNine, Arial, Helvetica, sans-serif'
                                : 'Verdana, Helvetica, sans-serif'
                        };
                    }
                `}</style>
                </Helmet>
                <div
                    className="top_container"
                    style={{
                        maxWidth: `${hideTopBottom ? '100%' : '724px'}`,
                        height: `${pathname === '/meteoalarm' ? '100vh' : 'unset'}`,
                    }}
                >
                    {!hideTopBottom && <Top />}
                    <Routes>
                        <Route path="/" element={<Start />} />
                        <Route path="/apartmany/*" element={<Apartments />} />
                        <Route path="/objednavka/*" element={<BookingForm />} />
                        <Route path="/ceny/*" element={<Prices />} />
                        <Route path="/kontakt/*" element={<Contact />} />
                        <Route path="/frymburk/*" element={<Frymburk />} />
                        <Route path="/meteostanice/*" element={<Meteo />} />
                        <Route path="/forum/*" element={<Forum />} />
                        <Route
                            path="/fotogalerie/*"
                            element={<PhotoGallery />}
                        />
                        <Route path="/meteoalarm/*" element={<MeteoAlarm />} />
                        <Route path="/kaliste/*" element={<Kaliste />} />
                        <Route
                            path="/windsurfing/*"
                            element={<Windsurfing />}
                        />
                    </Routes>
                    {!hideTopBottom && <Bottom />}
                </div>
            </div>
        </HelmetProvider>
    )
}
