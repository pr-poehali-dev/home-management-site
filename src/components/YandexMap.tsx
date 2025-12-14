import { useEffect, useRef } from 'react';
import { houses as housesData } from '@/data/housesData';

interface YandexMapProps {
  onHouseSelect?: (houseId: number) => void;
}

declare global {
  interface Window {
    ymaps: any;
  }
}

const YandexMap = ({ onHouseSelect }: YandexMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://api-maps.yandex.ru/2.1/?apikey=&lang=ru_RU';
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.ymaps.ready(() => {
        if (!mapRef.current) return;

        const map = new window.ymaps.Map(mapRef.current, {
          center: [59.95, 30.45],
          zoom: 10,
          controls: ['zoomControl', 'fullscreenControl']
        });

        const addressCoords: {[key: string]: [number, number]} = {
          "пр. Металлистов, д. 116, корп. 1 лит. А (+ паркинг)": [60.0095, 30.4405],
          "ул. Васенко, д. 12 лит. А": [59.9915, 30.4655],
          "Фермское шоссе, д. 22, корп. 3 лит. А": [60.0185, 30.4295],
          "пр. Кондратьевский, д. 62, корп. 1 лит. А": [60.0051, 30.4172],
          "пр. Кондратьевский, д. 62, корп. 2 лит. А": [60.0055, 30.4185],
          "пр. Кондратьевский, д. 66, корп. 1 лит. А": [60.0062, 30.4198],
          "Красносельское шоссе, д. 6": [59.7345, 29.5425],
          "Красносельское шоссе, д. 16": [59.7348, 29.5428],
          "ул. Адмиралтейская, д. 1": [59.7380, 29.5460],
          "ул. Адмиралтейская, д. 3": [59.7382, 29.5462],
          "ул. Адмиралтейская, д. 9": [59.7386, 29.5466],
          "ул. Адмиралтейская, д. 11": [59.7388, 29.5468],
          "ул. Большая Зеленина, д. 24 стр. 1 + паркинг": [59.9620, 30.3080],
          "пр. Питерский, д. 1": [59.7355, 29.5435],
          "пр. Питерский, д. 5": [59.7358, 29.5438],
          "пр. Питерский, д. 7": [59.7361, 29.5441],
          "ул. Невская, д. 1": [59.7365, 29.5445],
          "ул. Невская, д. 3": [59.7368, 29.5448],
          "ул. Невская, д. 4": [59.7370, 29.5450],
          "ул. Невская, д. 5/7": [59.7372, 29.5452],
          "ул. Невская, д. 6": [59.7374, 29.5454],
          "ул. Невская, д. 10/5": [59.7378, 29.5458],
          "пр. Ручьевский, д. 13": [60.0285, 30.4195],
          "пр. Ручьевский, д. 15": [60.0290, 30.4200],
          "пр. Ручьевский, д. 17 корп. 1": [60.0295, 30.4205],
          "ул. Шувалова, д. 33/35": [60.0125, 30.3945],
          "ул. Шувалова, д. 37": [60.0130, 30.3950],
          "ул. Шувалова, д. 39/21": [60.0135, 30.3955],
          "ул. Романовская, д. 2": [59.8845, 30.4765],
          "ул. Одоевского, д. 21, корп. 1 стр. 1": [59.9985, 30.3895],
          "ул. Благодатная, д. 50 стр. 1": [59.8715, 30.3225],
          "ул. Решетникова, д. 29 стр. 1": [59.9845, 30.4125],
          "пр. Московский, д. 72 корп. 2 стр. 1": [59.8515, 30.3185],
          "бульвар Белых Ночей, д. 3": [59.7390, 29.5470],
          "ул. Малая Бухарестская, д. 12 стр. 1": [59.8785, 30.3525],
          "ул. Областная, д. 3": [59.9095, 30.5185],
          "ул. Областная, д. 5, корп. 1": [59.9105, 30.5195],
          "ул. Областная, д. 5, корп. 2": [59.9108, 30.5198],
          "ул. Областная, д. 5, корп. 3": [59.9111, 30.5201],
          "ул. Областная, д. 5, корп. 5": [59.9117, 30.5207],
          "ул. Областная, д. 5, корп. 6": [59.9120, 30.5210],
          "ул. Областная, д. 7": [59.9125, 30.5215],
          "ул. Ленинградская, д. 9/8 + паркинг": [59.9085, 30.5145],
          "пр. Строителей, д. 1, корп. 1": [59.9135, 30.5225],
          "пр. Строителей, д. 1, корп. 2": [59.9138, 30.5228],
          "пр. Строителей, д. 2": [59.9145, 30.5235],
          "пр. Строителей, д. 3": [59.9155, 30.5245],
          "пр. Строителей, д. 4": [59.9165, 30.5255],
          "пр. Строителей, д. 5": [59.9175, 30.5265],
          "пр. Строителей, д. 5 корп. 1": [59.9178, 30.5268],
          "ул. Солнечная, д. 2": [59.9205, 30.5295],
          "ул. Солнечная, д. 12": [59.9215, 30.5305],
          "б-р Воронцовский, д. 23/11": [60.0485, 30.4295],
          "г. Бугры, пр. Петровский, д. 28": [60.0685, 30.3895]
        };

        const residentialHouses = housesData.filter(h => h.type === "Жилой дом");
        
        residentialHouses.forEach((house, index) => {
          const coords = addressCoords[house.address];
          
          if (coords) {
            const placemark = new window.ymaps.Placemark(
              coords,
              {
                balloonContentHeader: `<strong>${house.address}</strong>`,
                balloonContentBody: `
                  <div style="max-width: 250px;">
                    <p style="margin: 8px 0; color: #666;">${house.company}</p>
                    <p style="margin: 8px 0;"><strong>Менеджер:</strong> ${house.manager}</p>
                    <p style="margin: 8px 0;"><strong>Телефон:</strong> <a href="tel:${house.managerPhone}">${house.managerPhone}</a></p>
                    <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${house.managerEmail}">${house.managerEmail}</a></p>
                    <p style="margin: 8px 0;"><strong>Приём:</strong> ${house.receptionSchedule}</p>
                  </div>
                `,
                hintContent: house.address,
                iconContent: String(index + 1)
              },
              {
                preset: 'islands#blueStretchyIcon',
                iconColor: '#1e40af'
              }
            );

            placemark.events.add('click', () => {
              if (onHouseSelect) {
                onHouseSelect(index + 1);
              }
            });

            map.geoObjects.add(placemark);
          }
        });
      });
    };

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [onHouseSelect]);

  return <div ref={mapRef} className="w-full h-full min-h-[500px]" />;
};

export default YandexMap;