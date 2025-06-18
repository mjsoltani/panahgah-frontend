import React, { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import { searchNearbyPlaces } from '../../api/neshan';
import { resourceTypes } from '../../lib/neshan-config';
import FilterPanel from '../../components/Map/FilterPanel';
import ResourceCard from '../../components/Map/ResourceCard';
import { sampleResources } from '../../lib/sample-data';
import Spinner from '../../components/Spinner';
import SpinnerButton from '../../components/SpinnerButton';
import { getCurrentUser } from '../../api/auth';

// بارگذاری پویای کامپوننت نقشه برای جلوگیری از خطای SSR
const MapComponent = dynamic(
  () => import('../../components/Map/MapComponent'),
  { ssr: false }
);

// استایل‌های کامپوننت‌ها
const MainContainer = styled.div`
  padding: 2rem 0;
  background-color: var(--color-gray-50);
  min-height: 100vh;
`;

const PageHeader = styled.div`
  margin-bottom: 2.5rem;
  text-align: center;
  position: relative;
  
  h1 {
    font-size: 2.2rem;
    color: var(--color-primary);
    margin-bottom: 0.8rem;
    position: relative;
    display: inline-block;
    
    &:after {
      content: "";
      position: absolute;
      bottom: -12px;
      left: 50%;
      transform: translateX(-50%);
      width: 80px;
      height: 4px;
      background: linear-gradient(to right, var(--color-primary), var(--color-secondary));
      border-radius: 2px;
    }
  }
  
  p {
    max-width: 650px;
    margin: 1.5rem auto 0;
    color: var(--color-gray-600);
    font-size: 1.1rem;
    line-height: 1.6;
  }
`;

const MapContainer = styled.div`
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const MapViewContainer = styled.div`
  background-color: var(--color-white);
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  height: 650px;
  position: relative;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.12);
  }
`;

const ResourcesList = styled.div`
  margin-top: 2rem;
`;

const ResourcesHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  
  h2 {
    font-size: 1.4rem;
    color: var(--color-dark);
    margin: 0;
  }
  
  .count {
    background-color: var(--color-primary-light);
    color: var(--color-primary);
    padding: 0.3rem 0.8rem;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 500;
  }
`;

const ResourcesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  background-color: var(--color-white);
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  
  svg {
    width: 80px;
    height: 80px;
    color: var(--color-gray-300);
    margin-bottom: 1.5rem;
  }
  
  h3 {
    font-size: 1.4rem;
    color: var(--color-gray-700);
    margin-bottom: 1rem;
  }
  
  p {
    color: var(--color-gray-500);
    max-width: 400px;
    margin: 0 auto;
  }
`;

const LoadMoreButton = styled.div`
  display: flex;
  justify-content: center;
  margin: 2.5rem 0 1rem;
`;

const FloatingButton = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(to right, var(--color-primary), var(--color-secondary));
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(var(--color-primary-rgb), 0.3);
  transition: all 0.3s ease;
  z-index: 100;
  
  &:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 6px 20px rgba(var(--color-primary-rgb), 0.4);
  }
  
  &:active {
    transform: translateY(0) scale(1);
  }
  
  svg {
    width: 24px;
    height: 24px;
  }
  
  @media (min-width: 992px) {
    display: none;
  }
`;

const MobileFilterContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  transition: all 0.3s ease;
  opacity: ${props => props.isOpen ? '1' : '0'};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  
  .filter-content {
    background-color: var(--color-white);
    border-radius: 20px 20px 0 0;
    width: 100%;
    max-height: 80vh;
    padding: 2rem;
    transform: ${props => props.isOpen ? 'translateY(0)' : 'translateY(100%)'};
    transition: transform 0.3s ease;
    overflow-y: auto;
    
    .filter-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
      
      h3 {
        margin: 0;
        font-size: 1.3rem;
      }
      
      button {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: var(--color-gray-500);
      }
    }
  }
  
  @media (min-width: 992px) {
    display: none;
  }
