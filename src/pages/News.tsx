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
        setAllNews(data.news || []);
      } catch (error) {
        console.error("Ошибка загрузки новостей:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  const tags = ["Все", "Важно!", "Новое о ЖКХ", "Собрание"];

  const filteredNews =
    selectedTag === "Все" 
      ? allNews.filter((news) => news.tag !== "Архив")
      : allNews.filter((news) => news.tag === selectedTag && news.tag !== "Архив");

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
            {filteredNews.map((news) => (
              <Card 
                key={news.id} 
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedNews(news)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Badge
                      className={
                        news.tag === "Важно!"
                          ? "bg-destructive"
                          : news.tag === "Новое о ЖКХ"
                          ? "bg-secondary"
                          : "bg-primary"
                      }
                    >
                      {news.tag}
                    </Badge>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Icon name="Calendar" size={14} />
                      {news.date}
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
                      selectedNews?.tag === "Важно!"
                        ? "bg-destructive"
                        : selectedNews?.tag === "Новое о ЖКХ"
                        ? "bg-secondary"
                        : "bg-primary"
                    }
                  >
                    {selectedNews?.tag}
                  </Badge>
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Icon name="Calendar" size={14} />
                    {selectedNews?.date}
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