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
        
        residentialHouses.forEach((house, index) => {
          const fullAddress = `${house.city}, ${house.address}`;
          
          window.ymaps.geocode(fullAddress, { results: 1 }).then((res: any) => {
            const firstGeoObject = res.geoObjects.get(0);
            if (firstGeoObject) {
              const coords = firstGeoObject.geometry.getCoordinates();
              
              const placemark = new window.ymaps.Placemark(
                coords,
                {
                  balloonContentHeader: house.address,
                  balloonContentBody: `<strong>${house.company}</strong><br/>${house.manager}<br/>${house.managerPhone}`,
                  hintContent: house.address
                },
                {
                  preset: 'islands#blueBuildingCircleIcon',
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
          }).catch((err: any) => {
            console.error('Geocoding error for:', fullAddress, err);
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