`;

// تعریف نوع فیلترها
interface Filters {
  shelter: boolean;
  hospital: boolean;
  pharmacy: boolean;
  gas: boolean;
  water: boolean;
  open: boolean;
  limited: boolean;
  closed: boolean;
  unknown?: boolean;
  [key: string]: boolean | undefined; // امضای شاخص برای رفع خطا
}

// تبدیل نوع منبع به وضعیت (برای نمایش)
const getResourceStatus = (resource: any): 'open' | 'limited' | 'closed' | 'unknown' => {
  // در API واقعی، این اطلاعات باید از سرور دریافت شود
  // اینجا به صورت تصادفی وضعیت تعیین می‌شود
  const statuses: Array<'open' | 'limited' | 'closed' | 'unknown'> = ['open', 'limited', 'closed', 'unknown'];
  const randomIndex = Math.floor(Math.random() * statuses.length);
  return statuses[randomIndex];
};

// آیکون‌های منابع
const getResourceIcon = (resourceType: string) => {
  const defaultIcon = (
    <span className="material-symbols-rounded">location_on</span>
  );

  switch (resourceType) {
    case 'shelter':
      return (
        <span className="material-symbols-rounded">home</span>
      );
    case 'hospital':
      return (
        <span className="material-symbols-rounded">local_hospital</span>
      );
    case 'pharmacy':
      return (
        <span className="material-symbols-rounded">local_pharmacy</span>
      );
    case 'gas':
      return (
        <span className="material-symbols-rounded">local_gas_station</span>
      );
    case 'water':
      return (
        <span className="material-symbols-rounded">water_drop</span>
      );
    default:
      return defaultIcon;
  }
};

// تبدیل نوع منبع API به کلید داخلی
const mapApiTypeToInternalType = (apiType: string): string => {
  const mapping: { [key: string]: string } = {
    'shelter': 'shelter',
    'hospital': 'hospital',
    'pharmacy': 'pharmacy',
    'gas_station': 'gas',
    'water_supply': 'water',
    'بیمارستان': 'hospital',
    'داروخانه': 'pharmacy',
    'پناهگاه': 'shelter',
    'پمپ بنزین': 'gas',
    'آب': 'water'
  };

  return mapping[apiType] || apiType;
};

const ResourcesMap = () => {
  // تهران به عنوان موقعیت پیش‌فرض
  const defaultLocation: [number, number] = [35.6892, 51.3890];
  
  const [mapCenter, setMapCenter] = useState<[number, number]>(defaultLocation);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [zoom, setZoom] = useState(13);
  const [searchRadius, setSearchRadius] = useState(1000);
  const [searchQuery, setSearchQuery] = useState('');
  const [resources, setResources] = useState<any[]>([]);
  const [filteredResources, setFilteredResources] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  const [filters, setFilters] = useState<Filters>({
    shelter: true,
    hospital: true,
    pharmacy: true,
    gas: true,
    water: true,
    open: true,
    limited: true,
    closed: false,
    unknown: false
  });

  // آیکون‌های منابع برای نقشه
  const resourceIconsForMap: { [key: string]: { color: string, icon: string } } = {
    shelter: { color: resourceTypes.shelter.color, icon: resourceTypes.shelter.icon },
    hospital: { color: resourceTypes.hospital.color, icon: resourceTypes.hospital.icon },
    pharmacy: { color: resourceTypes.pharmacy.color, icon: resourceTypes.pharmacy.icon },
    gas_station: { color: resourceTypes.gas.color, icon: resourceTypes.gas.icon },
    water_supply: { color: resourceTypes.water.color, icon: resourceTypes.water.icon }
  };

  // دریافت موقعیت کاربر از localStorage
  useEffect(() => {
    const fetchUserLocation = async () => {
      setIsLoading(true);
      try {
        // بررسی می‌کنیم آیا کاربر لاگین کرده است و موقعیت مکانی دارد
        const user = getCurrentUser();
        
        if (user && user.lat && user.lng) {
          // استفاده از موقعیت کاربر لاگین شده
          const userLoc: [number, number] = [parseFloat(user.lat), parseFloat(user.lng)];
          setUserLocation(userLoc);
          setMapCenter(userLoc);
          setZoom(15);
          
          // دریافت منابع در اطراف موقعیت کاربر
          await fetchResources(userLoc[0], userLoc[1]);
        } else {
          // اگر کاربر لاگین نکرده یا موقعیت ندارد، از موقعیت پیش‌فرض استفاده می‌کنیم
          alert('موقعیت مکانی شما مشخص نیست. لطفاً ابتدا وارد سیستم شوید و موقعیت خود را وارد کنید تا بتوانیم منابع نزدیک شما را نمایش دهیم.');
          await fetchResources(defaultLocation[0], defaultLocation[1]);
        }
      } catch (error) {
        console.error('Error getting user location:', error);
        await fetchResources(defaultLocation[0], defaultLocation[1]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserLocation();
  }, []);

  // دریافت منابع از API
  const fetchResources = useCallback(async (lat: number, lon: number, newPage = 0) => {
    try {
      setIsLoading(true);
      
      // دریافت منابع برای هر نوع فعال
      const activeTypes = Object.entries(resourceTypes)
        .filter(([key]) => filters[key as keyof typeof filters])
        .map(([_, { apiCategory }]) => apiCategory);
      
      if (activeTypes.length === 0) {
        setResources([]);
        setFilteredResources([]);
        setHasMore(false);
        return;
      }
      
      // دریافت منابع برای هر نوع با استفاده از نشان API
      const promises = activeTypes.map(category => 
        searchNearbyPlaces(lat, lon, category, searchRadius)
      );
      
      const results = await Promise.all(promises);
      const allResources = results.flat();
      
      // اگر هیچ منبعی از API دریافت نشد، از داده‌های نمونه استفاده کن
      if (allResources.length === 0 && newPage === 0) {
        console.log('Using sample data due to API error or no results');
        // فیلتر داده‌های نمونه بر اساس نوع‌های فعال
        const filteredSampleData = sampleResources.filter(resource => 
          activeTypes.includes(resource.subcategory) || 
          (resource.subcategory === 'gas_station' && activeTypes.includes('gas')) ||
          (resource.subcategory === 'water_supply' && activeTypes.includes('water'))
        );
        setResources(filteredSampleData);
        setHasMore(false);
      } else if (newPage === 0) {
        setResources(allResources);
        setHasMore(allResources.length >= 20);
      } else {
        setResources(prev => [...prev, ...allResources]);
        setHasMore(allResources.length >= 20);
      }
      
      setPage(newPage);
    } catch (error) {
      console.error('Error fetching resources:', error);
      // در صورت خطا از داده‌های نمونه استفاده کن
      if (newPage === 0) {
        console.log('Using sample data due to API error');
        setResources(sampleResources);
        setHasMore(false);
      }
    } finally {
      setIsLoading(false);
    }
  }, [filters, searchRadius]);

  // فیلتر کردن منابع بر اساس فیلترها و جستجو
  useEffect(() => {
    const filtered = resources.filter(resource => {
      // فیلتر نوع منبع
      const internalType = mapApiTypeToInternalType(resource.subcategory);
      if (!filters[internalType]) return false;
      
      // فیلتر وضعیت (در API واقعی، این اطلاعات باید از سرور دریافت شود)
      const status = getResourceStatus(resource);
      if (!filters[status]) return false;
      
      // فیلتر جستجو
      const resourceTitle = resource.name || resource.title || '';
      if (searchQuery && 
          !resourceTitle.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !resource.address.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // فیلتر بر اساس فاصله از موقعیت کاربر
      if (userLocation) {
        const resourceLat = resource.location.y || (resource.location.coordinates ? resource.location.coordinates[1] : null);
        const resourceLng = resource.location.x || (resource.location.coordinates ? resource.location.coordinates[0] : null);
        
        if (resourceLat && resourceLng) {
          const distance = calculateDistance(
            userLocation[0], userLocation[1],
            resourceLat, resourceLng
          );
          
          // اضافه کردن فاصله به resource برای نمایش
          resource.distanceFromUser = distance;
          
          // بررسی اینکه آیا منبع در شعاع جستجو قرار دارد یا خیر
          if (distance > searchRadius) {
            return false;
          }
        }
      }
      
      return true;
    });
    
    console.log('Original resources:', resources.length);
    console.log('Filtered resources:', filtered.length);
    
    setFilteredResources(filtered);
  }, [resources, filters, searchQuery, userLocation, searchRadius]);

  // تغییر فیلتر
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  // تغییر شعاع جستجو
  const handleRadiusChange = (value: number) => {
    setSearchRadius(value);
    if (userLocation) {
      fetchResources(userLocation[0], userLocation[1]);
    }
  };

  // بارگذاری بیشتر
  const handleLoadMore = () => {
    fetchResources(mapCenter[0], mapCenter[1], page + 1);
  };

  // مسیریابی به یک منبع
  const handleNavigate = (resource: any) => {
    let lat, lon;
    if (resource.location && resource.location.coordinates) {
      lat = resource.location.coordinates[1];
      lon = resource.location.coordinates[0];
    } else if (resource.location && 'y' in resource.location && 'x' in resource.location) {
      lat = resource.location.y;
      lon = resource.location.x;
    } else {
      return;
    }
    window.open(`https://www.neshan.org/maps/@${lat},${lon},16z`, '_blank');
  };

  // نمایش آیکون مناسب برای وضعیت خالی
  const EmptyStateIcon = () => (
    <span className="material-symbols-rounded" style={{ fontSize: '80px' }}>info</span>
  );
  
  // آیکون برای دکمه فیلتر موبایل
  const FilterIcon = () => (
    <span className="material-symbols-rounded">filter_list</span>
  );

  // محاسبه فاصله بین دو نقطه با استفاده از فرمول هاورساین
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371000; // شعاع زمین به متر
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // فاصله به متر
  };

  return (
    <>
      <Head>
        <title>نقشه منابع حیاتی - پناهگاه امن</title>
        <meta name="description" content="یافتن نزدیک‌ترین پناهگاه‌ها، بیمارستان‌ها و سایر منابع ضروری در شرایط بحران" />
      </Head>
      
      <MainContainer>
        <div className="container">
          <PageHeader>
            <h1>نقشه منابع حیاتی</h1>
            <p>یافتن نزدیک‌ترین پناهگاه‌ها، بیمارستان‌ها، داروخانه‌ها و سایر منابع ضروری در شرایط بحران</p>
          </PageHeader>
          
          <MapContainer>
            <div className="d-none d-lg-block">
              <FilterPanel
                searchQuery={searchQuery}
                onSearchChange={(e) => setSearchQuery(e.target.value)}
                filters={filters}
                onFilterChange={handleFilterChange}
                resourceTypes={resourceTypes}
                radius={searchRadius}
                onRadiusChange={handleRadiusChange}
              />
            </div>
            
            <div>
              <MapViewContainer>
                <MapComponent
                  center={mapCenter}
                  zoom={zoom}
                  resources={filteredResources}
                  isLoading={isLoading}
                  userLocation={userLocation}
                  resourceIcons={resourceIconsForMap}
                />
              </MapViewContainer>
              
              <ResourcesList>
                <ResourcesHeader>
                  <h2>منابع یافت شده</h2>
                  {filteredResources.length > 0 && (
                    <span className="count">{filteredResources.length} مورد</span>
                  )}
                </ResourcesHeader>
                
                {filteredResources.length > 0 ? (
                  <>
                    <ResourcesGrid>
                      {filteredResources.map((resource, index) => {
                        const internalType = mapApiTypeToInternalType(resource.subcategory);
                        const resourceType = resourceTypes[internalType as keyof typeof resourceTypes] || resourceTypes.shelter;
                        const status = getResourceStatus(resource);
                        
                        return (
                          <ResourceCard
                            key={`${resource.name || resource.title || 'unnamed'}-${index}`}
                            resource={resource}
                            icon={getResourceIcon(internalType)}
                            iconColor={resourceType?.color || '#999'}
                            status={status}
                            onNavigate={() => handleNavigate(resource)}
                            distance={resource.distanceFromUser}
                          />
                        );
                      })}
                    </ResourcesGrid>
                    
                    {hasMore && (
                      <LoadMoreButton>
                        <SpinnerButton
                          onClick={handleLoadMore}
                          isLoading={isLoading}
                          rounded={true}
                          size="md"
                          rightIcon={<span className="material-symbols-rounded">arrow_downward</span>}
                        >
                          نمایش موارد بیشتر
                        </SpinnerButton>
                      </LoadMoreButton>
                    )}
                  </>
                ) : (
                  <EmptyState>
                    {isLoading ? (
                      <Spinner 
                        type="ripple"
                        size="large"
                        text="در حال جستجوی منابع، لطفاً منتظر بمانید..."
                        padding="3rem"
                      />
                    ) : (
                      <>
                        <EmptyStateIcon />
                        <h3>هیچ منبعی یافت نشد</h3>
                        <p>
                          با تغییر فیلترها یا افزایش شعاع جستجو، می‌توانید نتایج بیشتری پیدا کنید.
                        </p>
                      </>
                    )}
                  </EmptyState>
                )}
              </ResourcesList>
            </div>
          </MapContainer>
        </div>
      </MainContainer>
      
      {/* دکمه فیلتر برای موبایل */}
      <FloatingButton onClick={() => setMobileFiltersOpen(true)}>
        <FilterIcon />
      </FloatingButton>
      
      {/* پنل فیلتر موبایل */}
      <MobileFilterContainer isOpen={mobileFiltersOpen}>
        <div className="filter-content">
          <div className="filter-header">
            <h3>فیلترها</h3>
            <button onClick={() => setMobileFiltersOpen(false)}>×</button>
          </div>
          <FilterPanel
            searchQuery={searchQuery}
            onSearchChange={(e) => setSearchQuery(e.target.value)}
            filters={filters}
            onFilterChange={handleFilterChange}
            resourceTypes={resourceTypes}
            radius={searchRadius}
            onRadiusChange={handleRadiusChange}
          />
        </div>
      </MobileFilterContainer>
    </>
  );
};

export default ResourcesMap;