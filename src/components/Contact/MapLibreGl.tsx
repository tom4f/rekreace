import 'maplibre-gl/dist/maplibre-gl.css';

import { Header } from 'components/Atoms';
import maplibregl, { RasterSourceSpecification } from 'maplibre-gl';
import { useEffect, useRef, useState } from 'react';
import { MAPY_CZ_API_KEY } from 'src/env';

const lng = 14.1640787;
const lat = 48.6614314;
const zoom = 14;

export const MapMapLibreGl = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [currentSource, setCurrentSource] = useState('aerial-tiles'); // Track current source

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize the map
    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        sources,
        layers: [
          {
            id: 'tiles',
            type: 'raster',
            source: currentSource, // Use currentSource from state
          },
        ],
      },
      center: [lng, lat],
      zoom,
    });

    map.addControl(new maplibregl.NavigationControl(), 'top-right');

    // Cleanup map on component unmount
    return () => map.remove();
  }, [currentSource]); // Recreate map whenever source changes

  // Handle source change
  const handleSourceChange = (newSource: string) => {
    setCurrentSource(newSource); // Update the source state
  };

  return (
    <>
      <Header>Kudy k nám? MapLibre</Header>
      <div ref={mapContainer} style={{ width: '100%', height: '300px' }} />
      <div style={{ marginTop: '10px', color: 'white' }}>
        <button onClick={() => handleSourceChange('basic-tiles')}>Basic</button>
        <button onClick={() => handleSourceChange('outdoor-tiles')}>
          Outdoor
        </button>
        <button onClick={() => handleSourceChange('winter-tiles')}>
          Winter
        </button>
        <button onClick={() => handleSourceChange('aerial-tiles')}>
          Aerial
        </button>
      </div>
    </>
  );
};

const sources: { [key: string]: RasterSourceSpecification } = {
  'basic-tiles': {
    type: 'raster',
    url: `https://api.mapy.cz/v1/maptiles/basic/tiles.json?apikey=${MAPY_CZ_API_KEY}`,
    tileSize: 256,
  },
  'outdoor-tiles': {
    type: 'raster',
    url: `https://api.mapy.cz/v1/maptiles/outdoor/tiles.json?apikey=${MAPY_CZ_API_KEY}`,
    tileSize: 256,
  },
  'winter-tiles': {
    type: 'raster',
    url: `https://api.mapy.cz/v1/maptiles/winter/tiles.json?apikey=${MAPY_CZ_API_KEY}`,
    tileSize: 256,
  },
  'aerial-tiles': {
    type: 'raster',
    url: `https://api.mapy.cz/v1/maptiles/aerial/tiles.json?apikey=${MAPY_CZ_API_KEY}`,
    tileSize: 256,
  },
};
