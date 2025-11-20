import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

const Contacts = () => {
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

  const managedHouses = [
    {
      name: "ЖК Золотое сечение",
      address: "ул. Васенко, д 12 литера А",
      manager: "Екатерина Васильевна Павлова",
      phone: "+7 (921) 334-43-74",
    },
    {
      name: "ЖК Остров",
      address: "Петровский проспект, д. 5, стр. 1",
      manager: "Евдокимов Сергей Борисович",
      phone: "+7 (921) 632-48-39",
    },
    {
      name: "ЖК Пляж",
      address: "Приморское шоссе, д. 352, стр. 1",
      manager: "Павлюк Александр Васильевич",
      phone: "+7 (931) 251-10-40",
    },
    {
      name: "ЖК Панорама",
      address: "Кондратьевский просп, д. 62, корп. 7",
      manager: "Наталья Валерьевна Машкарина",
      phone: "+7 (931) 240-22-37",
    },
    {
      name: "ЖК Наука",
      address: "ул. Академика Константинова, д. 1, корп. 1",
      manager: "Елена Викторовна Суконкина",
      phone: "+7 (921) 366-50-88",
    },
    {
      name: "ЖК Адмирал",
      address: "ул. Одоевского, 21, корп.1 стр. 1",
      manager: "Галина Алексеевна Рожкова",
      phone: "+7 (993) 641-35-95",
    },
  ];

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
            <h2 className="text-3xl font-bold mb-8">Управляющие домами</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {managedHouses.map((house, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon name="Building" className="text-secondary" size={20} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{house.name}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{house.address}</p>
                        <div className="space-y-1">
                          <p className="text-sm">
                            <span className="text-muted-foreground">Управляющий:</span>{" "}
                            <span className="font-medium">{house.manager}</span>
                          </p>
                          <a
                            href={`tel:${house.phone.replace(/\s/g, "")}`}
                            className="text-sm text-primary hover:underline"
                          >
                            {house.phone}
                          </a>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
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
