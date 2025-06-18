import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { NESHAN_API_KEY } from '../../lib/neshan-config';
import styled from 'styled-components';

// رفع مشکل آیکون‌های پیش‌فرض لیفلت
const fixLeafletIcons = () => {
  // استفاده مستقیم از آیکون‌های لیفلت از CDN
  const DefaultIconUrl = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png';
  const DefaultIcon2xUrl = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png';
  const DefaultShadowUrl = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png';
  
  // @ts-ignore: Ignoring TypeScript error for Leaflet icon fix
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: DefaultIcon2xUrl,
    iconUrl: DefaultIconUrl,
    shadowUrl: DefaultShadowUrl,
  });
};

// تعریف لایه‌های نشان
const NeshanLayer = ({ apiKey }: { apiKey: string }) => {
  return (
    <TileLayer
      url={`https://map.neshan.org/sdk/v5/styles/neshan/style.json?key=${apiKey}`}
      attribution='© <a href="https://developer.neshan.org">Neshan</a>'
    />
  );
};

// استایل‌های کامپوننت
const MapWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  margin-bottom: var(--spacing-4);
  
  .leaflet-container {
    width: 100%;
    height: 100%;
    font-family: inherit;
    z-index: 1;
    border-radius: var(--border-radius);
    border: 1px solid var(--color-gray-300);
  }
  
  .map-instructions {
    position: absolute;
    top: 10px;
    left: 10px;
    right: 10px;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 8px 12px;
    border-radius: 4px;
    font-size: 12px;
    z-index: 400;
    text-align: center;
  }
`;

interface LocationMarkerProps {
  position: [number, number] | null;
  onPositionChange: (position: [number, number]) => void;
}

// کامپوننت نشانگر مکان
const LocationMarker: React.FC<LocationMarkerProps> = ({ position, onPositionChange }) => {
  // استفاده از رویدادهای نقشه برای تشخیص کلیک کاربر
  const map = useMapEvents({
    click(e) {
      const newPos: [number, number] = [e.latlng.lat, e.latlng.lng];
      onPositionChange(newPos);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position ? (
    <Marker position={position} />
  ) : null;
};

interface LocationPickerMapProps {
  initialPosition?: [number, number] | null;
  onLocationSelect: (lat: string, lng: string) => void;
}

const LocationPickerMap: React.FC<LocationPickerMapProps> = ({ 
  initialPosition = [35.6892, 51.3890], // تهران به عنوان موقعیت پیش‌فرض
  onLocationSelect 
}) => {
  const [position, setPosition] = useState<[number, number] | null>(
    initialPosition || null
  );

  // رفع مشکل آیکون‌های لیفلت
  useEffect(() => {
    fixLeafletIcons();
  }, []);

  // هنگام تغییر موقعیت، مقدار را به کامپوننت والد ارسال می‌کنیم
  const handlePositionChange = (newPosition: [number, number]) => {
    setPosition(newPosition);
    onLocationSelect(newPosition[0].toString(), newPosition[1].toString());
  };

  return (
    <MapWrapper>
      <div className="map-instructions">
        برای انتخاب موقعیت مکانی خود، روی نقشه کلیک کنید
      </div>
      <MapContainer
        center={initialPosition || [35.6892, 51.3890]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker 
          position={position} 
          onPositionChange={handlePositionChange} 
        />
      </MapContainer>
    </MapWrapper>
  );
};

export default LocationPickerMap; 