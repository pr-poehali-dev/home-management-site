import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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

const News = () => {
  const [selectedTag, setSelectedTag] = useState<string>("Все");
  const [allNews, setAllNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

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
          date: "2025-12-10",
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
          date: "2025-12-10",
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
        const filteredNews = (data.news || []).filter((n: NewsItem) => n.tag !== "Новое о ЖКХ");
        const newsToAdd: NewsItem[] = [];
        if (!hasCoolingPeriodNews) newsToAdd.push(coolingPeriodNews);
        if (!hasMaxNews) newsToAdd.push(maxNews);
        const finalNews = [...newsToAdd, ...filteredNews];
        
        setAllNews(finalNews);
      } catch (error) {
        console.error("Ошибка загрузки новостей:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  const tags = ["Все", "ВНИМАНИЕ", "Актуальное из СМИ", "Собрание"];

  const filteredNews =
    selectedTag === "Все" 
      ? allNews.filter((news) => news.tag !== "Архив")
      : allNews.filter((news) => news.tag === selectedTag && news.tag !== "Архив")
          .map(news => news.tag === "Важно!" ? {...news, tag: "ВНИМАНИЕ"} : news);

  const displayNews = filteredNews.map(news => 
    news.tag === "Важно!" ? {...news, tag: "ВНИМАНИЕ"} : news
  );

  return (
    <Layout>
      <section className="py-20 bg-gradient-to-br from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Новости и объявления</h1>
            <p className="text-xl text-muted-foreground">
              Актуальная информация о событиях, работах и изменениях
            </p>
          </div>

          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {tags.map((tag) => (
              <Button
                key={tag}
                variant={selectedTag === tag ? "default" : "outline"}
                onClick={() => setSelectedTag(tag)}
              >
                {tag}
              </Button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {displayNews.map((news) => (
              <Card 
                key={news.id} 
                className={`hover:shadow-lg transition-shadow cursor-pointer ${
                  news.tag === "ВНИМАНИЕ" ? "urgent-card" : ""
                }`}
                onClick={() => setSelectedNews(news)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
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
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Icon name="Calendar" size={14} />
                      {formatDate(news.date)}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-3">{news.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {news.content}
                  </p>
                  <div className="mt-4 text-primary text-sm font-medium flex items-center gap-1">
                    Читать полностью
                    <Icon name="ChevronRight" size={16} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Dialog open={!!selectedNews} onOpenChange={() => setSelectedNews(null)}>
            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Badge
                    className={
                      selectedNews?.tag === "ВНИМАНИЕ"
                        ? "bg-destructive"
                        : selectedNews?.tag === "Актуальное из СМИ" || selectedNews?.tag === "Новое о ЖКХ"
                        ? "bg-secondary"
                        : "bg-primary"
                    }
                  >
                    {selectedNews?.tag === "ВНИМАНИЕ" && <Icon name="Zap" size={14} className="mr-1" />}
                    {selectedNews?.tag}
                  </Badge>
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Icon name="Calendar" size={14} />
                    {selectedNews && formatDate(selectedNews.date)}
                  </span>
                </div>
                <DialogTitle className="text-2xl">{selectedNews?.title}</DialogTitle>
              </DialogHeader>
              <div className="mt-4 whitespace-pre-wrap text-muted-foreground">
                {selectedNews?.content}
              </div>
            </DialogContent>
          </Dialog>

          {isLoading && (
            <div className="text-center py-12">
              <Icon name="Loader2" size={48} className="text-muted-foreground mx-auto mb-4 animate-spin" />
              <p className="text-xl text-muted-foreground">
                Загрузка новостей...
              </p>
            </div>
          )}

          {!isLoading && filteredNews.length === 0 && (
            <div className="text-center py-12">
              <Icon name="FileSearch" size={48} className="text-muted-foreground mx-auto mb-4" />
              <p className="text-xl text-muted-foreground">
                Новостей в данной категории пока нет
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default News;