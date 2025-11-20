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
import { Textarea } from "@/components/ui/textarea";

const Index = () => {
  const [meterValue, setMeterValue] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [activeSection, setActiveSection] = useState("home");
  const [feedbackForm, setFeedbackForm] = useState({ name: "", phone: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{type: 'success' | 'error', message: string} | null>(null);

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
      category: "Управление",
      items: [
        "Администрирование: организация и контроль всех рабочих процессов",
        "Финансовое обслуживание: планирование, бухучет, учет расчетов",
        "Юридическое сопровождение договорной деятельности"
      ]
    },
    {
      category: "Техническое обслуживание",
      items: [
        "Техническое обслуживание инженерных систем здания",
        "Технический надзор за состоянием общего имущества",
        "Текущий ремонт общего имущества дома",
        "Незамедлительное устранение аварий и неисправностей",
        "Выполнение работ по заявкам жителей"
      ]
    },
    {
      category: "Санитарное содержание",
      items: [
        "Поддержание в надлежащем санитарном состоянии",
        "Сбор и вывоз мусора"
      ]
    },
    {
      category: "Благоустройство",
      items: [
        "Уход за зелеными насаждениями",
        "Обслуживание предметов интерьера на территории",
        "Разработка проектов по благоустройству"
      ]
    },
    {
      category: "Обеспечение безопасности",
      items: [
        "Круглосуточная охрана жилого комплекса и паркинга",
        "Организация службы видеонаблюдения и контроля",
        "Взаимодействие с органами полиции и пожарной инспекции"
      ]
    },
    {
      category: "Аварийная диспетчерская служба",
      items: [
        "Круглосуточное дежурство диспетчера",
        "Постоянный контроль за состоянием инженерных систем",
        "Вызов аварийных служб при аварийных ситуациях"
      ]
    }
  ];

  const documents = [
    { category: "Уставные документы", items: ["Устав организации", "Свидетельство о регистрации", "Лицензии"] },
    { category: "Финансовая отчетность", items: ["Отчет за 2024 год", "Отчет за 1 квартал 2025", "Смета расходов"] },
    { category: "Протоколы собраний", items: ["Протокол от 15.09.2025", "Протокол от 12.06.2025"] }
  ];

  const houses = [
    { id: 1, address: "ЖК Золотое сечение", x: 25, y: 35 },
    { id: 2, address: "ЖК Остров", x: 40, y: 25 },
    { id: 3, address: "ЖК Пляж", x: 65, y: 45 },
    { id: 4, address: "ЖК Наука", x: 50, y: 65 },
    { id: 5, address: "ЖК NewПитер", x: 75, y: 50 },
    { id: 6, address: "Кудрово", x: 85, y: 30 },
    { id: 7, address: "ЖК Панорама", x: 15, y: 55 },
    { id: 8, address: "ЖК Адмирал", x: 35, y: 70 }
  ];

  const managedHouses = [
    { name: "Поселок 'Сад Времени'", address: "ул. Беловой д. 1г стр. 1", manager: "Александр Васильевич Павлюк", phone: "+7 931 251 1040" },
    { name: "ЖК 'Золотое сечение'", address: "ул. Васенко, д 12 литера А", manager: "Екатерина Васильевна Павлова", phone: "+7 921 334-43-74" },
    { name: "ЖК 'Золотое сечение'", address: "просп. Металлистов, д. 116, корп. 1 литера А", manager: "Екатерина Васильевна Павлова", phone: "+7 921 334-43-74" },
    { name: "ЖК 'Остров'", address: "Петровский проспект, д. 5, стр. 1", manager: "Евдокимов Сергей Борисович", phone: "+7 921 632-48-39" },
    { name: "БЦ 'Грани'", address: "ул. Большая Зеленина, д. 24 стр. 1", manager: "Галина Алексеевна Рожкова", phone: "+7 993 641-35-95" },
    { name: "ЖК 'Пляж'", address: "Приморское шоссе, д. 352, стр. 1", manager: "Павлюк Александр Васильевич", phone: "+7 931 251-10-40" },
    { name: "ЖК 'Панорама'", address: "Кондратьевский просп, д. 62, корп. 7", manager: "Наталья Валерьевна Машкарина", phone: "+7 931 240-22-37" },
    { name: "ЖК 'Наука'", address: "ул. Академика Константинова, д. 1, корп. 1, стр. 1", manager: "Елена Викторовна Суконкина", phone: "+7 921 366-50-88" },
    { name: "ЖК 'Новое Купчино'", address: "ул. Малая Бухарестская, д. 12, стр. 1", manager: "Наталья Геннадьевна Мурашова", phone: "+7 931 388-65-80" },
    { name: "ЖК 'Адмирал'", address: "ул. Одоевского, 21, корп.1 стр. 1", manager: "Галина Алексеевна Рожкова", phone: "+7 993 641-35-95" },
    { name: "Апарт-отель 'Аватар'", address: "ул. Ремесленная, 21, стр. 1", manager: "Галина Алексеевна Рожкова", phone: "+7 993 641-35-95" },
    { name: "ЖК NewПитер", address: "Питерский проспект, д. 1, 5, 7", manager: "Ольга Вадимовна Васильева", phone: "+7 921 943-72-93" },
    { name: "ЖК NewПитер", address: "Невская улица, д. 1, 3, 4, 5/7, 6, 10/5", manager: "Вера Ивановна Бакшеева", phone: "+7 921 337-43-41" },
    { name: "ЖК NewПитер", address: "Адмиралтейская улица, д. 1, 3, 9", manager: "Ольга Вадимовна Васильева", phone: "+7 921 943-73-93" },
    { name: "Кудрово", address: "ул. Областная, д. 3, 5, 7, 9", manager: "Анна Николаевна Кочевова", phone: "+7 921 385-79-31" },
    { name: "Кудрово", address: "Каштановая аллея, д. 2, 3", manager: "Марина Николаевна Мельникова", phone: "+7 921 357-34-09" },
    { name: "Кудрово", address: "просп. Строителей, д. 2, 4, 6", manager: "Анастасия Олеговна Сажнева", phone: "+7 999 024-61-74" }
  ];

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('https://functions.poehali.dev/3084c1e9-97b6-4782-a9a2-953cc8b81ee1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedbackForm)
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({ type: 'success', message: 'Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.' });
        setFeedbackForm({ name: '', phone: '', message: '' });
      } else {
        setSubmitStatus({ type: 'error', message: data.error || 'Произошла ошибка при отправке заявки' });
      }
    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'Не удалось отправить заявку. Проверьте подключение к интернету.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-sm animate-slide-in">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3">
              <img 
                src="https://cdn.poehali.dev/files/04401540-8975-406d-b79e-16642a5bd00d.png" 
                alt="НАШ ДОМ" 
                className="w-16 h-16 object-contain"
              />
              <div>
                <h1 className="text-xl font-bold text-foreground">НАШ ДОМ</h1>
                <p className="text-xs text-muted-foreground">Группа Управляющих Компаний</p>
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-1">
              {["home", "about", "houses", "news", "services", "documents", "contacts"].map((section) => (
                <Button
                  key={section}
                  variant={activeSection === section ? "default" : "ghost"}
                  onClick={() => scrollToSection(section)}
                  className="capitalize"
                >
                  {section === "home" && "Главная"}
                  {section === "about" && "О компании"}
                  {section === "houses" && "Наши дома"}
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
                  {["home", "about", "houses", "news", "services", "documents", "contacts"].map((section) => (
                    <Button
                      key={section}
                      variant="ghost"
                      onClick={() => scrollToSection(section)}
                      className="justify-start text-lg capitalize"
                    >
                      {section === "home" && "Главная"}
                      {section === "about" && "О компании"}
                      {section === "houses" && "Наши дома"}
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

      <div className="fixed bottom-6 right-6 z-50 animate-scale-in">
        <Card className="bg-destructive text-white border-0 shadow-2xl">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
                <Icon name="Phone" className="text-white" size={24} />
              </div>
              <div>
                <p className="text-xs font-medium opacity-90">Аварийная диспетчерская</p>
                <a href="tel:+78126408826" className="text-lg font-bold hover:underline">
                  +7 (812) 640-88-26
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <section id="home" className="py-20 bg-gradient-to-br from-primary/5 via-white to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Группа Управляющих Компаний «НАШ ДОМ»
            </h2>
            <p className="text-xl text-muted-foreground mb-10">
              Предоставляем высокий уровень клиентского сервиса, чтобы быть полезными для наших жителей в любое время и по любому вопросу
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
                <h3 className="text-xl font-semibold mb-2">Опыт</h3>
                <p className="text-muted-foreground">С 2007 года в сфере управления жилой недвижимостью</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all hover:-translate-y-1 duration-300 animate-fade-in" style={{animationDelay: '0.2s', animationFillMode: 'both'}}>
              <CardContent className="pt-8 pb-6">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Eye" className="text-secondary" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Прозрачность</h3>
                <p className="text-muted-foreground">Полная открытость финансовой отчетности и решений</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all hover:-translate-y-1 duration-300 animate-fade-in" style={{animationDelay: '0.3s', animationFillMode: 'both'}}>
              <CardContent className="pt-8 pb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Heart" className="text-primary" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Забота</h3>
                <p className="text-muted-foreground">Быстрое реагирование на ваши запросы 24/7</p>
              </CardContent>
            </Card>
          </div>

          <Card className="max-w-5xl mx-auto mt-12 animate-fade-in" style={{animationDelay: '0.4s', animationFillMode: 'both'}}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="MapPin" className="text-primary" />
                Дома под нашим управлением
              </CardTitle>
              <CardDescription>Нажмите на маркер, чтобы посмотреть адрес</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative w-full h-[400px] bg-gradient-to-br from-slate-100 to-blue-50 rounded-lg overflow-hidden">
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

          <Card className="max-w-2xl mx-auto mt-12 bg-gradient-to-br from-primary/5 to-secondary/5 animate-fade-in" style={{animationDelay: '0.5s', animationFillMode: 'both'}}>
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
            <h2 className="text-4xl font-bold mb-8 text-center animate-fade-in">О компании</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="hover:shadow-lg transition-all duration-300 animate-slide-in" style={{animationDelay: '0.1s', animationFillMode: 'both'}}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="History" className="text-primary" />
                    Наша история
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p>
                    Группа управляющих компаний «Наш дом», создана профессионалами в сфере эксплуатации жилой недвижимости в 2007 году.
                  </p>
                  <p>
                    Мы занимаемся обслуживанием и управлением домами, регулярно модернизируем сервис ЖКХ. Находим и внедряем лучшие из возможных решений в сфере управления жилой недвижимостью.
                  </p>
                  <p>
                    Это, прежде всего, команда единомышленников, объединившая молодых специалистов и опытных квалифицированных сотрудников, работающих в сфере управления жилищно-коммунальным хозяйством не один год.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300 animate-slide-in-right" style={{animationDelay: '0.2s', animationFillMode: 'both'}}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Target" className="text-secondary" />
                    Наша миссия
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p className="font-semibold mb-3">Основные принципы работы:</p>
                  <ul className="space-y-2 text-sm">
                    <li>• Прогрессивные методы управления</li>
                    <li>• Комплексный подход к управлению для получения максимального результата</li>
                    <li>• Забота о комфорте клиента</li>
                    <li>• Системный и последовательный подход к решению текущих проблем жителей</li>
                    <li>• Демократичная ценовая политика</li>
                    <li>• Использование труда исключительно высококвалифицированных специалистов</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">18</div>
                <div className="text-sm text-muted-foreground">Лет оказываем услуги</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">50+</div>
                <div className="text-sm text-muted-foreground">Многоквартирных домов</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">13</div>
                <div className="text-sm text-muted-foreground">Паркингов</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">1 млн м²</div>
                <div className="text-sm text-muted-foreground">Обслуживаемой площади</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="houses" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center animate-fade-in">Дома под нашим управлением</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Мы обслуживаем {managedHouses.length} многоквартирных домов и 13 паркингов в Санкт-Петербурге и Ленобласти
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {managedHouses.map((house, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in" style={{animationDelay: `${index * 0.05}s`, animationFillMode: 'both'}}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Icon name="Building" className="text-primary" size={20} />
                      {house.name}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <Icon name="MapPin" size={14} />
                      {house.address}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Управляющий:</span>
                        <span className="font-semibold">{house.manager}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Телефон:</span>
                        <a href={`tel:${house.phone}`} className="font-semibold text-primary hover:underline">{house.phone}</a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="news" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center animate-fade-in">Новости и объявления</h2>
            <div className="space-y-4">
              {news.map((item, index) => (
                <Card key={item.id} className="hover:shadow-lg transition-all duration-300 hover:-translate-x-2 animate-slide-in" style={{animationDelay: `${index * 0.1}s`, animationFillMode: 'both'}}>
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
            <h2 className="text-4xl font-bold mb-8 text-center animate-fade-in">Услуги и тарифы</h2>

            <Tabs defaultValue="services" className="w-full animate-fade-in-up" style={{animationDelay: '0.2s', animationFillMode: 'both'}}>
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
                <div className="space-y-6">
                  {services.map((service, index) => (
                    <Card key={index} className="hover:shadow-lg transition-all duration-300 animate-scale-in" style={{animationDelay: `${index * 0.1}s`, animationFillMode: 'both'}}>
                      <CardHeader>
                        <CardTitle className="text-xl flex items-center gap-2">
                          <Icon name="CheckCircle2" className="text-primary" size={24} />
                          {service.category}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {service.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-start gap-2 text-muted-foreground">
                              <Icon name="Dot" className="text-primary shrink-0 mt-1" size={20} />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="calculator">
                <Card className="animate-fade-in bg-gradient-to-br from-primary/5 to-secondary/5">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="Info" className="text-primary" />
                      Индивидуальный расчет тарифов
                    </CardTitle>
                    <CardDescription>
                      Стоимость услуг рассчитывается индивидуально для каждого дома
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      Для получения подробного расчета свяжитесь с управляющим вашего дома или отправьте заявку через форму обратной связи.
                    </p>
                    <Button onClick={() => scrollToSection("feedback")} className="w-full gap-2" size="lg">
                      <Icon name="MessageSquare" size={20} />
                      Отправить заявку
                    </Button>
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
            <h2 className="text-4xl font-bold mb-8 text-center animate-fade-in">Документы</h2>
            <Card className="animate-fade-in-up" style={{animationDelay: '0.1s', animationFillMode: 'both'}}>
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

            <Card className="mt-8 bg-blue-50 border-blue-200 animate-fade-in-up" style={{animationDelay: '0.2s', animationFillMode: 'both'}}>
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

      <section id="feedback" className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center animate-fade-in">Форма обратной связи</h2>
            <Card className="animate-fade-in-up" style={{animationDelay: '0.1s', animationFillMode: 'both'}}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="MessageSquare" className="text-primary" />
                  Отправьте заявку или задайте вопрос
                </CardTitle>
                <CardDescription>
                  Мы ответим в течение 24 часов в рабочие дни
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleFeedbackSubmit} className="space-y-6">
                  {submitStatus && (
                    <div className={`p-4 rounded-lg ${
                      submitStatus.type === 'success' 
                        ? 'bg-green-50 border border-green-200 text-green-800' 
                        : 'bg-red-50 border border-red-200 text-red-800'
                    }`}>
                      <div className="flex items-center gap-2">
                        <Icon name={submitStatus.type === 'success' ? 'CheckCircle' : 'AlertCircle'} size={20} />
                        <p className="text-sm font-medium">{submitStatus.message}</p>
                      </div>
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="name">Ваше имя *</Label>
                    <Input
                      id="name"
                      placeholder="Иван Иванов"
                      value={feedbackForm.name}
                      onChange={(e) => setFeedbackForm({...feedbackForm, name: e.target.value})}
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Телефон *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+7 (999) 123-45-67"
                      value={feedbackForm.phone}
                      onChange={(e) => setFeedbackForm({...feedbackForm, phone: e.target.value})}
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Ваше сообщение *</Label>
                    <Textarea
                      id="message"
                      placeholder="Опишите вашу проблему или вопрос..."
                      value={feedbackForm.message}
                      onChange={(e) => setFeedbackForm({...feedbackForm, message: e.target.value})}
                      rows={5}
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full gap-2" disabled={isSubmitting}>
                    <Icon name={isSubmitting ? "Loader2" : "Send"} size={20} className={isSubmitting ? "animate-spin" : ""} />
                    {isSubmitting ? 'Отправляем...' : 'Отправить заявку'}
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center animate-fade-in">Контакты и реквизиты</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="hover:shadow-lg transition-all duration-300 animate-slide-in" style={{animationDelay: '0.1s', animationFillMode: 'both'}}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Phone" className="text-primary" />
                    Телефоны
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="font-semibold mb-1">Аварийная диспетчерская (круглосуточно)</div>
                    <a href="tel:+78126408826" className="text-primary text-xl font-bold hover:underline">
                      +7 (812) 640-88-26
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300 animate-slide-in-right" style={{animationDelay: '0.2s', animationFillMode: 'both'}}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="MapPin" className="text-primary" />
                    Адрес офиса
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-muted-foreground text-sm mb-2">График работы:</p>
                    <p className="text-sm">Пн-Чт: 09:00 - 18:00</p>
                    <p className="text-sm">Пт: 09:00 - 17:00</p>
                    <p className="text-sm">Обед: 13:00-14:00</p>
                    <p className="text-sm">Сб-Вс: выходной</p>
                  </div>
                  <Separator />
                  <div>
                    <div className="font-semibold mb-1">Email</div>
                    <div className="space-y-1">
                      <a href="mailto:uk.nashdom@inbox.ru" className="text-primary hover:underline block">
                        uk.nashdom@inbox.ru
                      </a>
                      <a href="mailto:uk.nash-dom@mail.ru" className="text-primary hover:underline block">
                        uk.nash-dom@mail.ru
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-8 animate-fade-in-up" style={{animationDelay: '0.3s', animationFillMode: 'both'}}>
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
                    <p className="text-muted-foreground">Группа Управляющих Компаний «НАШ ДОМ»</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Телефон:</p>
                    <p className="text-muted-foreground">+7 (812) 640-88-26</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Email:</p>
                    <p className="text-muted-foreground">uk.nashdom@inbox.ru</p>
                    <p className="text-muted-foreground">uk.nash-dom@mail.ru</p>
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
              <img 
                src="https://cdn.poehali.dev/files/04401540-8975-406d-b79e-16642a5bd00d.png" 
                alt="НАШ ДОМ" 
                className="w-16 h-16 object-contain"
              />
              <div className="text-left">
                <h3 className="text-xl font-bold">НАШ ДОМ</h3>
                <p className="text-sm text-gray-400">Группа Управляющих Компаний</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Надежное управление недвижимостью с 2007 года
            </p>
            <div className="text-sm text-gray-500 space-y-1">
              <p>Телефон: +7 (812) 640-88-26</p>
              <p>Email: uk.nashdom@inbox.ru</p>
              <p className="mt-3">© 2025 Группа УК «НАШ ДОМ». Все права защищены.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;