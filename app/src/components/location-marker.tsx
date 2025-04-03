import { LatLng } from 'leaflet';
import { useState } from 'react';
import { Marker, Popup, useMapEvents } from 'react-leaflet';
import myMarkerUrl from '@/assets/marker.svg';
import { createIcon } from './create-icon';

export function LocationMarker() {
  const [position, setPosition] = useState<LatLng | null>(null);
  const map = useMapEvents({
    dblclick() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    }
  });
  return position ? (
    <Marker position={position} icon={createIcon(myMarkerUrl)}>
      <Popup>Você está aqui</Popup>
    </Marker>
  ) : null;
}
