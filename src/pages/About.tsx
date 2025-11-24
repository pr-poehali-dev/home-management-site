import { Link, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { houses } from "@/data/housesData";

const About = () => {
  const navigate = useNavigate();

  const companyData = [
    { id: "uk-nash-dom-sity", name: 'ООО «УК «Наш дом-Сити»' },
    { id: "uk-nash-dom-polyustrovo", name: 'ООО «УК «Наш дом-Полюстрово»' },
    { id: "uk-sityhome", name: 'ООО УК «СИТИХОУМ»' },
    { id: "uk-ostrov-grad", name: 'ООО «УК «Остров-Град»' },
    { id: "uk-novoe-kupchino", name: 'ООО «УК «Новое Купчино»' },
    { id: "uk-nash-dom-region", name: 'ООО «УК «Наш дом – Регион»' },
    { id: "uk-nash-dom-kudrovo-grad", name: 'ООО «УК «Наш дом-Кудрово Град»' },
    { id: "uk-kudrovo-dom", name: 'ООО «УК «Кудрово-Дом»' },
    { id: "uk-kudrovo-service", name: 'ООО «УК «Кудрово-Сервис»' },
    { id: "uk-nash-dom-kudrovo", name: 'ООО «УК «Наш дом-Кудрово»' },
    { id: "uk-nash-dom-novoselye", name: 'ООО «УК «Наш Дом Новоселье»' },
    { id: "uk-usadba", name: 'ООО «УК «Усадьба»' },
    { id: "uk-city-parking", name: 'ООО «Сити Паркинг»' },
  ];

  const companyHouseCounts = {
    'ООО «УК «Наш дом-Сити»': houses.filter(h => h.company === 'ООО «УК «Наш дом-Сити»').length,
    'ООО «УК «Наш дом-Полюстрово»': houses.filter(h => h.company === 'ООО «УК «Наш дом-Полюстрово»').length,
    'ООО УК «СИТИХОУМ»': houses.filter(h => h.company === 'ООО УК «СИТИХОУМ»').length,
    'ООО «УК «Остров-Град»': houses.filter(h => h.company === 'ООО «УК «Остров-Град»').length,
    'ООО «УК «Новое Купчино»': houses.filter(h => h.company === 'ООО «УК «Новое Купчино»').length,
    'ООО «УК «Наш дом – Регион»': houses.filter(h => h.company === 'ООО «УК «Наш дом – Регион»').length,
    'ООО «УК «Наш дом-Кудрово Град»': houses.filter(h => h.company === 'ООО «УК «Наш дом-Кудрово Град»').length,
    'ООО «УК «Кудрово-Дом»': houses.filter(h => h.company === 'ООО «УК «Кудрово-Дом»').length,
    'ООО «УК «Кудрово-Сервис»': houses.filter(h => h.company === 'ООО «УК «Кудрово-Сервис»').length,
    'ООО «УК «Наш дом-Кудрово»': houses.filter(h => h.company === 'ООО «УК «Наш дом-Кудрово»').length,
    'ООО «УК «Наш Дом Новоселье»': houses.filter(h => h.company === 'ООО «УК «Наш Дом Новоселье»').length,
    'ООО «УК «Усадьба»': houses.filter(h => h.company === 'ООО «УК «Усадьба»').length,
    'ООО «Сити Паркинг»': houses.filter(h => h.company === 'ООО «Сити Паркинг»').length,
    'Группа УК «НАШ ДОМ»': houses.filter(h => h.company === 'Группа УК «НАШ ДОМ»').length,
  };

  return (
    <Layout>
      <section className="py-20 bg-gradient-to-br from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient-sapphire">О компании</h1>
            <p className="text-xl text-muted-foreground">
              Группа управляющих компаний «НАШ ДОМ» — ваш надёжный партнёр в сфере управления жилой
              недвижимостью с 2007 года
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://cdn.poehali.dev/projects/fe9589b6-f411-4b39-b21e-3be97169a177/files/b9349455-33d1-4341-a4f7-22c930cde0b2.jpg"
                alt="Наша команда"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gradient-sapphire">Наша миссия</h2>
              <p className="text-lg text-muted-foreground">
                Создание комфортных условий проживания для жителей многоквартирных домов через
                профессиональное управление, качественное обслуживание и заботу о каждом клиенте.
              </p>
              <p className="text-lg text-muted-foreground">
                Мы объединяем опытных специалистов и современные технологии для достижения
                максимальной эффективности в управлении жилищным фондом.
              </p>
            </div>
          </div>

          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12 text-gradient-sapphire">Наши принципы</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover:shadow-xl hover:shadow-primary/10 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center mb-4 shadow-md">
                    <Icon name="Rocket" className="text-primary" size={24} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Прогрессивные методы</h3>
                  <p className="text-muted-foreground">
                    Комплексный подход к управлению и стремление к максимальному результату
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl hover:shadow-primary/10 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center mb-4 shadow-md">
                    <Icon name="Heart" className="text-primary" size={24} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Забота о клиентах</h3>
                  <p className="text-muted-foreground">
                    Комфорт жителей — наш главный приоритет в работе
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl hover:shadow-primary/10 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center mb-4 shadow-md">
                    <Icon name="Settings" className="text-primary" size={24} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Системный подход</h3>
                  <p className="text-muted-foreground">
                    Оперативное и эффективное решение текущих проблем
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl hover:shadow-primary/10 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center mb-4 shadow-md">
                    <Icon name="DollarSign" className="text-primary" size={24} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Честная ценовая политика</h3>
                  <p className="text-muted-foreground">Прозрачные и доступные тарифы для всех</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl hover:shadow-primary/10 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center mb-4 shadow-md">
                    <Icon name="Award" className="text-primary" size={24} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Профессионализм</h3>
                  <p className="text-muted-foreground">
                    Высококвалифицированные специалисты в своей области
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl hover:shadow-primary/10 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center mb-4 shadow-md">
                    <Icon name="TrendingUp" className="text-primary" size={24} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Постоянное развитие</h3>
                  <p className="text-muted-foreground">
                    Модернизация сервиса и внедрение лучших решений
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12 text-gradient-sapphire">
              13 управляющих компаний в составе группы
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {companyData.map((company) => {
                const count = companyHouseCounts[company.name];
                if (count === 0) return null;
                
                return (
                  <Card 
                    key={company.id}
                    className="hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 cursor-pointer group hover:-translate-y-1"
                    onClick={() => navigate(`/companies/${company.id}`)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-primary/30 transition-shadow">
                          <Icon name="Building2" className="text-primary" size={24} />
                        </div>
                        <Icon 
                          name="ChevronRight" 
                          className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all"
                          size={20}
                        />
                      </div>
                      <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                        {company.name.replace('ООО «УК «', '').replace('ООО УК «', '').replace('ООО «', '').replace(/»$/, '').replace(/»$/g, '')}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {count} {count === 1 ? 'объект' : count < 5 ? 'объекта' : 'объектов'}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            <div className="text-center mt-8">
              <Link to="/companies">
                <Button size="lg">
                  <Icon name="ArrowRight" size={20} className="mr-2" />
                  Подробнее о каждой компании
                </Button>
              </Link>
            </div>
          </div>

          <div className="bg-muted/50 rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-8 text-center text-gradient-sapphire">Наши ключевые задачи</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-3">
                <Icon name="CheckCircle2" className="text-primary flex-shrink-0 mt-1" size={20} />
                <p className="text-muted-foreground">
                  Сохранность жилищного фонда и улучшение качества жилищно-коммунальных услуг
                </p>
              </div>
              <div className="flex gap-3">
                <Icon name="CheckCircle2" className="text-primary flex-shrink-0 mt-1" size={20} />
                <p className="text-muted-foreground">
                  Обеспечение комфортных и безопасных условий проживания
                </p>
              </div>
              <div className="flex gap-3">
                <Icon name="CheckCircle2" className="text-primary flex-shrink-0 mt-1" size={20} />
                <p className="text-muted-foreground">
                  Санитарное содержание придомовой территории, техническое обслуживание и ремонт
                </p>
              </div>
              <div className="flex gap-3">
                <Icon name="CheckCircle2" className="text-primary flex-shrink-0 mt-1" size={20} />
                <p className="text-muted-foreground">
                  Организация системы предоставления и оплаты жилищных и коммунальных услуг
                </p>
              </div>
              <div className="flex gap-3">
                <Icon name="CheckCircle2" className="text-primary flex-shrink-0 mt-1" size={20} />
                <p className="text-muted-foreground">
                  Эффективное управление жилищным фондом и финансовое планирование
                </p>
              </div>
              <div className="flex gap-3">
                <Icon name="CheckCircle2" className="text-primary flex-shrink-0 mt-1" size={20} />
                <p className="text-muted-foreground">
                  Сбор платежей, расчеты с поставщиками и подрядчиками
                </p>
              </div>
              <div className="flex gap-3">
                <Icon name="CheckCircle2" className="text-primary flex-shrink-0 mt-1" size={20} />
                <p className="text-muted-foreground">
                  Снижение стоимости обслуживания и потребляемых коммунальных услуг
                </p>
              </div>
              <div className="flex gap-3">
                <Icon name="CheckCircle2" className="text-primary flex-shrink-0 mt-1" size={20} />
                <p className="text-muted-foreground">
                  Разъяснительная работа с населением и постоянное улучшение качества услуг
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;