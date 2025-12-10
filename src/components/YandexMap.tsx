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

        const residentialHouses = housesData.filter(h => h.type === "Жилой дом");
        let loadedCount = 0;
        
        residentialHouses.forEach((house, index) => {
          const fullAddress = `${house.city}, ${house.address}`;
          
          window.ymaps.geocode(fullAddress, { 
            results: 1,
            kind: 'house'
          }).then((res: any) => {
            const firstGeoObject = res.geoObjects.get(0);
            if (firstGeoObject) {
              const coords = firstGeoObject.geometry.getCoordinates();
              
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
              
              loadedCount++;
              if (loadedCount === 1) {
                map.setCenter(coords, 11);
              }
            }
          }).catch((err: any) => {
            console.error('Ошибка геокодирования для адреса:', fullAddress, err);
          });
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