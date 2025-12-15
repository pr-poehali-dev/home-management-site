import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import RunningLine from "@/components/RunningLine";
import YandexMap from "@/components/YandexMap";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";
import { houses as housesData } from "@/data/housesData";
import { useSiteContent } from "@/hooks/useSiteContent";

interface NewsItem {
  id: number;
  title: string;
  date: string;
  tag: string;
  content: string;
}

const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return dateString;
    }
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  } catch {
    return dateString;
  }
};

const Index = () => {
  const { getContent } = useSiteContent();
  const [selectedHouse, setSelectedHouse] = useState<number | null>(null);
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const [latestNews, setLatestNews] = useState<NewsItem[]>([]);
  const [isLoadingNews, setIsLoadingNews] = useState(true);
  const [isCharacterDeflating, setIsCharacterDeflating] = useState(false);

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    const elements = document.querySelectorAll('.scroll-fade-in');
    elements.forEach((el) => observer.observe(el));

    const handleScroll = () => {
      const offset = window.pageYOffset;
      setParallaxOffset(offset * 0.5);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("https://functions.poehali.dev/6f5d03d9-cebe-4ce5-b3cd-39bd952ae555");
        const data = await response.json();
        
        // Добавляем новости СМИ, если их ещё нет
        const hasMaxNews = data.news?.some((n: NewsItem) => 
          n.title.includes("СМИ о создании домовых чатов")
        );
        const hasCoolingPeriodNews = data.news?.some((n: NewsItem) => 
          n.title.includes("периоде охлаждения")
        );
        
        const maxNews: NewsItem = {
          id: 999,
          title: "СМИ о создании домовых чатов в национальном мессенджере MAX",
          date: "2024-12-10",
          tag: "Актуальное из СМИ",
          content: `Министр строительства и ЖКХ РФ Ирек Файзуллин объявил о переводе общедомовых чатов в российский мессенджер Max до конца 2025 года.

Основные требования:
• Каждый многоквартирный дом должен создать чат в Max
• Необходимо перенести все данные из Telegram и WhatsApp
• Официально закрепить статус домового чата

Работа затронет почти миллион российских многоквартирных домов.

Подробнее читайте в материалах СМИ:
• Российская газета: https://rg.ru/2025/11/12/fajzullin-obshchedomovye-chaty-dolzhny-perejti-v-max-do-konca-goda.html
• РБК: https://www.rbc.ru/rbcfreenews/6914fc889a794770b27a83b4

Наша управляющая компания готова помочь жителям в переходе на новый мессенджер и создании общедомовых чатов.`
        };

        const coolingPeriodNews: NewsItem = {
          id: 998,
          title: "СМИ о периоде охлаждения при продаже квартир",
          date: "2024-12-10",
          tag: "Актуальное из СМИ",
          content: `В Госдуму внесён законопроект о введении «периода охлаждения» при продаже недвижимости. Если его примут, новые правила могут вступить в силу с января 2026 года.

Основные положения законопроекта:

• 7-дневный период охлаждения — госрегистрация сделки будет проводиться только через семь дней после заключения договора купли-продажи

• Запрет наличных расчётов — продавец сможет получить деньги только после регистрации перехода права собственности и только на банковский счёт

• Обязательное нотариальное удостоверение для всех сделок с недвижимостью

• При продаже единственного жилья потребуется нотариально заверенное согласие лица, у которого продавец будет жить после сделки

Цель законопроекта: защита от мошенничества при продаже квартир и обеспечение надёжной защиты добросовестных продавцов и покупателей.

Подробнее читайте в материалах СМИ:
• Коммерсантъ: https://www.kommersant.ru/doc/8229770
• РБК: https://companies.rbc.ru/news/IKrLq5tqJh/period-ohlazhdeniya-kak-novyij-zakonoproekt-menyaet-ryinok-nedvizhimosti/

Мы следим за всеми изменениями в законодательстве, чтобы информировать наших жителей о важных нововведениях.`
        };
        
        // Фильтруем старые новости категории "Новое о ЖКХ" и добавляем новости СМИ
        const filteredNews = (data.news || []).filter((n: NewsItem) => n.tag !== "Новое о ЖКХ" && n.tag !== "Архив");
        const newsToAdd: NewsItem[] = [];
        if (!hasCoolingPeriodNews) newsToAdd.push(coolingPeriodNews);
        if (!hasMaxNews) newsToAdd.push(maxNews);
        const finalNews = [...newsToAdd, ...filteredNews];
        
        // Берём только последние 3 новости
        const displayNews = finalNews.slice(0, 3).map(news => 
          news.tag === "Важно!" ? {...news, tag: "ВНИМАНИЕ"} : news
        );
        
        setLatestNews(displayNews);
      } catch (error) {
        console.error("Ошибка загрузки новостей:", error);
      } finally {
        setIsLoadingNews(false);
      }
    };

    fetchNews();
  }, []);



  const houses = housesData
    .filter(h => h.type === "Жилой дом")
    .map((house, index) => ({
      id: index + 1,
      name: house.company.includes("Кудрово") ? "Кудрово" : house.address.split(",")[0],
      address: `${house.city}, ${house.address}`,
      houseId: house.id
    }));

  return (
    <Layout>
      <RunningLine text={getContent('running_line_text', 'Дорогие друзья! 2025 год для нас стал особенным, мы стали совсем взрослыми, нам исполнилось 18 лет! В связи с чем пришло время перемен, так что давайте знакомиться заново.')} />
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: 'url(https://cdn.poehali.dev/files/00e99c93-741c-4c4e-85a4-24bcf90a731c.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundAttachment: 'fixed',
          imageRendering: 'crisp-edges',
          filter: 'brightness(1.1) contrast(1.05)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/40 to-black/50"></div>
      </div>
      
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <filter id="remove-white">
            <feColorMatrix type="matrix" values="
              1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
              -0.5 -0.5 -0.5 1.5 0
            "/>
            <feComponentTransfer>
              <feFuncR type="linear" slope="1.3" intercept="0.1"/>
              <feFuncG type="linear" slope="1.3" intercept="0.1"/>
              <feFuncB type="linear" slope="1.3" intercept="0.1"/>
            </feComponentTransfer>
          </filter>
        </defs>
      </svg>
      
      <div 
        className={`running-character ${isCharacterDeflating ? 'character-deflating' : ''}`}
        onClick={() => {
          if (!isCharacterDeflating) {
            setIsCharacterDeflating(true);
            setTimeout(() => {
              setIsCharacterDeflating(false);
            }, 8000);
          }
        }}
        style={{ cursor: 'pointer' }}
      >
        <img 
          src="https://cdn.poehali.dev/files/10057953-8a2e-440e-be01-e3f0f5d32c05_0567dc02-1482-483f-a2ec-8ce68670e4dd.png" 
          alt="Наш Дом"
          className="character-img"
          style={{ filter: 'url(#remove-white)' }}
        />
      </div>
      
      <section className="relative py-16 md:py-24 overflow-hidden min-h-[600px] md:min-h-[700px] z-10">
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-secondary text-secondary-foreground mb-6 animate-fade-in">
              18 лет на рынке ЖКХ
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              {getContent('home_hero_title', 'Живите комфортно, остальное — наша забота.')}
            </h1>
            <p className="text-xl text-white/90 mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              {getContent('home_hero_description', 'Мы — команда профессионалов в управлении жилой недвижимостью. Обслуживаем более 50 многоквартирных домов, обеспечивая комфорт и безопасность на 1 млн м² площади. Позвольте нам позаботиться о Вашем доме!')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <Link to="/services">
                <Button size="lg" className="w-full sm:w-auto">
                  Наши услуги
                  <Icon name="ArrowRight" size={18} className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-6 bg-primary text-primary-foreground scroll-fade-in relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold mb-0.5">1 млн м²</div>
              <div className="text-[10px] md:text-xs opacity-90">Обслуживаемая площадь</div>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold mb-0.5">50+</div>
              <div className="text-[10px] md:text-xs opacity-90">Многоквартирных домов</div>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold mb-0.5">13</div>
              <div className="text-[10px] md:text-xs opacity-90">Паркингов</div>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold mb-0.5">18 лет</div>
              <div className="text-[10px] md:text-xs opacity-90">Опыт работы</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 scroll-fade-in relative z-10">
        <div className="absolute inset-0 bg-background/85"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Наши дома на карте</h2>
            <p className="text-lg text-muted-foreground">
              Мы обслуживаем дома в разных районах города
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <YandexMap onHouseSelect={setSelectedHouse} />
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

      <section className="py-20 bg-muted/30 scroll-fade-in relative z-10">
        <div className="absolute inset-0 bg-background/85"></div>
        <div className="container mx-auto px-4 relative">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Последние новости</h2>
              <p className="text-muted-foreground">Важная информация для жильцов</p>
            </div>
            <Link to="/news">
              <Button variant="outline">
                Все новости
                <Icon name="ArrowRight" size={16} className="ml-2" />
              </Button>
            </Link>
          </div>

          {isLoadingNews ? (
            <div className="text-center py-12">
              <Icon name="Loader2" size={48} className="text-muted-foreground mx-auto mb-4 animate-spin" />
              <p className="text-xl text-muted-foreground">
                Загрузка новостей...
              </p>
            </div>
          ) : latestNews.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {latestNews.map((news) => (
                <Card key={news.id} className="hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6">
                    <Badge
                      className={
                        news.tag === "ВНИМАНИЕ"
                          ? "bg-destructive"
                          : news.tag === "Актуальное из СМИ" || news.tag === "Новое о ЖКХ"
                          ? "bg-secondary"
                          : "bg-primary"
                      }
                    >
                      {news.tag === "ВНИМАНИЕ" && <Icon name="Zap" size={14} className="mr-1" />}
                      {news.tag}
                    </Badge>
                    <h3 className="font-semibold mt-4 mb-2">{news.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-3">{news.content}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Icon name="Calendar" size={14} />
                        {formatDate(news.date)}
                      </span>
                      <Link to="/news" className="text-primary hover:underline">
                        Читать далее
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Icon name="FileSearch" size={48} className="text-muted-foreground mx-auto mb-4" />
              <p className="text-xl text-muted-foreground">
                Новостей пока нет
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="py-20 scroll-fade-in relative z-10">
        <div className="absolute inset-0 bg-background/85"></div>
        <div className="container mx-auto px-4 relative">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-secondary/20 to-secondary/5 rounded-lg flex items-center justify-center mb-4 shadow-md">
                  <Icon name="Wrench" className="text-secondary" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Услуги</h3>
                <p className="text-muted-foreground mb-4">Полный перечень услуг</p>
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