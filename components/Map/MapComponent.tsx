import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { NESHAN_API_KEY, neshanStyles } from '../../lib/neshan-config';
import { NeshanResource } from '../../api/neshan';
import styled from 'styled-components';
import Spinner from '../Spinner';

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
  height: 100%;
  
  .leaflet-container {
    width: 100%;
    height: 100%;
    font-family: inherit;
    z-index: 1;
  }
  
  .map-controls {
    position: absolute;
    bottom: 90px;
    right: 10px;
    z-index: 500;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  
  .map-control-button {
    width: 40px;
    height: 40px;
    background-color: white;
    border: none;
    border-radius: 4px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      background-color: var(--color-gray-100);
      transform: translateY(-2px);
    }
    
    .control-icon {
      font-size: 20px;
      color: var(--color-primary);
    }
  }
  
  .map-attribution {
    position: absolute;
    bottom: 2px;
    right: 2px;
    background-color: rgba(255, 255, 255, 0.7);
    padding: 2px 5px;
    border-radius: 3px;
    font-size: 10px;
    z-index: 10;
    direction: ltr;
    
    a {
      color: var(--color-primary);
    }
  }

  .custom-marker {
    cursor: pointer !important;
  }
  
  .leaflet-popup-content-wrapper {
    border-radius: 10px;
    min-width: 250px;
  }
  
  .leaflet-popup-content {
    margin: 0;
    width: 100% !important;
  }
`;

const PopupContent = styled.div`
  padding: 0;
  font-family: inherit;
  
  .popup-header {
    padding: 12px 15px;
    background-color: var(--color-primary);
    color: white;
    border-radius: 10px 10px 0 0;
  }
  
  .popup-title {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
  }
  
  .popup-body {
    padding: 15px;
  }
  
  .popup-address {
    margin-bottom: 10px;
    font-size: 14px;
    color: var(--color-gray-700);
    line-height: 1.5;
  }
  
  .popup-details {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 15px;
  }
  
  .popup-detail-item {
    display: flex;
    align-items: center;
    font-size: 13px;
    color: var(--color-gray-600);
  }
  
  .popup-detail-icon {
    color: var(--color-primary);
    margin-left: 5px;
    font-size: 16px;
  }
  
  .popup-actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 5px;
  }
  
  .popup-button {
    display: flex;
    align-items: center;
    gap: 5px;
    background-color: var(--color-primary);
    color: white;
    border: none;
    padding: 6px 12px;
    border-radius: 4px;
    font-family: inherit;
    font-size: 13px;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      background-color: var(--color-primary-dark);
    }
  }
`;

// کامپوننت کنترل‌کننده نقشه
interface MapControllerProps {
  position: [number, number];
  setMapRef: (map: L.Map) => void;
}

const MapController: React.FC<MapControllerProps> = ({ position, setMapRef }) => {
  const map = useMap();
  
  useEffect(() => {
    map.setView(position, map.getZoom());
    setMapRef(map);
  }, [map, position, setMapRef]);
  
  return null;
};

// تعریف آیکون‌های سفارشی با ظاهر بهتر
const createCustomIcon = (color: string, iconName: string) => {
  return L.divIcon({
    className: 'custom-marker-icon',
    html: `
      <div style="
        background-color: ${color};
        width: 32px;
        height: 32px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid #ffffff;
        box-shadow: 0 4px 8px rgba(0,0,0,0.3);
      ">
        <span 
          class="material-symbols-rounded" 
          style="
            transform: rotate(45deg);
            color: white;
            font-size: 18px;
          "
        >${iconName}</span>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });
};

