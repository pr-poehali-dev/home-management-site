import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { houses } from "@/data/housesData";

const HouseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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
      city: "Кудрово",
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

  const house = houses.find((h) => h.id === id);

  if (!house) {
    return (
      <Layout>
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <Icon name="AlertCircle" size={64} className="text-muted-foreground mx-auto mb-6" />
            <h1 className="text-3xl font-bold mb-4">Объект не найден</h1>
            <p className="text-muted-foreground mb-8">
              К сожалению, запрашиваемый объект не существует
            </p>
            <Button onClick={() => navigate("/houses")}>
              <Icon name="ArrowLeft" size={16} />
              Вернуться к списку
            </Button>
          </div>
        </section>
      </Layout>
    );
  }

  const services = [
    {
      icon: "Wrench",
      title: "Техническое обслуживание",
      description: "Регулярное обслуживание инженерных систем и оборудования",
    },
    {
      icon: "Droplets",
      title: "Водоснабжение и водоотведение",
      description: "Контроль и обслуживание систем холодного и горячего водоснабжения",
    },
    {
      icon: "Zap",
      title: "Электроснабжение",
      description: "Обслуживание электросетей и освещения общих помещений",
    },
    {
      icon: "Thermometer",
      title: "Отопление",
      description: "Поддержание комфортной температуры в отопительный сезон",
    },
    {
      icon: "Broom",
      title: "Уборка территории",
      description: "Регулярная уборка придомовой территории и подъездов",
    },
    {
      icon: "Trees",
      title: "Благоустройство",
      description: "Озеленение и содержание придомовой территории",
    },
  ];

  return (
    <Layout>
      <section className="py-12 bg-gradient-to-br from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/houses")}
            className="mb-6 hover:bg-primary/10"
          >
            <Icon name="ArrowLeft" size={16} />
            Назад к списку домов
          </Button>

          <div className="max-w-5xl mx-auto">
            <Card className="mb-8">
              <CardContent className="p-8 md:p-12">
                <div className="flex items-start gap-6 mb-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon name="Building2" className="text-primary" size={32} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <h1 className="text-3xl md:text-4xl font-bold mb-2">{house.address}</h1>
                        <div className="flex items-center gap-4 text-muted-foreground">
                          <span className="flex items-center gap-2">
                            <Icon name="MapPin" size={16} />
                            {house.city}
                          </span>
                          <span className="flex items-center gap-2">
                            <Icon name="Home" size={16} />
                            {house.type}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 pt-6 border-t">
                  <Card className="bg-secondary/5">
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-4 flex items-center gap-2">
                        <Icon name="Building" size={20} className="text-primary" />
                        Управляющая компания
                      </h3>
                      <p className="text-sm font-medium">{house.company}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Обслуживающая организация
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-secondary/5">
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-4 flex items-center gap-2">
                        <Icon name="UserCircle" size={20} className="text-primary" />
                        Ваш управляющий
                      </h3>
                      <p className="text-sm font-medium mb-3">{house.manager}</p>
                      <a
                        href={`tel:${house.managerPhone.replace(/\s|\(|\)|\//g, "")}`}
                        className="flex items-center gap-2 text-primary hover:underline text-sm font-medium"
                      >
                        <Icon name="Phone" size={16} />
                        {house.managerPhone}
                      </a>
                    </CardContent>
                  </Card>

                  <Card className="bg-secondary/5">
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-4 flex items-center gap-2">
                        <Icon name="PhoneCall" size={20} className="text-primary" />
                        Диспетчерская служба
                      </h3>
                      <a
                        href="tel:+78124677777"
                        className="flex items-center gap-2 text-primary hover:underline font-medium text-sm mb-3"
                      >
                        <Icon name="Phone" size={16} />
                        467-77-77
                      </a>
                      <p className="text-xs text-muted-foreground">
                        Круглосуточно для аварийных заявок
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            <h2 className="text-2xl font-bold mb-6">Услуги для вашего дома</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {services.map((service, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon name={service.icon as any} className="text-primary" size={24} />
                    </div>
                    <h3 className="font-semibold mb-2">{service.title}</h3>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-muted/50">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                  <Icon name="Info" className="text-primary" size={24} />
                  Полезная информация
                </h3>
                <div className="space-y-4 text-muted-foreground">
                  <div className="flex items-start gap-3">
                    <Icon name="Clock" className="mt-1 flex-shrink-0" size={20} />
                    <div>
                      <p className="font-medium text-foreground mb-1">График работы офиса</p>
                      <p className="text-sm">
                        Понедельник - Пятница: 9:00 - 18:00
                        <br />
                        Обед: 13:00 - 14:00
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="Mail" className="mt-1 flex-shrink-0" size={20} />
                    <div>
                      <p className="font-medium text-foreground mb-1">Электронная почта</p>
                      <a
                        href="mailto:uk.nashdom@inbox.ru"
                        className="text-sm text-primary hover:underline"
                      >
                        uk.nashdom@inbox.ru
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="MapPin" className="mt-1 flex-shrink-0" size={20} />
                    <div>
                      <p className="font-medium text-foreground mb-1">Адрес офиса</p>
                      <p className="text-sm">
                        Санкт-Петербург, ул. Большая Зеленина, д. 24, стр. 1
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HouseDetail;