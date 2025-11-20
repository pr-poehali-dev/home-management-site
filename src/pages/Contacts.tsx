import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";

const Contacts = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const departments = [
    {
      title: "Диспетчерская служба",
      icon: "PhoneCall",
      phone: "+7 (812) 640-88-26",
      schedule: "Круглосуточно, без выходных",
      description: "Приём аварийных заявок, срочные вопросы",
    },
    {
      title: "Отдел работы с жильцами",
      icon: "Users",
      phone: "+7 (812) 640-88-26",
      schedule: "пн-пт: 9:00 - 18:00",
      description: "Общие вопросы, заявки на плановый ремонт",
    },
    {
      title: "Бухгалтерия",
      icon: "Calculator",
      phone: "+7 (812) 640-88-26",
      schedule: "пн-пт: 9:00 - 18:00, обед: 13:00 - 14:00",
      description: "Вопросы по начислениям и оплате",
    },
    {
      title: "Юридический отдел",
      icon: "Scale",
      phone: "+7 (812) 640-88-26",
      schedule: "пн-пт: 9:00 - 18:00",
      description: "Консультации по договорам и правовым вопросам",
    },
    {
      title: "Технический отдел",
      icon: "Wrench",
      phone: "+7 (812) 640-88-26",
      schedule: "пн-пт: 9:00 - 18:00",
      description: "Вопросы по техническому обслуживанию",
    },
    {
      title: "Отдел благоустройства",
      icon: "Trees",
      phone: "+7 (812) 640-88-26",
      schedule: "пн-пт: 9:00 - 18:00",
      description: "Благоустройство территории, озеленение",
    },
  ];

  const officeInfo = {
    address: "Санкт-Петербург, ул. Большая Зеленина, д. 24, стр. 1",
    schedule: "пн-пт: 9:00 - 18:00, сб-вс: выходной",
    lunch: "Обеденный перерыв: 13:00 - 14:00",
    metro: "м. Чкаловская, м. Спортивная",
  };

  const emails = [
    { label: "Основная почта", email: "uk.nashdom@inbox.ru" },
    { label: "Дополнительная почта", email: "uk.nash-dom@mail.ru" },
  ];

  const managers = [
    {
      name: "Александр Васильевич Павлюк",
      phone: "+7 (931) 251-10-40",
      objects: [
        'Посёлок "Сад Времени", ул. Беловой, д. 1г, стр. 1',
        'ЖК "Пляж", Приморское шоссе, д. 352, стр. 1',
      ],
    },
    {
      name: "Алексей Сергеевич Стекольников",
      phone: "+7 (953) 365-65-05",
      objects: [
        "Паркинг на Васенко, д. 12, литера Б",
        "Паркинг на Фермском, д. 20, корп. 3",
        "Паркинг на Фермском, д. 22, корп 2",
        "Паркинг на Зеленогорской, д. 12, литера В",
        "Паркинг на Красносельском ш., д. 20",
        "Паркинг на Красносельском ш., д. 8",
        "Паркинг на Красносельском ш., д. 4",
      ],
    },
    {
      name: "Наталья Валерьевна Машкарина",
      phone: "+7 (931) 240-22-37",
      objects: [
        "Кондратьевский просп., д. 66, корп. 1",
        "Кондратьевский просп., д. 62, корп. 2",
        "Кондратьевский просп., д. 62, корп. 1",
        'ЖК "Панорама", Кондратьевский просп., д. 62, корп. 7',
      ],
    },
    {
      name: "Екатерина Васильевна Павлова",
      phone: "+7 (921) 334-43-74",
      objects: [
        'ЖК "Золотое Сечение", ул. Васенко, д. 12, литера А',
        'ЖК "Золотое Сечение", просп. Металлистов, д. 116, корп. 1 литера А',
      ],
    },
    {
      name: "Павел Львович Моисеев",
      phone: "+7 (921) 954-31-94",
      objects: ["Фермское шоссе, д. 22, корп. 3"],
    },
    {
      name: "Сергей Борисович Евдокимов",
      phone: "+7 (921) 632-48-39",
      objects: ['ЖК "Остров", Петровский проспект, д. 5, стр. 1'],
    },
    {
      name: "Галина Алексеевна Рожкова",
      phone: "+7 (993) 641-35-95",
      objects: [
        'БЦ "Грани", ул. Большая Зеленина, д. 24, стр. 1',
        'ЖК "Адмирал", ул. Одоевского, д. 21, корп. 1, стр. 1',
        'Апарт-отель "Аватар", ул. Ремесленная, д. 21, стр. 1',
      ],
    },
    {
      name: "Елена Викторовна Суконкина",
      phone: "+7 (921) 366-50-88",
      objects: ['ЖК "Наука", ул. Академика Константинова, д. 1, корп. 1, стр. 1'],
    },
    {
      name: "Наталья Геннадьевна Мурашова",
      phone: "+7 (931) 388-65-80",
      objects: ['ЖК "Новое Купчино", ул. Малая Бухарестская, д. 12, стр. 1'],
    },
    {
      name: "Вера Ивановна Бакшеева",
      phone: "+7 (921) 337-43-41",
      objects: [
        "Бульвар Белых Ночей, д. 3",
        "Ул. Адмиралтейская, д. 11",
        "ЖК NewПитер, Невская улица, д. 5/7",
        "ЖК NewПитер, Невская улица, д. 3",
        "ЖК NewПитер, Невская улица, д. 1",
        "ЖК NewПитер, Адмиралтейская улица, д. 9",
        "ЖК NewПитер, Красносельское шоссе, д. 16",
      ],
    },
    {
      name: "Ольга Вадимовна Васильева",
      phone: "+7 (921) 943-72-93 / +7 (921) 943-73-93",
      objects: [
        "ЖК NewПитер, Питерский проспект, д. 7",
        "ЖК NewПитер, Питерский проспект, д. 5",
        "ЖК NewПитер, Невская улица, д. 4",
        "ЖК NewПитер, Адмиралтейская улица, д. 3",
        "ЖК NewПитер, Невская улица, д. 10/5",
        "ЖК NewПитер, Невская улица, д. 6",
        "ЖК NewПитер, Адмиралтейская улица, д. 1",
        "ЖК NewПитер, Питерский проспект, д. 1",
        "ЖК NewПитер, Красносельское шоссе, д. 6",
      ],
    },
    {
      name: "Галина Викторовна Топал",
      phone: "Уточняйте в офисе",
      objects: ["г. Бугры, Петровский бульвар, д. 28"],
    },
    {
      name: "Виктория Валерьевна Саврандейкина",
      phone: "+7 (921) 954-33-94",
      objects: ["Мурино, Воронцовский бульвар, д. 23/11"],
    },
    {
      name: "Анна Николаевна Кочевова",
      phone: "+7 (921) 385-79-31",
      objects: [
        "Кудрово, ул. Областная, д. 5, корп. 1, 2, 3, 5, 6",
        "Кудрово, ул. Областная, д. 3",
      ],
    },
    {
      name: "Станислав Александрович Мельников",
      phone: "+7 (931) 586-19-77",
      objects: [
        "Кудрово, ул. Областная, д. 9, корп. 2",
        "Кудрово, ул. Областная, д. 9 К1",
        "Кудрово, ул. Областная, д. 7",
      ],
    },
    {
      name: "Марина Николаевна Мельникова",
      phone: "+7 (921) 357-34-09",
      objects: ["Кудрово, Каштановая аллея, д. 2", "Кудрово, Каштановая аллея, д. 3"],
    },
    {
      name: "Анастасия Олеговна Сажнева",
      phone: "+7 (999) 024-61-74",
      objects: [
        "Кудрово, просп. Строителей, д. 2",
        "Кудрово, просп. Строителей, д. 6",
        "Кудрово, просп. Строителей, д. 4",
        "Кудрово, ул. Ленинградская, д. 9/8",
      ],
    },
  ];

  const filteredManagers = managers.filter(
    (manager) =>
      manager.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      manager.objects.some((obj) => obj.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <Layout>
      <section className="py-20 bg-gradient-to-br from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Контакты и реквизиты</h1>
            <p className="text-xl text-muted-foreground">
              Вся необходимая контактная информация для связи с нашими специалистами
            </p>
          </div>

          <div className="max-w-6xl mx-auto mb-16">
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                      <Icon name="Building2" size={28} />
                      Офис управляющей компании
                    </h2>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Icon name="MapPin" className="flex-shrink-0 mt-1" size={20} />
                        <p className="text-lg">{officeInfo.address}</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <Icon name="Clock" className="flex-shrink-0 mt-1" size={20} />
                        <div>
                          <p className="text-lg">{officeInfo.schedule}</p>
                          <p className="text-sm opacity-90">{officeInfo.lunch}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Icon name="Train" className="flex-shrink-0 mt-1" size={20} />
                        <p className="text-lg">{officeInfo.metro}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                      <Icon name="Mail" size={24} />
                      Электронная почта
                    </h3>
                    <div className="space-y-3">
                      {emails.map((item, index) => (
                        <div key={index}>
                          <p className="text-sm opacity-90">{item.label}</p>
                          <a href={`mailto:${item.email}`} className="text-lg hover:underline">
                            {item.email}
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="max-w-6xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-8">Отделы и службы</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {departments.map((dept, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon name={dept.icon as any} className="text-primary" size={24} />
                    </div>
                    <h3 className="text-lg font-semibold mb-3">{dept.title}</h3>
                    <a
                      href={`tel:${dept.phone.replace(/\s/g, "")}`}
                      className="text-primary font-medium hover:underline block mb-2"
                    >
                      {dept.phone}
                    </a>
                    <p className="text-sm text-muted-foreground mb-2">{dept.schedule}</p>
                    <p className="text-xs text-muted-foreground">{dept.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">Управляющие домами</h2>
              <div className="relative w-full max-w-sm">
                <Icon
                  name="Search"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  size={20}
                />
                <Input
                  placeholder="Поиск по адресу или управляющему..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {filteredManagers.map((manager, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon name="UserCircle" className="text-secondary" size={24} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">{manager.name}</h3>
                        <a
                          href={`tel:${manager.phone.replace(/\s|\(|\)|\//g, "")}`}
                          className="text-primary hover:underline font-medium"
                        >
                          {manager.phone}
                        </a>
                      </div>
                    </div>
                    <div className="border-t pt-4">
                      <p className="text-sm font-medium text-muted-foreground mb-2">
                        Обслуживаемые объекты:
                      </p>
                      <ul className="space-y-1">
                        {manager.objects.map((obj, objIndex) => (
                          <li key={objIndex} className="text-sm flex items-start gap-2">
                            <Icon
                              name="MapPin"
                              size={14}
                              className="text-muted-foreground mt-1 flex-shrink-0"
                            />
                            <span>{obj}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredManagers.length === 0 && (
              <div className="text-center py-12">
                <Icon name="SearchX" size={48} className="text-muted-foreground mx-auto mb-4" />
                <p className="text-xl text-muted-foreground">
                  По вашему запросу ничего не найдено
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Попробуйте изменить поисковый запрос
                </p>
              </div>
            )}
          </div>

          <div className="max-w-6xl mx-auto mt-16">
            <Card className="bg-muted/50">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <Icon name="Info" className="text-primary mt-1 flex-shrink-0" size={28} />
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Как с нами связаться</h3>
                    <div className="space-y-3 text-muted-foreground">
                      <p>
                        • <strong>По телефону:</strong> Круглосуточная диспетчерская служба готова
                        принять ваш звонок в любое время
                      </p>
                      <p>
                        • <strong>По электронной почте:</strong> Отправьте письмо на любой из наших
                        адресов, ответим в течение 1 рабочего дня
                      </p>
                      <p>
                        • <strong>Лично в офисе:</strong> Приходите в рабочие часы, наши
                        специалисты проконсультируют вас по любым вопросам
                      </p>
                      <p>
                        • <strong>Через управляющего дома:</strong> Свяжитесь напрямую с
                        управляющим вашего дома для решения локальных вопросов
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

export default Contacts;
