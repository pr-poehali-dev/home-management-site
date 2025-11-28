import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Icon from "@/components/ui/icon";
import { houses, type HouseData } from "@/data/housesData";

const Houses = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [cityFilter, setCityFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  // Данные домов импортированы из @/data/housesData
  
  const deleteMeLater = [
    {
      id: "bugry-petrovskiy-28",
      address: "Петровский бульвар, д. 28",
      city: "Бугры",
      manager: "Галина Викторовна Топал",
      managerPhone: "Уточняйте в офисе",
      type: "Жилой дом",
    },
    {
      id: "kudrovo-oblastnaya-3",
      address: "ул. Областная, д. 3",
      city: "Кудрово",
      manager: "Анна Николаевна Кочевова",
      managerPhone: "+7 (921) 385-79-31",
      type: "Жилой дом",
    },
    {
      id: "kudrovo-oblastnaya-5k1",
      address: "ул. Областная, д. 5, корп. 1",
      city: "Кудрово",
      manager: "Анна Николаевна Кочевова",
      managerPhone: "+7 (921) 385-79-31",
      type: "Жилой дом",
    },
    {
      id: "kudrovo-oblastnaya-5k2",
      address: "ул. Областная, д. 5, корп. 2",
      city: "Кудрово",
      manager: "Анна Николаевна Кочевова",
      managerPhone: "+7 (921) 385-79-31",
      type: "Жилой дом",
    },
    {
      id: "kudrovo-oblastnaya-5k3",
      address: "ул. Областная, д. 5, корп. 3",
      city: "Кудрово",
      manager: "Анна Николаевна Кочевова",
      managerPhone: "+7 (921) 385-79-31",
      type: "Жилой дом",
    },
    {
      id: "kudrovo-oblastnaya-5k5",
      address: "ул. Областная, д. 5, корп. 5",
      city: "Кудрово",
      manager: "Анна Николаевна Кочевова",
      managerPhone: "+7 (921) 385-79-31",
      type: "Жилой дом",
    },
    {
      id: "kudrovo-oblastnaya-5k6",
      address: "ул. Областная, д. 5, корп. 6",
      city: "Кудрово",
      manager: "Анна Николаевна Кочевова",
      managerPhone: "+7 (921) 385-79-31",
      type: "Жилой дом",
    },
    {
      id: "kudrovo-oblastnaya-7",
      address: "ул. Областная, д. 7",
      city: "Кудрово",
      manager: "Станислав Александрович Мельников",
      managerPhone: "+7 (931) 586-19-77",
      type: "Жилой дом",
    },
    {
      id: "kudrovo-oblastnaya-9k1",
      address: "ул. Областная, д. 9, к. 1",
      city: "Кудрово",
      manager: "Станислав Александрович Мельников",
      managerPhone: "+7 (931) 586-19-77",
      type: "Жилой дом",
    },
    {
      id: "kudrovo-oblastnaya-9k2",
      address: "ул. Областная, д. 9, к. 2",
      city: "Кудрово",
      manager: "Станислав Александрович Мельников",
      managerPhone: "+7 (931) 586-19-77",
      type: "Жилой дом",
    },
    {
      id: "kudrovo-kashtanovaya-2",
      address: "Каштановая аллея, д. 2",
      city: "Кудрово",
      manager: "Марина Николаевна Мельникова",
      managerPhone: "+7 (921) 357-34-09",
      type: "Жилой дом",
    },
    {
      id: "kudrovo-kashtanovaya-3",
      address: "Каштановая аллея, д. 3",
      city: "Кудрово",
      manager: "Марина Николаевна Мельникова",
      managerPhone: "+7 (921) 357-34-09",
      type: "Жилой дом",
    },
    {
      id: "kudrovo-stroiteley-2",
      address: "просп. Строителей, д. 2",
      city: "Кудрово",
      manager: "Анастасия Олеговна Сажнева",
      managerPhone: "+7 (999) 024-61-74",
      type: "Жилой дом",
    },
    {
      id: "kudrovo-stroiteley-4",
      address: "просп. Строителей, д. 4",
      city: "Кудрово",
      manager: "Анастасия Олеговна Сажнева",
      managerPhone: "+7 (999) 024-61-74",
      type: "Жилой дом",
    },
    {
      id: "kudrovo-stroiteley-6",
      address: "просп. Строителей, д. 6",
      city: "Кудрovo",
      manager: "Анастасия Олеговна Сажнева",
      managerPhone: "+7 (999) 024-61-74",
      type: "Жилой дом",
    },
    {
      id: "kudrovo-leningradskaya-9-8",
      address: "ул. Ленинградская, д. 9/8",
      city: "Кудрово",
      manager: "Анастасия Олеговна Сажнева",
      managerPhone: "+7 (999) 024-61-74",
      type: "Жилой дом",
    },
    {
      id: "murino-vorontsovskiy-23-11",
      address: "Воронцовский бульвар, д. 23/11",
      city: "Мурино",
      manager: "Виктория Валерьевна Саврандейкина",
      managerPhone: "+7 (921) 954-33-94",
      type: "Жилой дом",
    },
    {
      id: "spb-sad-vremeni",
      address: 'пос. "Сад Времени", ул. Беловой, д. 1г, стр. 1',
      city: "Санкт-Петербург",
      manager: "Александр Васильевич Павлюк",
      managerPhone: "+7 (931) 251-10-40",
      type: "Посёлок",
    },
    {
      id: "spb-primorskoe-352",
      address: "Приморское шоссе, д. 352, стр. 1",
      city: "Санкт-Петербург",
      manager: "Александр Васильевич Павлюк",
      managerPhone: "+7 (931) 251-10-40",
      type: 'ЖК "Пляж"',
    },
    {
      id: "spb-vasenko-12a",
      address: "ул. Васенко, д. 12, лит. А",
      city: "Санкт-Петербург",
      manager: "Екатерина Васильевна Павлова",
      managerPhone: "+7 (921) 334-43-74",
      type: 'ЖК "Золотое Сечение"',
    },
    {
      id: "spb-vasenko-12b",
      address: "ул. Васенко, д. 12, лит. Б",
      city: "Санкт-Петербург",
      manager: "Алексей Сергеевич Стекольников",
      managerPhone: "+7 (953) 365-65-05",
      type: "Паркинг",
    },
    {
      id: "spb-fermskoe-20k3",
      address: "Фермское ш., д. 20, корп. 3",
      city: "Санкт-Петербург",
      manager: "Алексей Сергеевич Стекольников",
      managerPhone: "+7 (953) 365-65-05",
      type: "Паркинг",
    },
    {
      id: "spb-fermskoe-22k2",
      address: "Фермское ш., д. 22, корп. 2",
      city: "Санкт-Петербург",
      manager: "Алексей Сергеевич Стекольников",
      managerPhone: "+7 (953) 365-65-05",
      type: "Паркинг",
    },
    {
      id: "spb-fermskoe-22k3",
      address: "Фермское шоссе, 22, корп. 3",
      city: "Санкт-Петербург",
      manager: "Павел Львович Моисеев",
      managerPhone: "+7 (921) 954-31-94",
      type: "Жилой дом",
    },
    {
      id: "spb-zelenogorskaya-12",
      address: "ул. Зеленогорская, д. 12, лит. В",
      city: "Санкт-Петербург",
      manager: "Алексей Сергеевич Стекольников",
      managerPhone: "+7 (953) 365-65-05",
      type: "Паркинг",
    },
    {
      id: "spb-kondratyevskiy-62k1",
      address: "Кондратьевский просп., д. 62, корп. 1",
      city: "Санкт-Петербург",
      manager: "Наталья Валерьевна Машкарина",
      managerPhone: "+7 (931) 240-22-37",
      type: "Жилой дом",
    },
    {
      id: "spb-kondratyevskiy-62k2",
      address: "Кондратьевский просп., д. 62, корп. 2",
      city: "Санкт-Петербург",
      manager: "Наталья Валерьевна Машкарина",
      managerPhone: "+7 (931) 240-22-37",
      type: "Жилой дом",
    },
    {
      id: "spb-kondratyevskiy-62k7",
      address: "Кондратьевский просп., д. 62, корп. 7",
      city: "Санкт-Петербург",
      manager: "Наталья Валерьевна Машкарина",
      managerPhone: "+7 (931) 240-22-37",
      type: 'ЖК "Панорама"',
    },
    {
      id: "spb-kondratyevskiy-66k1",
      address: "Кондратьевский просп., д. 66, корп. 1",
      city: "Санкт-Петербург",
      manager: "Наталья Валерьевна Машкарина",
      managerPhone: "+7 (931) 240-22-37",
      type: "Жилой дом",
    },
    {
      id: "spb-metallistov-116",
      address: "просп. Металлистов, д. 116, корп. 1, лит. А",
      city: "Санкт-Петербург",
      manager: "Екатерина Васильевна Павлова",
      managerPhone: "+7 (921) 334-43-74",
      type: 'ЖК "Золотое Сечение"',
    },
    {
      id: "spb-petrovskiy-5",
      address: "Петровский проспект, д. 5, стр. 1",
      city: "Санкт-Петербург",
      manager: "Сергей Борисович Евдокимов",
      managerPhone: "+7 (921) 632-48-39",
      type: 'ЖК "Остров"',
    },
    {
      id: "spb-zelenina-24",
      address: "ул. Большая Зеленина, д. 24, стр. 1",
      city: "Санкт-Петербург",
      manager: "Галина Алексеевна Рожкова",
      managerPhone: "+7 (993) 641-35-95",
      type: 'БЦ "Грани"',
    },
    {
      id: "spb-konstantinova-1",
      address: "ул. Академика Константинова, д. 1, корп. 1, стр. 1",
      city: "Санкт-Петербург",
      manager: "Елена Викторовна Суконкина",
      managerPhone: "+7 (921) 366-50-88",
      type: 'ЖК "Наука"',
    },
    {
      id: "spb-buharestskaya-12",
      address: "ул. Малая Бухарестская, д. 12, стр. 1",
      city: "Санкт-Петербург",
      manager: "Наталья Геннадьевна Мурашова",
      managerPhone: "+7 (931) 388-65-80",
      type: 'ЖК "Новое Купчино"',
    },
    {
      id: "spb-odoevskogo-21",
      address: "ул. Одоевского, 21, корп.1, стр. 1",
      city: "Санкт-Петербург",
      manager: "Галина Алексеевна Рожкова",
      managerPhone: "+7 (993) 641-35-95",
      type: 'ЖК "Адмирал"',
    },
    {
      id: "spb-remeslennaya-21",
      address: "ул. Ремесленная, 21, стр. 1",
      city: "Санкт-Петербург",
      manager: "Галина Алексеевна Рожкова",
      managerPhone: "+7 (993) 641-35-95",
      type: 'Апарт-отель "Аватар"',
    },
    {
      id: "spb-bulvar-belyh-3",
      address: "Бульвар Белых ночей, д. 3",
      city: "Санкт-Петербург",
      manager: "Вера Ивановна Бакшеева",
      managerPhone: "+7 (921) 337-43-41",
      type: "Жилой дом",
    },
    {
      id: "spb-admiralteyskaya-3",
      address: "ул. Адмиралтейская, д. 3",
      city: "Санкт-Петербург",
      manager: "Ольга Вадимовна Васильева",
      managerPhone: "+7 (921) 943-72-93",
      type: "ЖК NewПитер",
    },
    {
      id: "spb-admiralteyskaya-9",
      address: "ул. Адмиралтейская, д. 9",
      city: "Санкт-Петербург",
      manager: "Вера Ивановна Бакшеева",
      managerPhone: "+7 (921) 337-43-41",
      type: "ЖК NewПитер",
    },
    {
      id: "spb-admiralteyskaya-11",
      address: "ул. Адмиралтейская, д. 11",
      city: "Санкт-Петербург",
      manager: "Вера Ивановна Бакшеева",
      managerPhone: "+7 (921) 337-43-41",
      type: "Жилой дом",
    },
    {
      id: "spb-admiralteyskaya-1",
      address: "ул. Адмиралтейская, д. 1",
      city: "Санкт-Петербург",
      manager: "Ольга Вадимовна Васильева",
      managerPhone: "+7 (921) 943-72-93",
      type: "ЖК NewПитер",
    },
    {
      id: "spb-nevskaya-1",
      address: "ул. Невская, д. 1",
      city: "Санкт-Петербург",
      manager: "Вера Ивановна Бакшеева",
      managerPhone: "+7 (921) 337-43-41",
      type: "ЖК NewПитер",
    },
    {
      id: "spb-nevskaya-3",
      address: "ул. Невская, д. 3",
      city: "Санкт-Петербург",
      manager: "Вера Ивановна Бакшеева",
      managerPhone: "+7 (921) 337-43-41",
      type: "ЖК NewПитер",
    },
    {
      id: "spb-nevskaya-4",
      address: "ул. Невская, д. 4",
      city: "Санкт-Петербург",
      manager: "Ольга Вадимовна Васильева",
      managerPhone: "+7 (921) 943-72-93",
      type: "ЖК NewПитер",
    },
    {
      id: "spb-nevskaya-5-7",
      address: "ул. Невская, д. 5/7",
      city: "Санкт-Петербург",
      manager: "Вера Ивановна Бакшеева",
      managerPhone: "+7 (921) 337-43-41",
      type: "ЖК NewПитер",
    },
    {
      id: "spb-nevskaya-6",
      address: "ул. Невская, д. 6",
      city: "Санкт-Петербург",
      manager: "Ольга Вадимовна Васильева",
      managerPhone: "+7 (921) 943-72-93",
      type: "ЖК NewПитер",
    },
    {
      id: "spb-nevskaya-10-5",
      address: "ул. Невская, д. 10/5",
      city: "Санкт-Петербург",
      manager: "Ольга Вадимовна Васильева",
      managerPhone: "+7 (921) 943-72-93",
      type: "ЖК NewПитер",
    },
    {
      id: "spb-piterskiy-1",
      address: "Питерский проспект, д. 1",
      city: "Санкт-Петербург",
      manager: "Ольга Вадимовна Васильева",
      managerPhone: "+7 (921) 943-72-93",
      type: "ЖК NewПитер",
    },
    {
      id: "spb-piterskiy-5",
      address: "Питерский проспект, д. 5",
      city: "Санкт-Петербург",
      manager: "Ольга Вадимовна Васильева",
      managerPhone: "+7 (921) 943-72-93",
      type: "ЖК NewПитер",
    },
    {
      id: "spb-piterskiy-7",
      address: "Питерский проспект, д. 7",
      city: "Санкт-Петербург",
      manager: "Ольга Вадимовна Васильева",
      managerPhone: "+7 (921) 943-72-93",
      type: "ЖК NewПитер",
    },
    {
      id: "spb-krasnoselskoe-4",
      address: "Красносельское ш., д. 4",
      city: "Санкт-Петербург",
      manager: "Алексей Сергеевич Стекольников",
      managerPhone: "+7 (953) 365-65-05",
      type: "Паркинг",
    },
    {
      id: "spb-krasnoselskoe-6",
      address: "Красносельское ш., д. 6",
      city: "Санкт-Петербург",
      manager: "Ольга Вадимовна Васильева",
      managerPhone: "+7 (921) 943-72-93",
      type: "ЖК NewПитер",
    },
    {
      id: "spb-krasnoselskoe-8",
      address: "Красносельское ш., д. 8",
      city: "Санкт-Петербург",
      manager: "Алексей Сергеевич Стекольников",
      managerPhone: "+7 (953) 365-65-05",
      type: "Паркинг",
    },
    {
      id: "spb-krasnoselskoe-16",
      address: "Красносельское ш., д. 16",
      city: "Санкт-Петербург",
      manager: "Вера Ивановна Бакшеева",
      managerPhone: "+7 (921) 337-43-41",
      type: "ЖК NewПитер",
    },
    {
      id: "spb-krasnoselskoe-20",
      address: "Красносельское ш., д. 20",
      city: "Санкт-Петербург",
      manager: "Алексей Сергеевич Стекольников",
      managerPhone: "+7 (953) 365-65-05",
      type: "Паркинг",
    },
  ];

  const cities = ["all", "Санкт-Петербург", "Кудрово", "Мурино", "Бугры"];
  
  const objectTypes = [
    "all",
    "Жилой дом",
    "ЖК NewПитер",
    "Паркинг",
    "ЖК",
    "Посёлок",
    "БЦ",
    "Апарт-отель",
  ];

  const filteredHouses = houses.filter((house) => {
    const matchesSearch =
      house.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      house.manager.toLowerCase().includes(searchQuery.toLowerCase()) ||
      house.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      house.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCity = cityFilter === "all" || house.city === cityFilter;
    const matchesType =
      typeFilter === "all" ||
      house.type === typeFilter ||
      (typeFilter === "ЖК" && house.type.startsWith("ЖК"));
    return matchesSearch && matchesCity && matchesType;
  });

  const groupedHouses = filteredHouses.reduce((acc, house) => {
    if (!acc[house.city]) {
      acc[house.city] = [];
    }
    acc[house.city].push(house);
    return acc;
  }, {} as Record<string, HouseData[]>);

  return (
    <Layout>
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: 'url(https://cdn.poehali.dev/files/e82cdb10-7c4a-409c-8933-b2d34b87cffc.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundAttachment: 'fixed',
          imageRendering: 'crisp-edges',
          filter: 'brightness(1.15) contrast(1.1)',
        }}
      >
        <div className="absolute inset-0 bg-background/55"></div>
      </div>
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Дома в управлении</h1>
            <p className="text-xl text-muted-foreground">
              Полный список объектов под управлением УК «Наш Дом»
            </p>
          </div>

          <div className="max-w-6xl mx-auto mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div className="relative md:col-span-3">
                    <Icon
                      name="Search"
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                      size={20}
                    />
                    <Input
                      placeholder="Поиск по адресу, управляющему или типу..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={cityFilter} onValueChange={setCityFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите город" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все города</SelectItem>
                      {cities.slice(1).map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Тип объекта" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все типы</SelectItem>
                      {objectTypes.slice(1).map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {(searchQuery || cityFilter !== "all" || typeFilter !== "all") && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchQuery("");
                        setCityFilter("all");
                        setTypeFilter("all");
                      }}
                      className="w-full md:w-auto"
                    >
                      <Icon name="X" size={16} className="mr-2" />
                      Сбросить
                    </Button>
                  )}
                </div>
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Icon name="Info" size={16} />
                    <span>Найдено объектов: {filteredHouses.length}</span>
                  </div>
                  {(cityFilter !== "all" || typeFilter !== "all") && (
                    <div className="flex items-center gap-2 flex-wrap">
                      {cityFilter !== "all" && (
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                          <Icon name="MapPin" size={14} />
                          {cityFilter}
                        </div>
                      )}
                      {typeFilter !== "all" && (
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm">
                          <Icon name="Building2" size={14} />
                          {typeFilter}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {Object.entries(groupedHouses).map(([city, cityHouses]) => (
            <div key={city} className="max-w-6xl mx-auto mb-12">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Icon name="MapPin" className="text-primary" size={28} />
                {city}
                <span className="text-lg font-normal text-muted-foreground">
                  ({cityHouses.length})
                </span>
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {cityHouses.map((house) => (
                  <Card
                    key={house.id}
                    className="hover:shadow-lg transition-all cursor-pointer group"
                    onClick={() => navigate(`/houses/${house.id}`)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex-1">
                          <div className="flex items-start gap-3 mb-2">
                            <Icon
                              name="Building2"
                              className="text-primary mt-1 flex-shrink-0"
                              size={20}
                            />
                            <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                              {house.address}
                            </h3>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{house.type}</p>
                        </div>
                        <Icon
                          name="ChevronRight"
                          className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0"
                          size={20}
                        />
                      </div>
                      <div className="border-t pt-4 space-y-3">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Управляющая компания:</p>
                          <p className="font-medium text-sm">{house.company}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Управляющий:</p>
                          <p className="font-medium text-sm mb-2">{house.manager}</p>
                          <a
                            href={`tel:${house.managerPhone.replace(/\s|\(|\)|\//g, "")}`}
                            onClick={(e) => e.stopPropagation()}
                            className="text-sm text-primary hover:underline flex items-center gap-2"
                          >
                            <Icon name="Phone" size={14} />
                            {house.managerPhone}
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}

          {filteredHouses.length === 0 && (
            <div className="max-w-6xl mx-auto text-center py-16">
              <Icon name="SearchX" size={64} className="text-muted-foreground mx-auto mb-6" />
              <h3 className="text-2xl font-semibold mb-4">Ничего не найдено</h3>
              <p className="text-muted-foreground mb-6">
                Попробуйте изменить параметры поиска или фильтры
              </p>
              <Button
                onClick={() => {
                  setSearchQuery("");
                  setCityFilter("all");
                  setTypeFilter("all");
                }}
              >
                Сбросить фильтры
              </Button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Houses;