import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

const About = () => {
  return (
    <Layout>
      <section className="py-20 bg-gradient-to-br from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">О компании</h1>
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
              <h2 className="text-3xl font-bold">Наша миссия</h2>
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
            <h2 className="text-3xl font-bold text-center mb-12">Наши принципы</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon name="Rocket" className="text-primary" size={24} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Прогрессивные методы</h3>
                  <p className="text-muted-foreground">
                    Комплексный подход к управлению и стремление к максимальному результату
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon name="Heart" className="text-primary" size={24} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Забота о клиентах</h3>
                  <p className="text-muted-foreground">
                    Комфорт жителей — наш главный приоритет в работе
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon name="Settings" className="text-primary" size={24} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Системный подход</h3>
                  <p className="text-muted-foreground">
                    Оперативное и эффективное решение текущих проблем
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon name="DollarSign" className="text-primary" size={24} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Честная ценовая политика</h3>
                  <p className="text-muted-foreground">Прозрачные и доступные тарифы для всех</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon name="Award" className="text-primary" size={24} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Профессионализм</h3>
                  <p className="text-muted-foreground">
                    Высококвалифицированные специалисты в своей области
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
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
            <h2 className="text-3xl font-bold text-center mb-12">
              13 управляющих компаний в составе группы
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon name="Building2" className="text-primary" size={24} />
                  </div>
                  <h3 className="font-semibold mb-2">ООО "УК "Наш дом-Сити"</h3>
                  <p className="text-sm text-muted-foreground">7 объектов в Санкт-Петербурге</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon name="Building2" className="text-primary" size={24} />
                  </div>
                  <h3 className="font-semibold mb-2">ООО "УК "Наш дом-Полюстрово"</h3>
                  <p className="text-sm text-muted-foreground">ЖК "Панорама"</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon name="Building2" className="text-primary" size={24} />
                  </div>
                  <h3 className="font-semibold mb-2">ООО УК "СИТИХОУМ"</h3>
                  <p className="text-sm text-muted-foreground">ЖК "Адмирал"</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon name="Building2" className="text-primary" size={24} />
                  </div>
                  <h3 className="font-semibold mb-2">ООО "УК "Остров-Град"</h3>
                  <p className="text-sm text-muted-foreground">5 объектов в Санкт-Петербурге</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon name="Building2" className="text-primary" size={24} />
                  </div>
                  <h3 className="font-semibold mb-2">ООО "УК "Новое Купчино"</h3>
                  <p className="text-sm text-muted-foreground">ЖК "Новое Купчино"</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon name="Building2" className="text-primary" size={24} />
                  </div>
                  <h3 className="font-semibold mb-2">ООО «УК «Наш дом – Регион»</h3>
                  <p className="text-sm text-muted-foreground">
                    7 объектов в Мурино и Кудрово
                  </p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon name="Building2" className="text-primary" size={24} />
                  </div>
                  <h3 className="font-semibold mb-2">ООО «УК «Наш дом-Кудрово Град»</h3>
                  <p className="text-sm text-muted-foreground">2 объекта в Кудрово</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon name="Building2" className="text-primary" size={24} />
                  </div>
                  <h3 className="font-semibold mb-2">ООО «УК «Кудрово-Дом»</h3>
                  <p className="text-sm text-muted-foreground">3 объекта в Кудрово</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon name="Building2" className="text-primary" size={24} />
                  </div>
                  <h3 className="font-semibold mb-2">ООО «УК «Кудрово-Сервис»</h3>
                  <p className="text-sm text-muted-foreground">2 объекта в Кудрово</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon name="Building2" className="text-primary" size={24} />
                  </div>
                  <h3 className="font-semibold mb-2">ООО «УК «Наш дом-Кудрово»</h3>
                  <p className="text-sm text-muted-foreground">3 объекта в Кудрово</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon name="Building2" className="text-primary" size={24} />
                  </div>
                  <h3 className="font-semibold mb-2">ООО «УК «Наш Дом Новоселье»</h3>
                  <p className="text-sm text-muted-foreground">
                    16 объектов в ЖК NewПитер
                  </p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon name="Building2" className="text-primary" size={24} />
                  </div>
                  <h3 className="font-semibold mb-2">ООО «УК «Усадьба»</h3>
                  <p className="text-sm text-muted-foreground">КП «Сад времени»</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon name="Building2" className="text-primary" size={24} />
                  </div>
                  <h3 className="font-semibold mb-2">ООО «Сити Паркинг»</h3>
                  <p className="text-sm text-muted-foreground">9 паркингов в Санкт-Петербурге</p>
                </CardContent>
              </Card>
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