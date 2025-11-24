import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";

const Index = () => {
  const [meterValue, setMeterValue] = useState("");
  const [selectedHouse, setSelectedHouse] = useState<number | null>(null);

  const latestNews = [
    {
      id: 1,
      title: "Плановые работы по лифтам в домах №12, №14",
      date: "15 ноября 2025",
      tag: "Ремонт",
      excerpt: "С 20 по 25 ноября будут проводиться плановые работы...",
    },
    {
      id: 2,
      title: "Общее собрание жильцов дома №8",
      date: "10 ноября 2025",
      tag: "Собрание",
      excerpt: "Приглашаем всех собственников квартир на общее собрание...",
    },
    {
      id: 3,
      title: "Новые тарифы на отопление",
      date: "5 ноября 2025",
      tag: "Важно!",
      excerpt: "С 1 декабря 2025 года изменяются тарифы на коммунальные услуги...",
    },
  ];

  const houses = [
    { id: 1, name: "ЖК Золотое сечение", address: "ул. Васенко, д 12", x: 25, y: 35 },
    { id: 2, name: "ЖК Остров", address: "Петровский пр., д. 5", x: 40, y: 25 },
    { id: 3, name: "ЖК Пляж", address: "Приморское ш., д. 352", x: 65, y: 45 },
    { id: 4, name: "ЖК Наука", address: "ул. Ак. Константинова", x: 50, y: 65 },
    { id: 5, name: "ЖК NewПитер", address: "Питерский пр., д. 1", x: 75, y: 50 },
    { id: 6, name: "Кудрово", address: "ул. Областная, д. 3", x: 85, y: 30 },
    { id: 7, name: "ЖК Панорама", address: "Кондратьевский пр., 62", x: 15, y: 55 },
    { id: 8, name: "ЖК Адмирал", address: "ул. Одоевского, 21", x: 35, y: 70 },
  ];

  const handleMeterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Показания ${meterValue} кВт·ч успешно отправлены!`);
    setMeterValue("");
  };

  return (
    <Layout>
      <section className="relative bg-gradient-to-br from-primary/5 via-background to-background py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-secondary text-secondary-foreground">
                18 лет на рынке ЖКХ
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gradient-sapphire">
                Ваш комфорт — наша забота
              </h1>
              <p className="text-xl text-muted-foreground">
                Профессиональное управление жилой недвижимостью. Обслуживаем более 50
                многоквартирных домов и 1 млн м² площади.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/services">
                  <Button size="lg" className="w-full sm:w-auto">
                    Наши услуги
                    <Icon name="ArrowRight" size={18} className="ml-2" />
                  </Button>
                </Link>
                <Link to="/for-residents">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    <Icon name="Info" size={18} className="mr-2" />
                    Для жильцов
                  </Button>
                </Link>
              </div>
            </div>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Icon name="Zap" className="text-secondary" />
                  Передать показания счётчика
                </h3>
                <form onSubmit={handleMeterSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="meter">Показания электроэнергии (кВт·ч)</Label>
                    <Input
                      id="meter"
                      type="number"
                      placeholder="Введите показания"
                      value={meterValue}
                      onChange={(e) => setMeterValue(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Отправить показания
                  </Button>
                </form>
                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <div className="flex items-start gap-3">
                    <Icon name="Info" className="text-primary mt-1 flex-shrink-0" size={20} />
                    <div className="text-sm text-muted-foreground">
                      <p className="font-medium text-foreground mb-1">Как передать показания?</p>
                      <p>
                        Снимите показания со счётчика и введите значение в поле выше. Показания
                        принимаются с 20 по 25 число каждого месяца.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">1 млн м²</div>
              <div className="text-sm md:text-base opacity-90">Обслуживаемая площадь</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">50+</div>
              <div className="text-sm md:text-base opacity-90">Многоквартирных домов</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">13</div>
              <div className="text-sm md:text-base opacity-90">Паркингов</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">18 лет</div>
              <div className="text-sm md:text-base opacity-90">Опыт работы</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient-sapphire">Наши дома на карте</h2>
            <p className="text-lg text-muted-foreground">
              Мы обслуживаем дома в разных районах города
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative aspect-[16/10] bg-muted">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <rect width="100" height="100" fill="#f1f5f9" />
                      <path
                        d="M10,30 Q30,10 50,30 T90,30 L90,70 Q70,90 50,70 T10,70 Z"
                        fill="#e2e8f0"
                        opacity="0.5"
                      />
                      {houses.map((house) => (
                        <g
                          key={house.id}
                          onClick={() => setSelectedHouse(house.id)}
                          className="cursor-pointer transition-transform hover:scale-110"
                        >
                          <circle
                            cx={house.x}
                            cy={house.y}
                            r={selectedHouse === house.id ? "3" : "2.5"}
                            fill={selectedHouse === house.id ? "#f59e0b" : "#1e40af"}
                            stroke="white"
                            strokeWidth="0.5"
                          />
                        </g>
                      ))}
                    </svg>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-3 max-h-[500px] overflow-y-auto">
              {houses.map((house) => (
                <Card
                  key={house.id}
                  className={`cursor-pointer transition-all duration-300 ${
                    selectedHouse === house.id
                      ? "border-secondary shadow-2xl shadow-secondary/20"
                      : "hover:border-muted-foreground/20 hover:shadow-lg hover:shadow-black/20"
                  }`}
                  onClick={() => setSelectedHouse(house.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-md ${
                          selectedHouse === house.id ? "bg-gradient-to-br from-secondary to-secondary/80" : "bg-gradient-to-br from-primary to-primary/80"
                        }`}
                      >
                        <Icon
                          name="Building2"
                          size={16}
                          className={selectedHouse === house.id ? "text-secondary-foreground" : "text-primary-foreground"}
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold">{house.name}</h4>
                        <p className="text-sm text-muted-foreground">{house.address}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gradient-sapphire">Последние новости</h2>
              <p className="text-muted-foreground">Важная информация для жильцов</p>
            </div>
            <Link to="/news">
              <Button variant="outline">
                Все новости
                <Icon name="ArrowRight" size={16} className="ml-2" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {latestNews.map((news) => (
              <Card key={news.id} className="hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <Badge
                    className={
                      news.tag === "Важно!"
                        ? "bg-destructive"
                        : news.tag === "Ремонт"
                        ? "bg-secondary"
                        : "bg-primary"
                    }
                  >
                    {news.tag}
                  </Badge>
                  <h3 className="font-semibold mt-4 mb-2">{news.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{news.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Icon name="Calendar" size={14} />
                      {news.date}
                    </span>
                    <Link to="/news" className="text-primary hover:underline">
                      Читать далее
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center mb-4 shadow-md">
                  <Icon name="FileText" className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Документы</h3>
                <p className="text-muted-foreground mb-4">
                  Устав, отчётность, протоколы собраний
                </p>
                <Link to="/documents">
                  <Button variant="outline" className="w-full">
                    Перейти в раздел
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-secondary/20 to-secondary/5 rounded-lg flex items-center justify-center mb-4 shadow-md">
                  <Icon name="Wrench" className="text-secondary" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Услуги и тарифы</h3>
                <p className="text-muted-foreground mb-4">Полный перечень услуг с ценами</p>
                <Link to="/services">
                  <Button variant="outline" className="w-full">
                    Узнать подробнее
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center mb-4 shadow-md">
                  <Icon name="HelpCircle" className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Для жильцов</h3>
                <p className="text-muted-foreground mb-4">
                  Инструкции и полезная информация
                </p>
                <Link to="/for-residents">
                  <Button variant="outline" className="w-full">
                    Полезное
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;