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
      title: "Планові роботи з ліфтів у будинках №12, №14",
      date: "15 листопада 2025",
      tag: "Ремонт",
      content: "З 20 по 25 листопада проводитимуться планові роботи з технічного обслуговування ліфтів."
    },
    {
      id: 2,
      title: "Загальні збори мешканців будинку №8",
      date: "10 листопада 2025",
      tag: "Збори",
      content: "Запрошуємо всіх власників квартир на загальні збори 18 листопада о 19:00."
    },
    {
      id: 3,
      title: "Нові тарифи на опалення",
      date: "5 листопада 2025",
      tag: "Важливо!",
      content: "З 1 грудня 2025 року змінюються тарифи на комунальні послуги."
    }
  ];

  const services = [
    {
      name: "Утримання будинку",
      price: "25.50",
      unit: "грн/м²",
      description: "Прибирання під'їздів, озеленення території, вивіз сміття"
    },
    {
      name: "Поточний ремонт",
      price: "8.20",
      unit: "грн/м²",
      description: "Ремонт спільного майна, фарбування, дрібні роботи"
    },
    {
      name: "Опалення",
      price: "42.30",
      unit: "грн/м²",
      description: "Централізоване опалення квартир та під'їздів"
    },
    {
      name: "Вода (холодна)",
      price: "18.50",
      unit: "грн/м³",
      description: "Постачання холодної води"
    }
  ];

  const documents = [
    { category: "Статутні документи", items: ["Устав організації", "Свідоцтво про реєстрацію", "Ліцензії"] },
    { category: "Фінансова звітність", items: ["Звіт за 2024 рік", "Звіт за 1 квартал 2025", "Кошторис витрат"] },
    { category: "Протоколи зборів", items: ["Протокол від 15.09.2025", "Протокол від 12.06.2025"] }
  ];

  const houses = [
    { id: 1, address: "вул. Шевченка, 12", x: 20, y: 30 },
    { id: 2, address: "вул. Шевченка, 14", x: 35, y: 25 },
    { id: 3, address: "вул. Франка, 8", x: 60, y: 40 },
    { id: 4, address: "вул. Грушевського, 5", x: 45, y: 60 },
    { id: 5, address: "вул. Грушевського, 7", x: 75, y: 55 }
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
                <h1 className="text-xl font-bold text-foreground">НАШ ДІМ</h1>
                <p className="text-xs text-muted-foreground">Група Управляючих Компаній</p>
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
                  {section === "home" && "Головна"}
                  {section === "about" && "Про компанію"}
                  {section === "news" && "Новини"}
                  {section === "services" && "Послуги"}
                  {section === "documents" && "Документи"}
                  {section === "contacts" && "Контакти"}
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
                      {section === "home" && "Головна"}
                      {section === "about" && "Про компанію"}
                      {section === "news" && "Новини"}
                      {section === "services" && "Послуги"}
                      {section === "documents" && "Документи"}
                      {section === "contacts" && "Контакти"}
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
                <p className="text-xs font-medium opacity-90">Аварійна диспетчерська</p>
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
              Професійне управління вашим будинком
            </h2>
            <p className="text-xl text-muted-foreground mb-10">
              Надійність, відкритість і турбота про комфорт кожного мешканця
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="gap-2" onClick={() => scrollToSection("services")}>
                <Icon name="ClipboardList" size={20} />
                Наші послуги
              </Button>
              <Button size="lg" variant="outline" className="gap-2" onClick={() => scrollToSection("contacts")}>
                <Icon name="MessageCircle" size={20} />
                Зв'язатися з нами
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-16">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-8 pb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Shield" className="text-primary" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Надійність</h3>
                <p className="text-muted-foreground">Понад 15 років досвіду в управлінні нерухомістю</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-8 pb-6">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Eye" className="text-secondary" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Прозорість</h3>
                <p className="text-muted-foreground">Повна відкритість фінансової звітності та рішень</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-8 pb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Heart" className="text-primary" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Турбота</h3>
                <p className="text-muted-foreground">Швидке реагування на ваші запити 24/7</p>
              </CardContent>
            </Card>
          </div>

          <Card className="max-w-5xl mx-auto mt-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="MapPin" className="text-primary" />
                Будинки під нашим управлінням
              </CardTitle>
              <CardDescription>Натисніть на маркер, щоб переглянути адресу</CardDescription>
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
                Передати показання лічильників
              </CardTitle>
              <CardDescription>Електроенергія</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="meter">Показання лічильника (кВт·год)</Label>
                  <Input
                    id="meter"
                    type="number"
                    placeholder="Введіть показання"
                    value={meterValue}
                    onChange={(e) => setMeterValue(e.target.value)}
                    className="text-lg"
                  />
                </div>
                <Button className="w-full gap-2" size="lg">
                  <Icon name="Send" size={20} />
                  Відправити показання
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center">Про компанію</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="History" className="text-primary" />
                    Наша історія
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p>
                    Група управляючих компаній «НАШ ДІМ» працює на ринку житлово-комунальних послуг з 2010 року.
                  </p>
                  <p>
                    За цей час ми здобули довіру тисяч мешканців завдяки професіоналізму, відповідальності та
                    індивідуальному підходу до кожного будинку.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Target" className="text-secondary" />
                    Наша місія
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p>
                    Створювати комфортні умови для проживання, забезпечуючи високу якість послуг та прозорість у
                    роботі.
                  </p>
                  <p>Ми прагнемо бути не просто управляючою компанією, а надійним партнером для кожного мешканця.</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">15+</div>
                <div className="text-sm text-muted-foreground">Років досвіду</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">47</div>
                <div className="text-sm text-muted-foreground">Будинків під управлінням</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">8500+</div>
                <div className="text-sm text-muted-foreground">Задоволених клієнтів</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                <div className="text-sm text-muted-foreground">Підтримка</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="news" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center">Новини та оголошення</h2>
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
                        variant={item.tag === "Важливо!" ? "destructive" : "secondary"}
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
            <h2 className="text-4xl font-bold mb-8 text-center">Послуги та тарифи</h2>

            <Tabs defaultValue="services" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="services" className="gap-2">
                  <Icon name="ListChecks" size={18} />
                  Послуги
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
                    <CardTitle>Розрахунок вартості послуг</CardTitle>
                    <CardDescription>Введіть площу вашої квартири для розрахунку</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="area">Площа квартири (м²)</Label>
                      <Input id="area" type="number" placeholder="Наприклад, 65" />
                    </div>
                    <div className="space-y-2">
                      <Label>Оберіть послугу</Label>
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
                      <span>Орієнтовна вартість:</span>
                      <span className="text-2xl text-primary">— грн/міс</span>
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
            <h2 className="text-4xl font-bold mb-8 text-center">Документи</h2>
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
                  Корисна інформація для мешканців
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <a href="#" className="flex items-center justify-between p-3 bg-white rounded-lg hover:shadow-md transition-shadow">
                  <span className="font-medium">Як передати показання лічильників</span>
                  <Icon name="ChevronRight" className="text-muted-foreground" />
                </a>
                <a href="#" className="flex items-center justify-between p-3 bg-white rounded-lg hover:shadow-md transition-shadow">
                  <span className="font-medium">Як оплатити квитанцію онлайн</span>
                  <Icon name="ChevronRight" className="text-muted-foreground" />
                </a>
                <a href="#" className="flex items-center justify-between p-3 bg-white rounded-lg hover:shadow-md transition-shadow">
                  <span className="font-medium">Правила утримання домашніх тварин</span>
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
            <h2 className="text-4xl font-bold mb-8 text-center">Контакти та реквізити</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Phone" className="text-primary" />
                    Телефони
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="font-semibold mb-1">Аварійна диспетчерська (цілодобово)</div>
                    <a href="tel:0800501234" className="text-primary text-xl font-bold hover:underline">
                      0800-50-12-34
                    </a>
                  </div>
                  <Separator />
                  <div>
                    <div className="font-semibold mb-1">Бухгалтерія</div>
                    <a href="tel:0445551122" className="text-primary hover:underline">
                      (044) 555-11-22
                    </a>
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Приймальня</div>
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
                    Адреса офісу
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-semibold mb-2">м. Київ, вул. Хрещатик, 25, офіс 301</p>
                    <p className="text-muted-foreground text-sm mb-2">Графік роботи:</p>
                    <p className="text-sm">Пн-Пт: 9:00 - 18:00</p>
                    <p className="text-sm">Сб: 10:00 - 15:00</p>
                    <p className="text-sm">Нд: вихідний</p>
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
                  Реквізити
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6 text-sm">
                  <div>
                    <p className="font-semibold mb-1">Повна назва:</p>
                    <p className="text-muted-foreground">Товариство з обмеженою відповідальністю «НАШ ДІМ»</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">ЄДРПОУ:</p>
                    <p className="text-muted-foreground">12345678</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">IBAN:</p>
                    <p className="text-muted-foreground">UA123456789012345678901234567</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Банк:</p>
                    <p className="text-muted-foreground">АТ «ПриватБанк»</p>
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
                <h3 className="text-xl font-bold">НАШ ДІМ</h3>
                <p className="text-sm text-gray-400">Група Управляючих Компаній</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Надійне управління нерухомістю з 2010 року
            </p>
            <p className="text-sm text-gray-500">
              © 2025 ТОВ «НАШ ДІМ». Всі права захищені.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