// آیکون موقعیت کاربر
const createUserLocationIcon = () => {
  return L.divIcon({
    className: 'user-location-marker',
    html: `
      <div style="position: relative;">
        <div style="
          width: 16px;
          height: 16px;
          background-color: #2196F3;
          border: 3px solid white;
          border-radius: 50%;
          box-shadow: 0 0 6px rgba(0,0,0,0.4);
        "></div>
        <div style="
          position: absolute;
          top: -4px;
          left: -4px;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background-color: rgba(33, 150, 243, 0.4);
          animation: pulse 1.5s ease-out infinite;
        "></div>
      </div>
      <style>
        @keyframes pulse {
          0% { transform: scale(0.95); opacity: 1; }
          70% { transform: scale(2); opacity: 0; }
          100% { transform: scale(0.95); opacity: 0; }
        }
      </style>
    `,
    iconSize: [26, 26],
    iconAnchor: [13, 13],
    popupAnchor: [0, -13],
  });
};

interface MapComponentProps {
  center: [number, number];
  zoom: number;
  resources: any[];
  isLoading?: boolean;
  userLocation?: [number, number] | null;
  resourceIcons: {
    [key: string]: {
      color: string;
      icon: string;
    };
  };
}

const MapComponent: React.FC<MapComponentProps> = ({
  center,
  zoom,
  resources,
  isLoading = false,
  userLocation = null,
  resourceIcons,
}) => {
  const [selectedResource, setSelectedResource] = useState<NeshanResource | null>(null);
  const [mapRef, setMapRef] = useState<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});

  // رفع مشکل آیکون‌های لیفلت
  useEffect(() => {
    fixLeafletIcons();
  }, []);

  useEffect(() => {
    if (mapRef) {
      // Clear existing markers before adding new ones
      Object.values(markersRef.current).forEach(marker => {
        if (marker instanceof L.Marker) {
          mapRef.removeLayer(marker);
        }
      });
      
      // اضافه کردن مارکرهای جدید
      resources.forEach((resource, index) => {
        const resourceType = resource.subcategory;
        const iconInfo = resourceIcons[resourceType] || { color: '#999', icon: 'location_on' };
        
        // استخراج مختصات با توجه به ساختار داده
        let lat: number | undefined, lon: number | undefined;
        if (resource.location && resource.location.coordinates) {
          // ساختار قدیمی
          lat = resource.location.coordinates[1];
          lon = resource.location.coordinates[0];
        } else if (resource.location && 'y' in resource.location && 'x' in resource.location) {
          // ساختار نشان
          lat = resource.location.y;
          lon = resource.location.x;
        } else {
          // داده نامعتبر
          return;
        }
        
        // استخراج اطلاعات منبع
        const title = resource.name || resource.title || 'بدون نام';
        const address = resource.address || '';
        
        // استخراج فاصله
        let distanceText = '';
        if (resource.distance) {
          if (typeof resource.distance === 'object' && resource.distance.amount) {
            distanceText = `${Math.round(resource.distance.amount)} متر`;
          } else if (typeof resource.distance === 'number') {
            distanceText = `${Math.round(resource.distance)} متر`;
          }
        }
        
        // ایجاد مارکر
        if (lat !== undefined && lon !== undefined) {
          const marker = L.marker([lat, lon], {
            icon: createCustomIcon(iconInfo.color, iconInfo.icon)
          }).addTo(mapRef);
        }
        
        // ایجاد محتوای پاپ‌آپ
        const popupContent = document.createElement('div');
        popupContent.className = 'custom-popup';
        popupContent.innerHTML = `
          <div style="direction: rtl; text-align: right; min-width: 220px; font-family: 'Vazir', 'Tahoma', sans-serif;">
            <div style="background-color: ${iconInfo.color}; color: white; padding: 10px; border-radius: 8px 8px 0 0;">
              <h3 style="margin: 0; font-size: 16px; font-weight: 600;">${title}</h3>
            </div>
            <div style="padding: 12px; background-color: white; border-radius: 0 0 8px 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
              <div style="margin-bottom: 12px; font-size: 14px; color: #444; line-height: 1.5;">${address}</div>
              
              ${distanceText ? `
              <div style="display: flex; align-items: center; margin-bottom: 10px; font-size: 13px; color: #666;">
                <span class="material-symbols-rounded" style="margin-left: 6px; font-size: 16px; color: ${iconInfo.color};">distance</span>
                فاصله: ${distanceText}
              </div>
              ` : ''}
              
              ${resource.city || resource.region ? `
              <div style="display: flex; align-items: center; margin-bottom: 10px; font-size: 13px; color: #666;">
                <span class="material-symbols-rounded" style="margin-left: 6px; font-size: 16px; color: ${iconInfo.color};">location_city</span>
                ${resource.city || resource.region}
              </div>
              ` : ''}
              
              <div style="text-align: left; margin-top: 15px;">
                <button style="background-color: ${iconInfo.color}; color: white; border: none; padding: 8px 12px; border-radius: 6px; cursor: pointer; font-family: inherit; font-size: 13px; display: flex; align-items: center; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">
                  <span class="material-symbols-rounded" style="margin-left: 6px; font-size: 16px;">navigation</span>
                  مسیریابی با نشان
                </button>
              </div>
            </div>
          </div>
        `;
          
        // اضافه کردن عملکرد دکمه مسیریابی
        const button = popupContent.querySelector('button');
        if (button) {
          button.addEventListener('click', () => {
            window.open(`https://www.neshan.org/maps/@${lat},${lon},16z`, '_blank');
          });
        }
        
        // اضافه کردن پاپ‌آپ به مارکر
        if (lat !== undefined && lon !== undefined) {
          const marker = L.marker([lat, lon], {
            icon: createCustomIcon(iconInfo.color, iconInfo.icon)
          }).addTo(mapRef);
        
          marker.bindPopup(popupContent);
        
          // ذخیره مارکر در مرجع
          markersRef.current[resourceType] = marker;
        }
      });
      
      console.log(`Added ${resources.length} markers to map`);
    }
  }, [mapRef, resources, resourceIcons]);
  
  // تابع برای مرکز کردن نقشه روی موقعیت کاربر
  const centerOnUserLocation = () => {
    if (userLocation && mapRef) {
      mapRef.setView(userLocation, 16);
    }
  };
  
  // تابع برای بازنشانی دید نقشه
  const resetMapView = () => {
    if (mapRef) {
      mapRef.setView(center, zoom);
    }
  };

  console.log('Resources count:', resources.length);

  return (
    <MapWrapper>
      <MapContainer 
        center={center} 
        zoom={zoom} 
        style={neshanStyles.mapContainer} 
        zoomControl={false}
      >
        {/* لایه استاندارد نشان */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {/* کنترل زوم */}
        <ZoomControl position="bottomleft" />
        
        {/* مرکز نقشه را تنظیم می‌کند و دسترسی به نقشه را فراهم می‌کند */}
        <MapController position={center} setMapRef={setMapRef} />
        
        {/* موقعیت کاربر */}
        {userLocation && (
          <Marker 
            position={userLocation} 
            icon={createUserLocationIcon()}
          >
            <Popup>
              <PopupContent>
                <div className="popup-header">
                  <h3 className="popup-title">موقعیت فعلی شما</h3>
                </div>
                <div className="popup-body">
                  <div className="popup-details">
                    <div className="popup-detail-item">
                      <span className="material-symbols-rounded popup-detail-icon">my_location</span>
                      موقعیت دقیق
                    </div>
                  </div>
                </div>
              </PopupContent>
            </Popup>
          </Marker>
        )}
      </MapContainer>
      
      {/* کنترل‌های سفارشی نقشه */}
      <div className="map-controls">
        {userLocation && (
          <button className="map-control-button" onClick={centerOnUserLocation} title="مرکز روی موقعیت من">
            <span className="material-symbols-rounded control-icon">my_location</span>
          </button>
        )}
        <button className="map-control-button" onClick={resetMapView} title="بازنشانی دید نقشه">
          <span className="material-symbols-rounded control-icon">center_focus_strong</span>
        </button>
      </div>
      
      {/* نمایش وضعیت بارگذاری */}
      {isLoading && (
        <Spinner 
          type="gradient"
          overlay={true}
          text="در حال بارگذاری منابع..."
        />
      )}
      
      <div className="map-attribution">
        © <a href="https://developer.neshan.org" target="_blank" rel="noopener noreferrer">Neshan Maps</a>
      </div>
    </MapWrapper>
  );
};

export default MapComponent; 