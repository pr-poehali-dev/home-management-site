import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

const Services = () => {
  const services = [
    {
      category: "Управление",
      icon: "ClipboardList",
      items: [
        "Организация и контроль всех рабочих процессов",
        "Взаимодействие с собственниками жилья",
        "Финансовое планирование и бухгалтерский учет",
        "Юридическое сопровождение договорной деятельности",
      ],
    },
    {
      category: "Техническое обслуживание",
      icon: "Wrench",
      items: [
        "Обслуживание инженерных систем здания",
        "Технический надзор за состоянием общего имущества",
        "Подготовка к сезонной эксплуатации",
        "Текущий ремонт общего имущества дома",
        "Устранение аварий и неисправностей",
        "Выполнение работ по заявкам жителей",
      ],
    },
    {
      category: "Санитарное содержание",
      icon: "Sparkles",
      items: [
        "Поддержание чистоты мест общего пользования",
        "Санитарное содержание придомовой территории",
        "Сбор и вывоз твердых бытовых отходов",
      ],
    },
    {
      category: "Благоустройство",
      icon: "Trees",
      items: [
        "Уход за зелеными насаждениями",
        "Обслуживание предметов интерьера",
        "Разработка проектов благоустройства территории",
      ],
    },
    {
      category: "Обеспечение безопасности",
      icon: "Shield",
      items: [
        "Круглосуточная охрана жилого комплекса",
        "Организация службы видеонаблюдения",
        "Контроль доступа на территорию",
        "Взаимодействие с органами полиции и пожарной инспекции",
      ],
    },
    {
      category: "Диспетчерская служба",
      icon: "Clock",
      items: [
        "Круглосуточное дежурство диспетчера",
        "Постоянный контроль за инженерными системами",
        "Вызов аварийных служб при необходимости",
        "Прием обращений от жителей",
      ],
    },
  ];

  return (
    <Layout>
      <section className="py-20 bg-gradient-to-br from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Наши услуги</h1>
            <p className="text-xl text-muted-foreground">
              Полный комплекс услуг по управлению многоквартирными домами
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon name={service.icon as any} className="text-primary" size={28} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{service.category}</h3>
                  <ul className="space-y-2">
                    {service.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Icon name="Check" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;