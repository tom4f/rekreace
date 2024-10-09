import { Route, Routes, useLocation } from 'react-router-dom'
import { Apartments } from './components/Apartments'
import { BookingForm } from './components/BookingForm/BookingForm'
import { Bottom } from './components/Bottom/Bottom'
import { Contact } from './components/Contact/Contact'
import { Forum } from './components/Forum'
import { Frymburk } from './components/Frymburk/Frymburk'
import { Meteo } from './components/Meteo'
import { PhotoGallery } from './components/PhotoGallery/PhotoGallery'
import { Prices } from './components/Prices/Prices'
import { Start } from './components/Start/Start'
import { Top } from './components/Top/Top'

import './css/main.css'

export const App = () => {
    const { pathname } = useLocation()
    const isPhotoGalleryPage = pathname === '/photo-gallery'
    return (
        <div
            className="top_container"
            style={{ maxWidth: `${isPhotoGalleryPage ? '100%' : '724px'}` }}
        >
            {!isPhotoGalleryPage && <Top />}
            <Routes>
                <Route path="/" element={<Start />} />
                <Route path="/apartments/*" element={<Apartments />} />
                <Route path="/booking-form/*" element={<BookingForm />} />
                <Route path="/apartments/*" element={<Apartments />} />
                <Route path="/prices/*" element={<Prices />} />
                <Route path="/contact/*" element={<Contact />} />
                <Route path="/frymburk/*" element={<Frymburk />} />
                <Route path="/meteo/*" element={<Meteo />} />
                <Route path="/forum/*" element={<Forum />} />
                <Route path="/photo-gallery/*" element={<PhotoGallery />} />
            </Routes>
            {!isPhotoGalleryPage && <Bottom />}
        </div>
    )
}
