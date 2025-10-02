// Commented out for future learning - not currently used in production
// To use: pnpm add @arcgis/core
// import MapView from '@arcgis/core/views/MapView';
// import WebMap from '@arcgis/core/WebMap';
import { useEffect, useRef } from 'react';

export const MapArcGISMap = () => {
  const mapDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Commented out - requires @arcgis/core package
    // if (!mapDiv.current) return;
    //
    // const webmap = new WebMap({
    //   basemap: 'dark-gray-vector',
    // });
    //
    // const view = new MapView({
    //   container: mapDiv.current,
    //   map: webmap,
    //   center: [-117.149, 32.7353],
    //   scale: 10000000,
    // });
    //
    // return () => view && view.destroy();
  }, []);

  return <div ref={mapDiv} style={{ width: '100%', height: '300px' }}>
    {/* ArcGIS Map - Install @arcgis/core to enable */}
  </div>;
};
