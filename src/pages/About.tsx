import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { houses } from "@/data/housesData";

const About = () => {
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
    { id: "uk-nash-dom-kudrovo-sity", name: 'ООО «УК «Наш дом-Кудрово-Сити»' },
    { id: "uk-kapital-komfort", name: 'ООО «УК «Капитал-Комфорт»' },
    { id: "uk-mks", name: 'ООО «УК «МКС»' },
    { id: "uk-biznes-sity-dom", name: 'ООО «УК «Бизнес сити дом»' },
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
    'ООО «УК «Наш дом-Кудрово-Сити»': houses.filter(h => h.company === 'ООО «УК «Наш дом-Кудрово-Сити»').length,
    'ООО «УК «Капитал-Комфорт»': houses.filter(h => h.company === 'ООО «УК «Капитал-Комфорт»').length,
    'ООО «УК «МКС»': houses.filter(h => h.company === 'ООО «УК «МКС»').length,
    'ООО «УК «Бизнес сити дом»': houses.filter(h => h.company === 'ООО «УК «Бизнес сити дом»').length,
    'Группа УК «НАШ ДОМ»': houses.filter(h => h.company === 'Группа УК «НАШ ДОМ»').length,
  };

  return (
    <Layout>
      <section className="py-20 bg-gradient-to-br from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">О компании</h1>
            <p className="text-xl text-muted-foreground">
              «НАШ ДОМ» – Ваш надёжный партнёр в сфере управления жилой недвижимостью с 2007 года. Мы обладаем многолетним опытом и глубоким пониманием потребностей наших клиентов, чтобы обеспечивать комфортное и безопасное проживание в Ваших домах.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://cdn.poehali.dev/projects/fe9589b6-f411-4b39-b21e-3be97169a177/files/fb5ded3f-17e9-4f0d-9fba-df928ac2219d.jpg"
                alt="Наша команда"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Наша миссия</h2>
              <p className="text-lg text-muted-foreground">
                Ваша жизнь – наш приоритет. Мы – команда профессионалов, использующая передовые технологии для эффективного управления многоквартирными домами.
              </p>
              <p className="text-lg text-muted-foreground">
                Наша миссия – предоставлять высококачественные услуги, обеспечивающие комфорт, безопасность и процветание Вашего жилья. Мы стремимся к безупречности в каждой детали, чтобы сделать Вашу жизнь проще и приятнее.
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="space-y-6 order-2 lg:order-1">
              <h2 className="text-3xl font-bold">Наш опыт</h2>
              <p className="text-lg text-muted-foreground">
                С 2007 года мы успешно управляем жилой недвижимостью, постоянно совершенствуя наши методы и расширяя спектр предоставляемых услуг.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="text-center p-6 bg-primary/5 rounded-xl">
                  <div className="text-4xl font-bold text-primary mb-2">18+</div>
                  <div className="text-sm text-muted-foreground">Лет на рынке</div>
                </div>
                <div className="text-center p-6 bg-primary/5 rounded-xl">
                  <div className="text-4xl font-bold text-primary mb-2">50+</div>
                  <div className="text-sm text-muted-foreground">Домов в управлении</div>
                </div>
              </div>
            </div>
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl order-1 lg:order-2">
              <img
                src="https://cdn.poehali.dev/projects/fe9589b6-f411-4b39-b21e-3be97169a177/files/801844cd-47fb-4688-91d5-de1f503383a3.jpg"
                alt="Наши объекты"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12">Наши ценности</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover:shadow-xl hover:shadow-primary/10 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center mb-4 shadow-md">
                    <Icon name="Target" className="text-primary/70" size={24} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Ориентированность на результат</h3>
                  <p className="text-muted-foreground">
                    Мы применяем прогрессивные методы управления и стремимся к максимальной эффективности в каждом проекте. Это позволяет нам достигать поставленных целей и превосходить ожидания.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl hover:shadow-primary/10 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center mb-4 shadow-md">
                    <Icon name="Heart" className="text-primary/70" size={24} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Клиентоориентированность</h3>
                  <p className="text-muted-foreground">
                    Мы заботимся о комфорте наших жителей, как о своем собственном. Создание благоприятной среды для жизни – наша главная задача.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl hover:shadow-primary/10 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center mb-4 shadow-md">
                    <Icon name="Settings" className="text-primary/70" size={24} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Системность и оперативность</h3>
                  <p className="text-muted-foreground">
                    Благодаря четкой организации и системному подходу, мы оперативно реагируем на любые возникающие вопросы и эффективно решаем текущие проблемы.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl hover:shadow-primary/10 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center mb-4 shadow-md">
                    <Icon name="Eye" className="text-primary/70" size={24} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Прозрачность и честность</h3>
                  <p className="text-muted-foreground">
                    Мы придерживаемся честной ценовой политики и предлагаем прозрачные тарифы, чтобы каждый житель понимал, за что он платит.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl hover:shadow-primary/10 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center mb-4 shadow-md">
                    <Icon name="Award" className="text-primary/70" size={24} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Команда профессионалов</h3>
                  <p className="text-muted-foreground">
                    В нашей компании работают высококвалифицированные специалисты, которые обладают глубокими знаниями и опытом в своей области.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl hover:shadow-primary/10 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center mb-4 shadow-md">
                    <Icon name="TrendingUp" className="text-primary/70" size={24} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Непрерывное развитие</h3>
                  <p className="text-muted-foreground">
                    Мы постоянно развиваемся и стремимся к совершенству, внедряя лучшие решения и модернизируя наш сервис, чтобы соответствовать самым высоким стандартам качества.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12">
              17 управляющих компаний в составе группы
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {companyData.map((company) => {
                const count = companyHouseCounts[company.name];
                if (count === 0) return null;
                
                return (
                  <Card 
                    key={company.id}
                    className="hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center shadow-md">
                          <Icon name="Building2" className="text-primary/70" size={24} />
                        </div>
                      </div>
                      <h3 className="font-semibold mb-2">
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
          </div>

          <div className="bg-muted/50 rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-8 text-center">Наши ключевые задачи</h2>
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