import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Building2" className="text-primary-foreground" size={28} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">НАШ ДОМ</h1>
                <p className="text-xs text-muted-foreground">Группа управляющих компаний</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#about" className="text-sm font-medium hover:text-primary transition-colors">О компании</a>
              <a href="#services" className="text-sm font-medium hover:text-primary transition-colors">Услуги</a>
              <a href="#stats" className="text-sm font-medium hover:text-primary transition-colors">Цифры</a>
              <a href="#contact" className="text-sm font-medium hover:text-primary transition-colors">Контакты</a>
            </nav>
            <a href="tel:+78126408826">
              <Button className="hidden md:inline-flex">
                <Icon name="Phone" size={16} className="mr-2" />
                +7 (812) 640-88-26
              </Button>
            </a>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-background py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <div className="inline-block px-4 py-2 bg-primary/10 rounded-full">
                <span className="text-sm font-semibold text-primary">18 лет на рынке ЖКХ</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Ваш комфорт — наша забота
              </h1>
              <p className="text-xl text-muted-foreground">
                Профессиональное управление жилой недвижимостью с 2007 года. 
                Обслуживаем более 50 многоквартирных домов и 1 млн м² площади.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a href="#services">
                  <Button size="lg" className="w-full sm:w-auto">
                    Наши услуги
                    <Icon name="ArrowRight" size={18} className="ml-2" />
                  </Button>
                </a>
                <a href="tel:+78126408826">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    <Icon name="Phone" size={18} className="mr-2" />
                    Позвонить
                  </Button>
                </a>
              </div>
            </div>
            <div className="relative animate-fade-in-up">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://cdn.poehali.dev/projects/fe9589b6-f411-4b39-b21e-3be97169a177/files/8156c380-1b0f-427e-9da3-2bb38f2a8a72.jpg"
                  alt="Современный жилой дом"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="stats" className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center animate-scale-in">
              <div className="text-4xl md:text-5xl font-bold mb-2">1 млн м²</div>
              <div className="text-sm md:text-base opacity-90">Обслуживаемая площадь</div>
            </div>
            <div className="text-center animate-scale-in" style={{animationDelay: '0.1s'}}>
              <div className="text-4xl md:text-5xl font-bold mb-2">50+</div>
              <div className="text-sm md:text-base opacity-90">Многоквартирных домов</div>
            </div>
            <div className="text-center animate-scale-in" style={{animationDelay: '0.2s'}}>
              <div className="text-4xl md:text-5xl font-bold mb-2">13</div>
              <div className="text-sm md:text-base opacity-90">Паркингов</div>
            </div>
            <div className="text-center animate-scale-in" style={{animationDelay: '0.3s'}}>
              <div className="text-4xl md:text-5xl font-bold mb-2">18 лет</div>
              <div className="text-sm md:text-base opacity-90">Опыт работы</div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">О компании</h2>
            <p className="text-lg text-muted-foreground">
              Группа управляющих компаний «НАШ ДОМ» создана в 2007 году для предоставления 
              высокого уровня клиентского сервиса и заботы о вашем комфорте
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="animate-slide-in">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon name="TrendingUp" className="text-primary" size={28} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Постоянное развитие</h3>
                <p className="text-muted-foreground">
                  Мы постоянно модернизируем сервис и внедряем лучшие решения 
                  в сфере управления жилой недвижимостью
                </p>
              </CardContent>
            </Card>

            <Card className="animate-slide-in-right">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon name="Users" className="text-primary" size={28} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Профессиональная команда</h3>
                <p className="text-muted-foreground">
                  Наша команда объединяет опытных квалифицированных сотрудников 
                  и молодых специалистов, преданных своему делу
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <Icon name="Rocket" className="text-primary mx-auto mb-3" size={32} />
                <h4 className="font-semibold mb-2">Прогрессивные методы</h4>
                <p className="text-sm text-muted-foreground">Комплексный подход к управлению</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Icon name="Heart" className="text-primary mx-auto mb-3" size={32} />
                <h4 className="font-semibold mb-2">Забота о клиентах</h4>
                <p className="text-sm text-muted-foreground">Ваш комфорт — приоритет</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Icon name="Settings" className="text-primary mx-auto mb-3" size={32} />
                <h4 className="font-semibold mb-2">Системный подход</h4>
                <p className="text-sm text-muted-foreground">Эффективное решение задач</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Icon name="DollarSign" className="text-primary mx-auto mb-3" size={32} />
                <h4 className="font-semibold mb-2">Честные цены</h4>
                <p className="text-sm text-muted-foreground">Прозрачные тарифы</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Icon name="Award" className="text-primary mx-auto mb-3" size={32} />
                <h4 className="font-semibold mb-2">Профессионалы</h4>
                <p className="text-sm text-muted-foreground">Квалифицированные специалисты</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 md:py-28 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Наши услуги</h2>
            <p className="text-lg text-muted-foreground">
              Полный комплекс услуг для комфортного проживания
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon name="ClipboardList" className="text-primary" size={24} />
                </div>
                <h3 className="text-lg font-semibold mb-3">Управление</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                    <span>Организация и контроль процессов</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                    <span>Взаимодействие с собственниками</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                    <span>Финансовое планирование</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                    <span>Юридическое сопровождение</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon name="Wrench" className="text-primary" size={24} />
                </div>
                <h3 className="text-lg font-semibold mb-3">Техническое обслуживание</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                    <span>Обслуживание инженерных систем</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                    <span>Технический надзор</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                    <span>Текущий ремонт</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                    <span>Устранение аварий</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon name="Sparkles" className="text-primary" size={24} />
                </div>
                <h3 className="text-lg font-semibold mb-3">Санитарное содержание</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                    <span>Уборка мест общего пользования</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                    <span>Уборка придомовой территории</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                    <span>Сбор и вывоз мусора</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon name="Trees" className="text-primary" size={24} />
                </div>
                <h3 className="text-lg font-semibold mb-3">Благоустройство</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                    <span>Уход за зелеными насаждениями</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                    <span>Обслуживание интерьера</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                    <span>Улучшение территории</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon name="Shield" className="text-primary" size={24} />
                </div>
                <h3 className="text-lg font-semibold mb-3">Безопасность</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                    <span>Круглосуточная охрана</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                    <span>Видеонаблюдение и контроль</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                    <span>Взаимодействие с полицией</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon name="Clock" className="text-primary" size={24} />
                </div>
                <h3 className="text-lg font-semibold mb-3">Диспетчерская служба</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                    <span>Круглосуточное дежурство</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                    <span>Контроль за системами</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                    <span>Прием обращений жителей</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-gradient-to-br from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="https://cdn.poehali.dev/projects/fe9589b6-f411-4b39-b21e-3be97169a177/files/50aa6a8c-d79d-4d80-b8c6-c1e07d28a987.jpg"
                  alt="Наша команда"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">Наши ключевые задачи</h2>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <Icon name="CheckCircle2" className="text-primary flex-shrink-0 mt-1" size={20} />
                  <p className="text-muted-foreground">Сохранность жилищного фонда и улучшение качества услуг</p>
                </div>
                <div className="flex gap-3">
                  <Icon name="CheckCircle2" className="text-primary flex-shrink-0 mt-1" size={20} />
                  <p className="text-muted-foreground">Обеспечение комфортных условий проживания</p>
                </div>
                <div className="flex gap-3">
                  <Icon name="CheckCircle2" className="text-primary flex-shrink-0 mt-1" size={20} />
                  <p className="text-muted-foreground">Техническое обслуживание и своевременный ремонт</p>
                </div>
                <div className="flex gap-3">
                  <Icon name="CheckCircle2" className="text-primary flex-shrink-0 mt-1" size={20} />
                  <p className="text-muted-foreground">Эффективное управление жилищным фондом</p>
                </div>
                <div className="flex gap-3">
                  <Icon name="CheckCircle2" className="text-primary flex-shrink-0 mt-1" size={20} />
                  <p className="text-muted-foreground">Снижение стоимости обслуживания</p>
                </div>
                <div className="flex gap-3">
                  <Icon name="CheckCircle2" className="text-primary flex-shrink-0 mt-1" size={20} />
                  <p className="text-muted-foreground">Постоянное улучшение качества предоставляемых услуг</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Свяжитесь с нами</h2>
              <p className="text-lg text-muted-foreground">
                Мы всегда готовы ответить на ваши вопросы
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon name="Phone" className="text-primary" size={28} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Телефон</h3>
                  <a href="tel:+78126408826" className="text-lg text-primary hover:underline block">
                    +7 (812) 640-88-26
                  </a>
                  <p className="text-sm text-muted-foreground mt-2">
                    Круглосуточная диспетчерская служба
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon name="Mail" className="text-primary" size={28} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Email</h3>
                  <a href="mailto:uk.nashdom@inbox.ru" className="text-lg text-primary hover:underline block mb-1">
                    uk.nashdom@inbox.ru
                  </a>
                  <a href="mailto:uk.nash-dom@mail.ru" className="text-lg text-primary hover:underline block">
                    uk.nash-dom@mail.ru
                  </a>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-8 bg-primary text-primary-foreground">
              <CardContent className="p-8 text-center">
                <Icon name="Clock" className="mx-auto mb-4" size={40} />
                <h3 className="text-2xl font-semibold mb-2">Круглосуточная поддержка</h3>
                <p className="text-lg opacity-90">
                  Наша диспетчерская служба работает 24/7 для вашего комфорта и безопасности
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-background/10 rounded-lg flex items-center justify-center">
                  <Icon name="Building2" className="text-background" size={24} />
                </div>
                <div>
                  <h3 className="font-bold">НАШ ДОМ</h3>
                  <p className="text-sm opacity-75">Группа УК</p>
                </div>
              </div>
              <p className="text-sm opacity-75">
                Профессиональное управление жилой недвижимостью с 2007 года
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <div className="space-y-2 text-sm opacity-75">
                <div className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  <a href="tel:+78126408826" className="hover:opacity-100">+7 (812) 640-88-26</a>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  <a href="mailto:uk.nashdom@inbox.ru" className="hover:opacity-100">uk.nashdom@inbox.ru</a>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  <a href="mailto:uk.nash-dom@mail.ru" className="hover:opacity-100">uk.nash-dom@mail.ru</a>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Быстрые ссылки</h4>
              <nav className="space-y-2 text-sm opacity-75">
                <a href="#about" className="block hover:opacity-100">О компании</a>
                <a href="#services" className="block hover:opacity-100">Услуги</a>
                <a href="#stats" className="block hover:opacity-100">Цифры</a>
                <a href="#contact" className="block hover:opacity-100">Контакты</a>
              </nav>
            </div>
          </div>

          <div className="border-t border-background/10 pt-8 text-center text-sm opacity-75">
            <p>© {new Date().getFullYear()} Группа управляющих компаний «НАШ ДОМ». Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
