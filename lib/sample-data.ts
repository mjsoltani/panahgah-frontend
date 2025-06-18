import { MapirResource } from '../api/mapir';

// داده‌های نمونه برای نمایش در صورت خطای API
export const sampleResources: MapirResource[] = [
  {
    province: "تهران",
    county: "تهران",
    district: "منطقه 6",
    city: "تهران",
    region: "منطقه 6 شهر تهران",
    neighborhood: "محله ولیعصر",
    village: "",
    name: "پناهگاه شهید بهشتی",
    address: "خیابان ولیعصر، نرسیده به میدان ونک، کوچه شهید حسینی",
    type: "point",
    subcategory: "shelter",
    location: {
      type: "point",
      coordinates: [51.4089, 35.7248]
    },
    distance: {
      amount: 450,
      unit: "meters"
    }
  },
  {
    province: "تهران",
    county: "تهران",
    district: "منطقه 2",
    city: "تهران",
    region: "منطقه 2 شهر تهران",
    neighborhood: "محله صادقیه",
    village: "",
    name: "بیمارستان میلاد",
    address: "اتوبان همت، روبروی شهرک غرب",
    type: "point",
    subcategory: "hospital",
    location: {
      type: "point",
      coordinates: [51.3672, 35.7598]
    },
    distance: {
      amount: 850,
      unit: "meters"
    }
  },
  {
    province: "تهران",
    county: "تهران",
    district: "منطقه 6",
    city: "تهران",
    region: "منطقه 6 شهر تهران",
    neighborhood: "محله طالقانی",
    village: "",
    name: "داروخانه هلال احمر",
    address: "خیابان طالقانی، تقاطع خیابان حافظ",
    type: "point",
    subcategory: "pharmacy",
    location: {
      type: "point",
      coordinates: [51.4167, 35.7019]
    },
    distance: {
      amount: 620,
      unit: "meters"
    }
  },
  {
    province: "تهران",
    county: "تهران",
    district: "منطقه 1",
    city: "تهران",
    region: "منطقه 1 شهر تهران",
    neighborhood: "محله صدر",
    village: "",
    name: "پمپ بنزین صدر",
    address: "بزرگراه صدر، خروجی کامرانیه",
    type: "point",
    subcategory: "gas_station",
    location: {
      type: "point",
      coordinates: [51.4304, 35.7938]
    },
    distance: {
      amount: 1200,
      unit: "meters"
    }
  },
  {
    province: "تهران",
    county: "تهران",
    district: "منطقه 5",
    city: "تهران",
    region: "منطقه 5 شهر تهران",
    neighborhood: "محله اکباتان",
    village: "",
    name: "مخزن آب اضطراری منطقه 5",
    address: "شهرک اکباتان، فاز 3، جنب پارک نسترن",
    type: "point",
    subcategory: "water_supply",
    location: {
      type: "point",
      coordinates: [51.3089, 35.7123]
    },
    distance: {
      amount: 1500,
      unit: "meters"
    }
  }
]; 