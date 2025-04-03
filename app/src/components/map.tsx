import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { IEquipmentPositionHistory } from '@/zustand/interface';
import { last } from 'lodash';
import { LocationMarker } from './location-marker';
import { EquipmentMarker } from './equipment-marker';

interface MapProps {
  equipmentPositions: IEquipmentPositionHistory[];
  activeId: string;
}

const Map = ({ activeId, equipmentPositions }: MapProps) => (
  <MapContainer
    center={[-19.2395, -46.0697]}
    zoom={10}
    scrollWheelZoom={true}
    className="h-[500px] w-full rounded-lg"
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
        lat={last(item.positions)?.lat}
        lon={last(item.positions)?.lon}
        date={last(item.positions)?.date}
        equipmentPositions={equipmentPositions}
      />
    ))}

    <LocationMarker />
  </MapContainer>
);

export default Map;
