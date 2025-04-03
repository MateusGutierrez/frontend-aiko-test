import { useEffect, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
  useMapEvents,
  useMap
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { LatLng } from 'leaflet';
import { IEquipmentPositionHistory } from '@/zustand/interface';
import { head, isEmpty } from 'lodash';

interface Props {
  activeId: string;
  equipmentId: string;
  lat?: number;
  lon?: number;
  date?: string | Date;
  equipmentPositions: IEquipmentPositionHistory[];
}

function EquipmentMarker({ activeId, equipmentId, lat, lon, date, equipmentPositions }: Props) {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const map = useMap();

  useEffect(() => {
    if (activeId && !isEmpty(equipmentPositions)) {
      const equipment = equipmentPositions.find(item => item.equipmentId === activeId);
      const newPosition = head(equipment?.positions);

      if (newPosition?.lat !== undefined && newPosition?.lon !== undefined) {
        setPosition([newPosition.lat, newPosition.lon]);
        map.flyTo([newPosition.lat, newPosition.lon], 12);
      }
    }
  }, [activeId, equipmentPositions, map]);

  return (
    <>
      {position && (
        <Marker position={position}>
          <Popup>Equipamento encontrado - {activeId}</Popup>
        </Marker>
      )}
      {lat !== undefined && lon !== undefined && (
        <Marker position={[lat, lon]}>
          <Popup>Equipamento {equipmentId}</Popup>
          {date && <Tooltip>{new Date(date).toLocaleString()}</Tooltip>}
        </Marker>
      )}
    </>
  )
}

function LocationMarker() {
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
    <Marker position={position}>
      <Popup>Você está aqui</Popup>
    </Marker>
  ) : null;
}

interface MapProps {
  equipmentPositions: IEquipmentPositionHistory[];
  activeId: string;
}

const Map = ({ activeId, equipmentPositions }: MapProps) => {
  return (
    <div>
      <MapContainer
        center={[-19.2395, -46.0697]}
        zoom={10}
        scrollWheelZoom={true}
        style={{ height: '500px', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {equipmentPositions.map(item => (
          <EquipmentMarker
            key={item.equipmentId}
            activeId={activeId}
            equipmentId={item.equipmentId}
            lat={head(item.positions)?.lat}
            lon={head(item.positions)?.lon}
            date={head(item.positions)?.date}
            equipmentPositions={equipmentPositions}
          />
        ))}

        <Marker position={[51.51, -0.09]}>
          <Popup>Popup for Marker</Popup>
          <Tooltip>Tooltip for Marker</Tooltip>
        </Marker>

        <LocationMarker />
      </MapContainer>
    </div>
  );
};

export default Map;
