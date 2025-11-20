import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const News = () => {
  const [selectedTag, setSelectedTag] = useState<string>("Все");

  const allNews = [
    {
      id: 1,
      title: "Плановые работы по лифтам в домах №12, №14",
      date: "15 ноября 2025",
      tag: "Ремонт",
      content:
        "С 20 по 25 ноября будут проводиться плановые работы по техническому обслуживанию лифтов. Просим жильцов заранее планировать свои перемещения. Работы будут проводиться с 9:00 до 18:00.",
    },
    {
      id: 2,
      title: "Общее собрание жильцов дома №8",
      date: "10 ноября 2025",
      tag: "Собрание",
      content:
        "Приглашаем всех собственников квартир на общее собрание 18 ноября в 19:00 в конференц-зале первого этажа. Повестка дня: утверждение сметы на капитальный ремонт, выбор подрядчика.",
    },
    {
      id: 3,
      title: "Новые тарифы на отопление",
      date: "5 ноября 2025",
      tag: "Важно!",
      content:
        "С 1 декабря 2025 года изменяются тарифы на коммунальные услуги. Тариф на отопление увеличится на 4,7%. Подробная информация доступна на официальном сайте поставщика услуг.",
    },
    {
      id: 4,
      title: "Благоустройство детских площадок",
      date: "1 ноября 2025",
      tag: "Ремонт",
      content:
        "Завершены работы по обновлению детских площадок в домах №3, №7, №15. Установлено новое безопасное покрытие и современное игровое оборудование.",
    },
    {
      id: 5,
      title: "График отключения горячей воды",
      date: "28 октября 2025",
      tag: "Важно!",
      content:
        "В период с 5 по 9 декабря в домах по ул. Васенко будет отключена горячая вода в связи с плановым ремонтом теплосетей. Приносим извинения за временные неудобства.",
    },
    {
      id: 6,
      title: "Итоги конкурса на лучший двор",
      date: "20 октября 2025",
      tag: "Собрание",
      content:
        "Подведены итоги ежегодного конкурса на лучший двор. Победителем стал ЖК Золотое сечение. Жители получат сертификат на дополнительное благоустройство территории.",
    },
  ];

  const tags = ["Все", "Важно!", "Ремонт", "Собрание"];

  const filteredNews =
    selectedTag === "Все" ? allNews : allNews.filter((news) => news.tag === selectedTag);

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
              <Card key={news.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
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
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Icon name="Calendar" size={14} />
                      {news.date}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-3">{news.title}</h3>
                  <p className="text-sm text-muted-foreground">{news.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredNews.length === 0 && (
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
