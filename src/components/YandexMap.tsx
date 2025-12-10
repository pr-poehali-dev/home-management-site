import { useEffect, useRef } from 'react';

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

        const houses = [
          { coords: [59.9915, 30.4655], name: 'ЖК Золотое Сечение', address: 'Санкт-Петербург, ул. Васенко, д. 12 лит. А', id: 1 },
          { coords: [60.0051, 30.4172], name: 'ЖК Панорама', address: 'Санкт-Петербург, пр. Кондратьевский, д. 62, корп. 1 лит. А', id: 2 },
          { coords: [60.0055, 30.4185], name: 'ЖК Панорама', address: 'Санкт-Петербург, пр. Кондратьевский, д. 62, корп. 2 лит. А', id: 3 },
          { coords: [60.0062, 30.4198], name: 'ЖК Панорама', address: 'Санкт-Петербург, пр. Кондратьевский, д. 66, корп. 1 лит. А', id: 4 },
          { coords: [60.0095, 30.4405], name: 'ЖК Полюстрово', address: 'Санкт-Петербург, пр. Металлистов, д. 116, корп. 1 лит. А', id: 5 },
          { coords: [60.0185, 30.4295], name: 'ЖК Полюстрово', address: 'Санкт-Петербург, Фермское шоссе, д. 22, корп. 3 лит. А', id: 6 },
          { coords: [59.9095, 30.7285], name: 'Кудрово', address: 'Кудрово, Европейский пр., д. 4, корп. 2', id: 7 },
          { coords: [59.9105, 30.7315], name: 'Кудрово', address: 'Кудрово, Европейский пр., д. 6, корп. 2', id: 8 },
          { coords: [59.9115, 30.7345], name: 'Кудрово', address: 'Кудрово, Европейский пр., д. 8, корп. 2', id: 9 },
          { coords: [60.0035, 30.4565], name: 'ЖК Остров', address: 'Санкт-Петербург, Полюстровский пр., д. 59', id: 10 }
        ];

        houses.forEach((house) => {
          const placemark = new window.ymaps.Placemark(
            house.coords,
            {
              balloonContentHeader: house.name,
              balloonContentBody: house.address,
              hintContent: house.name
            },
            {
              preset: 'islands#blueBuildingCircleIcon',
              iconColor: '#1e40af'
            }
          );

          placemark.events.add('click', () => {
            if (onHouseSelect) {
              onHouseSelect(house.id);
            }
          });

          map.geoObjects.add(placemark);
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