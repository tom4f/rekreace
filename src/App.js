import { Top } from "./components/Top/Top";
import WebCam from "./components/WebCam/WebCam";
import { MeteoBarBig } from "./components/MeteoBarBig/MeteoBarBig";
import { Forum } from "./components/Forum/Forum";
import PhotoGallery from "./components/PhotoGallery/PhotoGallery";
import { Bottom } from "./components/Bottom/Bottom";
import { Route, Routes } from "react-router-dom";
import { Meteo } from "./components/Meteo";
import { Apartments } from "./components/Apartments";
import { Contact } from "./components/Contact/Contact";

import "./css/main.css";

export const App = () => {
  return (
    <div className="top_container">
      <Top />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <WebCam />
              <MeteoBarBig />
              <Forum />
              <PhotoGallery />
            </>
          }
        />
        <Route path="/apartments/*" element={<Apartments />} />
        <Route path="/contact/*" element={<Contact />} />
        <Route path="/meteo/*" element={<Meteo />} />
      </Routes>
      <Bottom />
    </div>
  );
};
