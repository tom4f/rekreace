import MapView from '@arcgis/core/views/MapView';
import WebMap from '@arcgis/core/WebMap';
import { useEffect, useRef } from 'react';

export const MapArcGISMap = () => {
  const mapDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapDiv.current) return;

    const webmap = new WebMap({
      basemap: 'dark-gray-vector',
    });

    const view = new MapView({
      container: mapDiv.current,
      map: webmap,
      center: [-117.149, 32.7353],
      scale: 10000000,
    });

    return () => view && view.destroy();
  }, []);

  return <div ref={mapDiv} style={{ width: '100%', height: '300px' }} />;
};
