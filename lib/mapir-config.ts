// پیکربندی API مپ.آی‌آر
export const MAPIR_API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjY0MTQ2ZDJkMDg3NmIyZjcyZjVkNjE2ZDZhN2MxMDA0YjYwYmY5ZmUwMjE1OTNkYzk2NmI4NWQxY2MxMTk1YjdjZWJhOGQxZGM3NTg2ZjlhIn0.eyJhdWQiOiIzMjk3MCIsImp0aSI6IjY0MTQ2ZDJkMDg3NmIyZjcyZjVkNjE2ZDZhN2MxMDA0YjYwYmY5ZmUwMjE1OTNkYzk2NmI4NWQxY2MxMTk1YjdjZWJhOGQxZGM3NTg2ZjlhIiwiaWF0IjoxNzUwMDcwODU4LCJuYmYiOjE3NTAwNzA4NTgsImV4cCI6MTc1MjY2Mjg1OCwic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.UUKi6DbiYDmWrnU5PSdha1hBnMan7RlXc-I3GA1he3uP8SLT8I5QOSo4XKYihX5yTsiDHMD4MX9ROc--5PiHnbTWumA6rF28MKnjczWXisbQ7basXUBy9M5ZbHSjCAedUzYZOiROmZ2z5w5I7cVlWVsNiEQGgZBgtnMqf7kQCHiiBAk-GHVEm21G0AjG5UIYMgwuik7cEJnzTmVCkTbwcmeqwpy7Ro5nYyXlH4amq0n4UaSngth_-9XSSnljmIXA4_cKwrWKLLfsIZQooNqEfENwC3s6sWCR2HwWg4a83gWv1wMzfuoYWXanr_wnxirhviBNnp271I6HJcjspEI97Q'; // این کلید API برای نمایش است و باید با کلید واقعی جایگزین شود

export const mapirStyles = {
  mapContainer: {
    width: '100%',
    height: '100%',
  },
  mapAttribution: {
    position: 'absolute',
    bottom: '0',
    right: '0',
    direction: 'ltr',
    zIndex: '1',
    padding: '2px 5px',
    background: 'rgba(255, 255, 255, 0.7)',
    fontSize: '10px',
  }
};

// تعریف نوع منابع حیاتی
interface ResourceType {
  title: string;
  icon: string;
  color: string;
  apiCategory: string;
}

// انواع منابع حیاتی
export const resourceTypes: { [key: string]: ResourceType } = {
  shelter: {
    title: 'پناهگاه‌ها',
    icon: 'home',
    color: 'var(--color-primary)',
    apiCategory: 'shelter'
  },
  hospital: {
    title: 'بیمارستان‌ها',
    icon: 'hospital',
    color: 'var(--color-danger)',
    apiCategory: 'hospital'
  },
  pharmacy: {
    title: 'داروخانه‌ها',
    icon: 'plus',
    color: 'var(--color-success)',
    apiCategory: 'pharmacy'
  },
  gas: {
    title: 'پمپ بنزین‌ها',
    icon: 'fuel',
    color: 'var(--color-warning)',
    apiCategory: 'gas_station'
  },
  water: {
    title: 'منابع آب',
    icon: 'droplet',
    color: 'var(--color-info)',
    apiCategory: 'water_supply'
  }
}; 