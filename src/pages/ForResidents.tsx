import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Icon from "@/components/ui/icon";

const ForResidents = () => {
  const guides = [
    {
      title: "Как передать показания счётчиков",
      icon: "Zap",
      steps: [
        "Снимите показания со счётчика электроэнергии (5 цифр до запятой)",
        "Войдите в личный кабинет на сайте или используйте форму на главной странице",
        "Введите показания и нажмите 'Отправить'",
        "Показания принимаются с 20 по 25 число каждого месяца",
        "При возникновении проблем обращайтесь в диспетчерскую службу",
      ],
    },
    {
      title: "Как оплатить коммунальные услуги",
      icon: "CreditCard",
      steps: [
        "Получите квитанцию в почтовом ящике или скачайте из личного кабинета",
        "Оплатить можно: через банк, онлайн-банкинг, терминалы оплаты, Почту России",
        "При оплате через интернет используйте номер лицевого счёта из квитанции",
        "Оплата должна поступить до 10 числа следующего месяца",
        "Храните квитанции об оплате в течение 3 лет",
      ],
    },
    {
      title: "Правила содержания домашних животных",
      icon: "Dog",
      steps: [
        "Выгул собак разрешён только на специально отведённых площадках",
        "Владелец обязан убирать за питомцем на территории дома",
        "Крупные собаки должны быть в наморднике и на поводке",
        "Запрещено выгуливать животных на детских и спортивных площадках",
        "В случае нарушений соседи могут обратиться в управляющую компанию",
      ],
    },
    {
      title: "Как подать заявку на ремонт",
      icon: "Wrench",
      steps: [
        "Позвоните в диспетчерскую службу по телефону 467-77-77",
        "Или оставьте заявку через личный кабинет на сайте",
        "Укажите адрес, суть проблемы и контактный телефон",
        "Диспетчер зарегистрирует заявку и сообщит сроки выполнения работ",
        "В случае аварии заявка выполняется в первоочередном порядке",
      ],
    },
    {
      title: "Правила пользования лифтом",
      icon: "Building",
      steps: [
        "Не перегружайте кабину лифта (максимум указан на табличке)",
        "Не открывайте двери лифта принудительно",
        "В случае застревания нажмите кнопку вызова диспетчера",
        "Не разрешайте детям до 7 лет пользоваться лифтом без взрослых",
        "При обнаружении неисправностей сообщите в диспетчерскую",
      ],
    },
    {
      title: "Правила парковки во дворе",
      icon: "Car",
      steps: [
        "Парковка разрешена только на специально отведённых местах",
        "Запрещена парковка на газонах, детских и спортивных площадках",
        "Не перекрывайте проезды для спецтехники и машин экстренных служб",
        "Скорость движения во дворе не более 5 км/ч",
        "При нарушениях соседи могут вызвать эвакуатор через полицию",
      ],
    },
  ];

  const contacts = [
    {
      title: "Диспетчерская служба",
      icon: "Phone",
      info: "467-77-77",
      description: "Круглосуточно, аварийные заявки",
    },
    {
      title: "Бухгалтерия",
      icon: "Calculator",
      info: "пн-пт: 9:00 - 18:00",
      description: "Вопросы по оплате и начислениям",
    },
    {
      title: "Офис УК",
      icon: "MapPin",
      info: "Санкт-Петербург, ул. Большая Зеленина, д. 24",
      description: "пн-пт: 9:00 - 18:00, обед: 13:00 - 14:00",
    },
  ];

  return (
    <Layout>
      <section className="py-20 bg-gradient-to-br from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Для жильцов</h1>
            <p className="text-xl text-muted-foreground">
              Полезная информация, инструкции и правила для комфортного проживания
            </p>
          </div>

          <div className="max-w-5xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-8">Инструкции и руководства</h2>
            <Accordion type="single" collapsible className="space-y-4">
              {guides.map((guide, index) => (
                <Card key={index}>
                  <AccordionItem value={`guide-${index}`} className="border-none">
                    <AccordionTrigger className="px-6 py-4 hover:no-underline">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Icon name={guide.icon as any} className="text-primary" size={24} />
                        </div>
                        <h3 className="text-lg font-semibold text-left">{guide.title}</h3>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                      <ol className="space-y-3 pt-4">
                        {guide.steps.map((step, stepIndex) => (
                          <li key={stepIndex} className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                              {stepIndex + 1}
                            </span>
                            <span className="text-muted-foreground">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </AccordionContent>
                  </AccordionItem>
                </Card>
              ))}
            </Accordion>
          </div>

          <div className="max-w-5xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-8">Контакты служб</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {contacts.map((contact, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon name={contact.icon as any} className="text-primary" size={24} />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{contact.title}</h3>
                    <p className="text-primary font-medium mb-2">{contact.info}</p>
                    <p className="text-sm text-muted-foreground">{contact.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="max-w-5xl mx-auto">
            <Card className="bg-secondary/5">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <Icon name="AlertCircle" className="text-secondary mt-1 flex-shrink-0" size={28} />
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Важная информация</h3>
                    <div className="space-y-3 text-muted-foreground">
                      <p>
                        • При аварийных ситуациях (прорыв труб, отключение электричества, запах газа)
                        немедленно звоните в диспетчерскую службу
                      </p>
                      <p>
                        • Плановые работы по отключению коммуникаций анонсируются заранее через
                        объявления в подъездах и на сайте
                      </p>
                      <p>
                        • Соблюдение правил проживания — залог комфорта всех жильцов дома
                      </p>
                      <p>
                        • Если у вас есть предложения по улучшению работы УК, свяжитесь с нами через
                        форму обратной связи или лично в офисе
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

export default ForResidents;