import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Index = () => {
  const [meterValue, setMeterValue] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [activeSection, setActiveSection] = useState("home");

  const news = [
    {
      id: 1,
      title: "Плановые работы по лифтам в домах №12, №14",
      date: "15 ноября 2025",
      tag: "Ремонт",
      content: "С 20 по 25 ноября будут проводиться плановые работы по техническому обслуживанию лифтов."
    },
    {
      id: 2,
      title: "Общее собрание жильцов дома №8",
      date: "10 ноября 2025",
      tag: "Собрание",
      content: "Приглашаем всех собственников квартир на общее собрание 18 ноября в 19:00."
    },
    {
      id: 3,
      title: "Новые тарифы на отопление",
      date: "5 ноября 2025",
      tag: "Важно!",
      content: "С 1 декабря 2025 года изменяются тарифы на коммунальные услуги."
    }
  ];

  const services = [
    {
      name: "Содержание дома",
      price: "25.50",
      unit: "₽/м²",
      description: "Уборка подъездов, озеленение территории, вывоз мусора"
    },
    {
      name: "Текущий ремонт",
      price: "8.20",
      unit: "₽/м²",
      description: "Ремонт общего имущества, покраска, мелкие работы"
    },
    {
      name: "Отопление",
      price: "42.30",
      unit: "₽/м²",
      description: "Централизованное отопление квартир и подъездов"
    },
    {
      name: "Вода (холодная)",
      price: "18.50",
      unit: "₽/м³",
      description: "Поставка холодной воды"
    }
  ];

  const documents = [
    { category: "Уставные документы", items: ["Устав организации", "Свидетельство о регистрации", "Лицензии"] },
    { category: "Финансовая отчетность", items: ["Отчет за 2024 год", "Отчет за 1 квартал 2025", "Смета расходов"] },
    { category: "Протоколы собраний", items: ["Протокол от 15.09.2025", "Протокол от 12.06.2025"] }
  ];

  const houses = [
    { id: 1, address: "ул. Ленина, 12", x: 20, y: 30 },
    { id: 2, address: "ул. Ленина, 14", x: 35, y: 25 },
    { id: 3, address: "ул. Пушкина, 8", x: 60, y: 40 },
    { id: 4, address: "ул. Гагарина, 5", x: 45, y: 60 },
    { id: 5, address: "ул. Гагарина, 7", x: 75, y: 55 }
  ];

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                <Icon name="Building2" className="text-white" size={28} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">НАШ ДОМ</h1>
                <p className="text-xs text-muted-foreground">Группа Управляющих Компаний</p>
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-1">
              {["home", "about", "news", "services", "documents", "contacts"].map((section) => (
                <Button
                  key={section}
                  variant={activeSection === section ? "default" : "ghost"}
                  onClick={() => scrollToSection(section)}
                  className="capitalize"
                >
                  {section === "home" && "Главная"}
                  {section === "about" && "О компании"}
                  {section === "news" && "Новости"}
                  {section === "services" && "Услуги"}
                  {section === "documents" && "Документы"}
                  {section === "contacts" && "Контакты"}
                </Button>
              ))}
            </div>

            <Sheet>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Icon name="Menu" size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col gap-4 mt-8">
                  {["home", "about", "news", "services", "documents", "contacts"].map((section) => (
                    <Button
                      key={section}
                      variant="ghost"
                      onClick={() => scrollToSection(section)}
                      className="justify-start text-lg capitalize"
                    >
                      {section === "home" && "Главная"}
                      {section === "about" && "О компании"}
                      {section === "news" && "Новости"}
                      {section === "services" && "Услуги"}
                      {section === "documents" && "Документы"}
                      {section === "contacts" && "Контакты"}
                    </Button>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
        <Card className="bg-destructive text-white border-0 shadow-2xl">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
                <Icon name="Phone" className="text-white" size={24} />
              </div>
              <div>
                <p className="text-xs font-medium opacity-90">Аварийная диспетчерская</p>
                <a href="tel:0800501234" className="text-lg font-bold hover:underline">
                  0800-50-12-34
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <section id="home" className="py-20 bg-gradient-to-br from-primary/10 via-white to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Профессиональное управление вашим домом
            </h2>
            <p className="text-xl text-muted-foreground mb-10">
              Надежность, открытость и забота о комфорте каждого жильца
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="gap-2" onClick={() => scrollToSection("services")}>
                <Icon name="ClipboardList" size={20} />
                Наши услуги
              </Button>
              <Button size="lg" variant="outline" className="gap-2" onClick={() => scrollToSection("contacts")}>
                <Icon name="MessageCircle" size={20} />
                Связаться с нами
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-16">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-8 pb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Shield" className="text-primary" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Надежность</h3>
                <p className="text-muted-foreground">Более 15 лет опыта в управлении недвижимостью</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-8 pb-6">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Eye" className="text-secondary" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Прозрачность</h3>
                <p className="text-muted-foreground">Полная открытость финансовой отчетности и решений</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-8 pb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Heart" className="text-primary" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Забота</h3>
                <p className="text-muted-foreground">Быстрое реагирование на ваши запросы 24/7</p>
              </CardContent>
            </Card>
          </div>

          <Card className="max-w-5xl mx-auto mt-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="MapPin" className="text-primary" />
                Дома под нашим управлением
              </CardTitle>
              <CardDescription>Нажмите на маркер, чтобы посмотреть адрес</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative w-full h-[400px] bg-gradient-to-br from-green-100 to-blue-100 rounded-lg overflow-hidden">
                {houses.map((house) => (
                  <div
                    key={house.id}
                    className="absolute w-8 h-8 bg-primary rounded-full flex items-center justify-center cursor-pointer hover:scale-125 transition-transform shadow-lg group"
                    style={{ left: `${house.x}%`, top: `${house.y}%` }}
                  >
                    <Icon name="Home" className="text-white" size={16} />
                    <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-2 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                      {house.address}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="max-w-2xl mx-auto mt-12 bg-gradient-to-br from-primary/5 to-secondary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Gauge" className="text-primary" />
                Передать показания счетчиков
              </CardTitle>
              <CardDescription>Электроэнергия</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="meter">Показания счетчика (кВт·ч)</Label>
                  <Input
                    id="meter"
                    type="number"
                    placeholder="Введите показания"
                    value={meterValue}
                    onChange={(e) => setMeterValue(e.target.value)}
                    className="text-lg"
                  />
                </div>
                <Button className="w-full gap-2" size="lg">
                  <Icon name="Send" size={20} />
                  Отправить показания
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center">О компании</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="History" className="text-primary" />
                    Наша история
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p>
                    Группа управляющих компаний «НАШ ДОМ» работает на рынке жилищно-коммунальных услуг с 2010 года.
                  </p>
                  <p>
                    За это время мы завоевали доверие тысяч жильцов благодаря профессионализму, ответственности и
                    индивидуальному подходу к каждому дому.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Target" className="text-secondary" />
                    Наша миссия
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p>
                    Создавать комфортные условия для проживания, обеспечивая высокое качество услуг и прозрачность в
                    работе.
                  </p>
                  <p>Мы стремимся быть не просто управляющей компанией, а надежным партнером для каждого жильца.</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">15+</div>
                <div className="text-sm text-muted-foreground">Лет опыта</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">47</div>
                <div className="text-sm text-muted-foreground">Домов под управлением</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">8500+</div>
                <div className="text-sm text-muted-foreground">Довольных клиентов</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                <div className="text-sm text-muted-foreground">Поддержка</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="news" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center">Новости и объявления</h2>
            <div className="space-y-4">
              {news.map((item) => (
                <Card key={item.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className="mb-2">{item.title}</CardTitle>
                        <CardDescription className="flex items-center gap-2">
                          <Icon name="Calendar" size={14} />
                          {item.date}
                        </CardDescription>
                      </div>
                      <Badge
                        variant={item.tag === "Важно!" ? "destructive" : "secondary"}
                        className="shrink-0"
                      >
                        {item.tag}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{item.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center">Услуги и тарифы</h2>

            <Tabs defaultValue="services" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="services" className="gap-2">
                  <Icon name="ListChecks" size={18} />
                  Услуги
                </TabsTrigger>
                <TabsTrigger value="calculator" className="gap-2">
                  <Icon name="Calculator" size={18} />
                  Калькулятор
                </TabsTrigger>
              </TabsList>

              <TabsContent value="services">
                <div className="grid md:grid-cols-2 gap-6">
                  {services.map((service, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle className="text-xl">{service.name}</CardTitle>
                        <CardDescription>{service.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-bold text-primary">{service.price}</span>
                          <span className="text-muted-foreground">{service.unit}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="calculator">
                <Card>
                  <CardHeader>
                    <CardTitle>Расчет стоимости услуг</CardTitle>
                    <CardDescription>Введите площадь вашей квартиры для расчета</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="area">Площадь квартиры (м²)</Label>
                      <Input id="area" type="number" placeholder="Например, 65" />
                    </div>
                    <div className="space-y-2">
                      <Label>Выберите услугу</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {services.map((service, index) => (
                          <Button
                            key={index}
                            variant={selectedService === service.name ? "default" : "outline"}
                            onClick={() => setSelectedService(service.name)}
                            className="justify-start"
                          >
                            {service.name}
                          </Button>
                        ))}
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between text-lg font-semibold">
                      <span>Ориентировочная стоимость:</span>
                      <span className="text-2xl text-primary">— ₽/мес</span>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      <section id="documents" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center">Документы</h2>
            <Card>
              <CardContent className="pt-6">
                <Accordion type="single" collapsible className="w-full">
                  {documents.map((category, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-lg font-semibold">
                        <div className="flex items-center gap-2">
                          <Icon name="Folder" className="text-primary" />
                          {category.category}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 pl-8">
                          {category.items.map((item, itemIndex) => (
                            <a
                              key={itemIndex}
                              href="#"
                              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors py-2"
                            >
                              <Icon name="FileText" size={18} />
                              {item}
                              <Icon name="Download" size={16} className="ml-auto" />
                            </a>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>

            <Card className="mt-8 bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Info" className="text-primary" />
                  Полезная информация для жильцов
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <a href="#" className="flex items-center justify-between p-3 bg-white rounded-lg hover:shadow-md transition-shadow">
                  <span className="font-medium">Как передать показания счетчиков</span>
                  <Icon name="ChevronRight" className="text-muted-foreground" />
                </a>
                <a href="#" className="flex items-center justify-between p-3 bg-white rounded-lg hover:shadow-md transition-shadow">
                  <span className="font-medium">Как оплатить квитанцию онлайн</span>
                  <Icon name="ChevronRight" className="text-muted-foreground" />
                </a>
                <a href="#" className="flex items-center justify-between p-3 bg-white rounded-lg hover:shadow-md transition-shadow">
                  <span className="font-medium">Правила содержания домашних животных</span>
                  <Icon name="ChevronRight" className="text-muted-foreground" />
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center">Контакты и реквизиты</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Phone" className="text-primary" />
                    Телефоны
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="font-semibold mb-1">Аварийная диспетчерская (круглосуточно)</div>
                    <a href="tel:0800501234" className="text-primary text-xl font-bold hover:underline">
                      0800-50-12-34
                    </a>
                  </div>
                  <Separator />
                  <div>
                    <div className="font-semibold mb-1">Бухгалтерия</div>
                    <a href="tel:0445551122" className="text-primary hover:underline">
                      (044) 555-11-22
                    </a>
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Приемная</div>
                    <a href="tel:0445551133" className="text-primary hover:underline">
                      (044) 555-11-33
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="MapPin" className="text-primary" />
                    Адрес офиса
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-semibold mb-2">г. Москва, ул. Тверская, 25, офис 301</p>
                    <p className="text-muted-foreground text-sm mb-2">График работы:</p>
                    <p className="text-sm">Пн-Пт: 9:00 - 18:00</p>
                    <p className="text-sm">Сб: 10:00 - 15:00</p>
                    <p className="text-sm">Вс: выходной</p>
                  </div>
                  <Separator />
                  <div>
                    <div className="font-semibold mb-1">Email</div>
                    <a href="mailto:info@nashdom.ua" className="text-primary hover:underline">
                      info@nashdom.ua
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Building" className="text-primary" />
                  Реквизиты
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6 text-sm">
                  <div>
                    <p className="font-semibold mb-1">Полное название:</p>
                    <p className="text-muted-foreground">Общество с ограниченной ответственностью «НАШ ДОМ»</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">ИНН:</p>
                    <p className="text-muted-foreground">7701234567</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Расчетный счет:</p>
                    <p className="text-muted-foreground">40702810400000012345</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Банк:</p>
                    <p className="text-muted-foreground">ПАО «Сбербанк»</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                <Icon name="Building2" className="text-white" size={28} />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-bold">НАШ ДОМ</h3>
                <p className="text-sm text-gray-400">Группа Управляющих Компаний</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Надежное управление недвижимостью с 2010 года
            </p>
            <p className="text-sm text-gray-500">
              © 2025 ООО «НАШ ДОМ». Все права защищены.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;