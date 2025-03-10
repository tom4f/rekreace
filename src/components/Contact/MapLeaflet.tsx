import 'leaflet/dist/leaflet.css';

import { LatLngExpression } from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { MAPY_CZ_API_KEY } from 'src/env';

export const MapLeaflet = () => {
  const position: LatLngExpression = [50.088, 14.4208];

  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ width: '100%', height: '500px' }}
    >
      <TileLayer
        url={`https://api.mapy.cz/v1/maptiles/basic/256/{z}/{x}/{y}?apikey=${MAPY_CZ_API_KEY}`}
      />
      <Marker position={position}>
        <Popup>Prague</Popup>
      </Marker>
    </MapContainer>
  );
};
