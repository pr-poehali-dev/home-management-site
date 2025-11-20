import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { houses } from "@/data/housesData";

interface CompanyInfo {
  id: string;
  name: string;
  shortName: string;
  description: string;
  address?: string;
  phone: string;
  email: string;
  features: string[];
}

const CompanyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const companies: CompanyInfo[] = [
    {
      id: "uk-nash-dom-sity",
      name: 'ООО "УК "Наш дом-Сити"',
      shortName: "Наш дом-Сити",
      description: "Управление многоквартирными домами в центральных районах Санкт-Петербурга",
      phone: "+7 (812) 640-88-26",
      email: "uk.nashdom@inbox.ru",
      features: [
        "Управление ЖК премиум-класса",
        "Круглосуточная диспетчерская служба",
        "Комплексное техническое обслуживание",
        "Благоустройство придомовых территорий",
      ],
    },
    {
      id: "uk-nash-dom-polyustrovo",
      name: 'ООО "УК "Наш дом-Полюстрово"',
      shortName: "Наш дом-Полюстрово",
      description: 'Управление ЖК "Панорама" на Кондратьевском проспекте',
      phone: "+7 (812) 640-88-26",
      email: "uk.nashdom@inbox.ru",
      features: [
        "Индивидуальный подход к жителям",
        "Современные системы безопасности",
        "Качественное содержание общего имущества",
        "Оперативное реагирование на заявки",
      ],
    },
    {
      id: "uk-sityhome",
      name: 'ООО УК "СИТИХОУМ"',
      shortName: "СИТИХОУМ",
      description: 'Управление ЖК "Адмирал" на улице Одоевского',
      phone: "+7 (812) 640-88-26",
      email: "uk.nashdom@inbox.ru",
      features: [
        "Управление элитной недвижимостью",
        "Высокие стандарты обслуживания",
        "Персональный управляющий",
        "VIP-сервис для жителей",
      ],
    },
    {
      id: "uk-ostrov-grad",
      name: 'ООО "УК "Остров-Град"',
      shortName: "Остров-Град",
      description:
        "Управление элитными жилыми комплексами и бизнес-центрами в Санкт-Петербурге",
      phone: "+7 (812) 640-88-26",
      email: "uk.nashdom@inbox.ru",
      features: [
        "Управление премиальной недвижимостью",
        "Высококвалифицированный персонал",
        "Индивидуальные решения для каждого объекта",
        "Полный спектр услуг по управлению",
      ],
    },
    {
      id: "uk-novoe-kupchino",
      name: 'ООО "УК "Новое Купчино"',
      shortName: "Новое Купчино",
      description: 'Управление ЖК "Новое Купчино" на Малой Бухарестской',
      phone: "+7 (812) 640-88-26",
      email: "uk.nashdom@inbox.ru",
      features: [
        "Комплексное управление ЖК",
        "Современная инфраструктура",
        "Развитая сеть услуг",
        "Активная работа с жителями",
      ],
    },
    {
      id: "uk-nash-dom-region",
      name: 'ООО «УК «Наш дом – Регион»',
      shortName: "Наш дом – Регион",
      description: "Управление домами в Мурино и Кудрово, Ленинградская область",
      phone: "+7 (812) 640-88-26",
      email: "uk.nashdom@inbox.ru",
      features: [
        "Управление в Ленинградской области",
        "Опыт работы в новостройках",
        "Качественное обслуживание жилого фонда",
        "Быстрое реагирование на обращения",
      ],
    },
    {
      id: "uk-nash-dom-kudrovo-grad",
      name: 'ООО «УК «Наш дом-Кудрово Град»',
      shortName: "Наш дом-Кудрово Град",
      description: "Управление жилыми комплексами в городе Кудрово",
      phone: "+7 (812) 640-88-26",
      email: "uk.nashdom@inbox.ru",
      features: [
        "Специализация на Кудрово",
        "Знание местной специфики",
        "Профессиональная команда",
        "Современные методы управления",
      ],
    },
    {
      id: "uk-kudrovo-dom",
      name: 'ООО «УК «Кудрово-Дом»',
      shortName: "Кудрово-Дом",
      description: "Комплексное управление многоквартирными домами в Кудрово",
      phone: "+7 (812) 640-88-26",
      email: "uk.nashdom@inbox.ru",
      features: [
        "Полный цикл управления МКД",
        "Квалифицированные специалисты",
        "Прозрачность финансовых операций",
        "Регулярная отчетность перед жителями",
      ],
    },
    {
      id: "uk-kudrovo-service",
      name: 'ООО «УК «Кудрово-Сервис»',
      shortName: "Кудрово-Сервис",
      description: "Качественное обслуживание жилых домов в Кудрово",
      phone: "+7 (812) 640-88-26",
      email: "uk.nashdom@inbox.ru",
      features: [
        "Акцент на качество обслуживания",
        "Оперативное решение проблем",
        "Профессиональный сервис",
        "Забота о комфорте жителей",
      ],
    },
    {
      id: "uk-nash-dom-kudrovo",
      name: 'ООО «УК «Наш дом-Кудрово»',
      shortName: "Наш дом-Кудрово",
      description: "Профессиональное управление недвижимостью в Кудрово",
      phone: "+7 (812) 640-88-26",
      email: "uk.nashdom@inbox.ru",
      features: [
        "Комплексный подход к управлению",
        "Опытная команда специалистов",
        "Эффективное использование ресурсов",
        "Постоянное совершенствование сервиса",
      ],
    },
    {
      id: "uk-nash-dom-novoselye",
      name: 'ООО «УК «Наш Дом Новоселье»',
      shortName: "Наш Дом Новоселье",
      description: 'Управление крупнейшим ЖК "NewПитер" в поселке Новоселье',
      phone: "+7 (812) 640-88-26",
      email: "uk.nashdom@inbox.ru",
      features: [
        "Управление крупным ЖК",
        "Развитая инфраструктура комплекса",
        "Высокий уровень благоустройства",
        "Социальная активность жителей",
      ],
    },
    {
      id: "uk-usadba",
      name: 'ООО «УК «Усадьба»',
      shortName: "Усадьба",
      description: 'Управление коттеджным поселком "Сад времени"',
      phone: "+7 (812) 640-88-26",
      email: "uk.nashdom@inbox.ru",
      features: [
        "Специализация на коттеджных поселках",
        "Индивидуальный подход",
        "Ландшафтный дизайн и благоустройство",
        "Охрана и безопасность",
      ],
    },
    {
      id: "uk-city-parking",
      name: 'ООО «Сити Паркинг»',
      shortName: "Сити Паркинг",
      description: "Специализированное управление паркингами в Санкт-Петербурге",
      phone: "+7 (812) 640-88-26",
      email: "uk.nashdom@inbox.ru",
      features: [
        "Экспертиза в управлении паркингами",
        "Системы безопасности и контроля",
        "Техническое обслуживание оборудования",
        "Круглосуточная охрана",
      ],
    },
  ];

  const company = companies.find((c) => c.id === id);

  if (!company) {
    return (
      <Layout>
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <Icon name="AlertCircle" size={64} className="text-muted-foreground mx-auto mb-6" />
            <h1 className="text-3xl font-bold mb-4">Компания не найдена</h1>
            <p className="text-muted-foreground mb-8">
              К сожалению, запрашиваемая компания не существует
            </p>
            <Button onClick={() => navigate("/companies")}>
              <Icon name="ArrowLeft" size={16} />
              Вернуться к списку
            </Button>
          </div>
        </section>
      </Layout>
    );
  }

  const companyHouses = houses.filter((house) => house.company === company.name);
  const citiesCount = new Set(companyHouses.map((h) => h.city)).size;

  return (
    <Layout>
      <section className="py-12 bg-gradient-to-br from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/companies")}
            className="mb-6 hover:bg-primary/10"
          >
            <Icon name="ArrowLeft" size={16} />
            Назад к списку компаний
          </Button>

          <div className="max-w-5xl mx-auto">
            <Card className="mb-8">
              <CardContent className="p-8 md:p-12">
                <div className="flex items-start gap-6 mb-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon name="Building2" className="text-primary" size={32} />
                  </div>
                  <div className="flex-1">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">{company.name}</h1>
                    <p className="text-lg text-muted-foreground mb-6">{company.description}</p>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-lg">
                        <Icon name="Home" size={20} className="text-primary" />
                        <span className="font-semibold">{companyHouses.length}</span>
                        <span className="text-muted-foreground">
                          {companyHouses.length === 1
                            ? "объект"
                            : companyHouses.length < 5
                            ? "объекта"
                            : "объектов"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-lg">
                        <Icon name="MapPin" size={20} className="text-secondary" />
                        <span className="font-semibold">{citiesCount}</span>
                        <span className="text-muted-foreground">
                          {citiesCount === 1 ? "город" : "города"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 pt-6 border-t">
                  <Card className="bg-secondary/5">
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-4 flex items-center gap-2">
                        <Icon name="Phone" size={20} className="text-primary" />
                        Телефон
                      </h3>
                      <a
                        href={`tel:${company.phone.replace(/\s|\(|\)|\//g, "")}`}
                        className="text-lg text-primary hover:underline font-medium"
                      >
                        {company.phone}
                      </a>
                      <p className="text-sm text-muted-foreground mt-2">
                        Круглосуточная диспетчерская служба
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-secondary/5">
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-4 flex items-center gap-2">
                        <Icon name="Mail" size={20} className="text-primary" />
                        Электронная почта
                      </h3>
                      <a
                        href={`mailto:${company.email}`}
                        className="text-lg text-primary hover:underline font-medium"
                      >
                        {company.email}
                      </a>
                      <p className="text-sm text-muted-foreground mt-2">
                        Для обращений и предложений
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            <h2 className="text-2xl font-bold mb-6">Наши преимущества</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {company.features.map((feature, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Icon
                        name="CheckCircle2"
                        className="text-primary flex-shrink-0 mt-0.5"
                        size={20}
                      />
                      <p className="text-sm">{feature}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <h2 className="text-2xl font-bold mb-6">Объекты под управлением</h2>
            <div className="grid gap-4 mb-8">
              {companyHouses.map((house) => (
                <Card
                  key={house.id}
                  className="hover:shadow-lg transition-all cursor-pointer group"
                  onClick={() => navigate(`/houses/${house.id}`)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start gap-3 mb-3">
                          <Icon
                            name="Building2"
                            className="text-primary mt-1 flex-shrink-0"
                            size={20}
                          />
                          <div>
                            <h3 className="font-semibold text-lg group-hover:text-primary transition-colors mb-1">
                              {house.address}
                            </h3>
                            <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Icon name="MapPin" size={14} />
                                {house.city}
                              </span>
                              <span className="flex items-center gap-1">
                                <Icon name="Home" size={14} />
                                {house.type}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="border-t pt-3">
                          <p className="text-xs text-muted-foreground mb-1">Управляющий:</p>
                          <p className="text-sm font-medium">{house.manager}</p>
                        </div>
                      </div>
                      <Icon
                        name="ChevronRight"
                        className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0"
                        size={20}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-muted/50">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                  <Icon name="Info" className="text-primary" size={24} />
                  Как связаться с нами
                </h3>
                <div className="space-y-4 text-muted-foreground">
                  <div className="flex items-start gap-3">
                    <Icon name="PhoneCall" className="mt-1 flex-shrink-0" size={20} />
                    <div>
                      <p className="font-medium text-foreground mb-1">
                        Круглосуточная диспетчерская служба
                      </p>
                      <p className="text-sm">Приём аварийных заявок и срочных вопросов 24/7</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="Clock" className="mt-1 flex-shrink-0" size={20} />
                    <div>
                      <p className="font-medium text-foreground mb-1">График работы офиса</p>
                      <p className="text-sm">Понедельник - Пятница: 9:00 - 18:00</p>
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

export default CompanyDetail;
