import { useState, useEffect, useRef } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface NewsItem {
  id: number;
  title: string;
  date: string;
  tag: string;
  content: string;
  videoUrl?: string;
  imageUrl?: string;
  pdfUrl?: string;
}

const NEWS_URL = "https://functions.poehali.dev/6f5d03d9-cebe-4ce5-b3cd-39bd952ae555";
const UPLOAD_URL = "https://functions.poehali.dev/4b4bbe31-4eea-4ac0-9b2b-8e4c78567b4e";
const ADMIN_KEY = "admin123";

const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
  } catch {
    return dateString;
  }
};

const News = () => {
  const [selectedTag, setSelectedTag] = useState<string>("Все");
  const [allNews, setAllNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  // Режим администратора
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [authPassword, setAuthPassword] = useState("");
  const [authError, setAuthError] = useState(false);
  const secretClickCount = useRef(0);
  const secretClickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Редактирование новости
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [isUploadingPdf, setIsUploadingPdf] = useState(false);
  const [editPdfUrl, setEditPdfUrl] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const { toast } = useToast();

  const fetchNews = async () => {
    try {
      const response = await fetch(NEWS_URL);
      const data = await response.json();

      const hasTariffNews = data.news?.some((n: NewsItem) => n.title.includes("Увеличение размера платы за ЖКУ"));
      const hasMaxNews = data.news?.some((n: NewsItem) => n.title.includes("СМИ о создании домовых чатов"));
      const hasCoolingPeriodNews = data.news?.some((n: NewsItem) => n.title.includes("периоде охлаждения"));

      const tariffIncreaseNews: NewsItem = {
        id: 1000,
        title: "Увеличение размера платы за ЖКУ с 01.01.2026",
        date: "2026-01-16",
        tag: "ВНИМАНИЕ",
        content: `Уважаемые собственники!\n\nУведомляем Вас, что с 01.01.2026 увеличивается размер платы за Жилищно-коммунальные услуги в соответствии с Распоряжениями Комитета по тарифам и ценовой политике Ленинградской области, Администрации Заневского городского поселения.`
      };

      const maxNews: NewsItem = {
        id: 999,
        title: "СМИ о создании домовых чатов в национальном мессенджере MAX",
        date: "2025-12-10",
        tag: "Актуальное из СМИ",
        content: `Министр строительства и ЖКХ РФ Ирек Файзуллин объявил о переводе общедомовых чатов в российский мессенджер Max до конца 2025 года.\n\nОсновные требования:\n• Каждый многоквартирный дом должен создать чат в Max\n• Необходимо перенести все данные из Telegram и WhatsApp\n• Официально закрепить статус домового чата\n\nРабота затронет почти миллион российских многоквартирных домов.\n\nПодробнее читайте в материалах СМИ:\n• Российская газета: https://rg.ru/2025/11/12/fajzullin-obshchedomovye-chaty-dolzhny-perejti-v-max-do-konca-goda.html\n• РБК: https://www.rbc.ru/rbcfreenews/6914fc889a794770b27a83b4\n\nНаша управляющая компания готова помочь жителям в переходе на новый мессенджер и создании общедомовых чатов.`
      };

      const coolingPeriodNews: NewsItem = {
        id: 998,
        title: "СМИ о периоде охлаждения при продаже квартир",
        date: "2025-12-10",
        tag: "Актуальное из СМИ",
        content: `В Госдуму внесён законопроект о введении «периода охлаждения» при продаже недвижимости. Если его примут, новые правила могут вступить в силу с января 2026 года.\n\nОсновные положения законопроекта:\n\n• 7-дневный период охлаждения — госрегистрация сделки будет проводиться только через семь дней после заключения договора купли-продажи\n\n• Запрет наличных расчётов — продавец сможет получить деньги только после регистрации перехода права собственности и только на банковский счёт\n\n• Обязательное нотариальное удостоверение для всех сделок с недвижимостью\n\n• При продаже единственного жилья потребуется нотариально заверенное согласие лица, у которого продавец будет жить после сделки\n\nЦель законопроекта: защита от мошенничества при продаже квартир и обеспечение надёжной защиты добросовестных продавцов и покупателей.\n\nПодробнее читайте в материалах СМИ:\n• Коммерсантъ: https://www.kommersant.ru/doc/8229770\n• РБК: https://companies.rbc.ru/news/IKrLq5tqJh/period-ohlazhdeniya-kak-novyij-zakonoproekt-menyaet-ryinok-nedvizhimosti/\n\nМы следим за всеми изменениями в законодательстве, чтобы информировать наших жителей о важных нововведениях.`
      };

      const filteredNews = (data.news || []).filter((n: NewsItem) => n.tag !== "Новое о ЖКХ").map((n: NewsItem & { video_url?: string; image_url?: string; pdf_url?: string }) => ({
        ...n,
        videoUrl: n.video_url,
        imageUrl: n.image_url,
        pdfUrl: n.pdf_url
      }));

      const newsToAdd: NewsItem[] = [];
      if (!hasTariffNews) newsToAdd.push(tariffIncreaseNews);
      if (!hasCoolingPeriodNews) newsToAdd.push(coolingPeriodNews);
      if (!hasMaxNews) newsToAdd.push(maxNews);

      setAllNews([...newsToAdd, ...filteredNews]);
    } catch (error) {
      console.error("Ошибка загрузки новостей:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // Секретный вход: 5 кликов по заголовку страницы
  const handleSecretClick = () => {
    secretClickCount.current += 1;
    if (secretClickTimer.current) clearTimeout(secretClickTimer.current);
    secretClickTimer.current = setTimeout(() => { secretClickCount.current = 0; }, 2000);
    if (secretClickCount.current >= 5) {
      secretClickCount.current = 0;
      if (isAdmin) {
        setIsAdmin(false);
        toast({ title: "Режим редактирования выключен" });
      } else {
        setShowAuthDialog(true);
      }
    }
  };

  const handleAuth = () => {
    if (authPassword === ADMIN_KEY) {
      setIsAdmin(true);
      setShowAuthDialog(false);
      setAuthPassword("");
      setAuthError(false);
      toast({ title: "Режим редактирования включён" });
    } else {
      setAuthError(true);
    }
  };

  const handleEditClick = (e: React.MouseEvent, news: NewsItem) => {
    e.stopPropagation();
    setEditingNews(news);
    setEditTitle(news.title);
    setEditPdfUrl(news.pdfUrl || "");
  };

  const handlePdfUpload = async (file: File) => {
    setIsUploadingPdf(true);
    try {
      const presignedRes = await fetch(UPLOAD_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "news-pdf", contentType: "application/pdf" }),
      });
      const { uploadUrl, cdnUrl } = await presignedRes.json();
      await fetch(uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": "application/pdf" },
        body: file,
      });
      setEditPdfUrl(cdnUrl);
      toast({ title: "PDF загружен успешно" });
    } catch {
      toast({ title: "Ошибка загрузки PDF", variant: "destructive" });
    } finally {
      setIsUploadingPdf(false);
    }
  };

  const handleSave = async () => {
    if (!editingNews) return;
    setIsSaving(true);
    try {
      const body: Record<string, unknown> = { id: editingNews.id };
      if (editTitle !== editingNews.title) body.title = editTitle;
      body.pdf_url = editPdfUrl || null;

      const response = await fetch(NEWS_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json", "X-Admin-Key": ADMIN_KEY },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        toast({ title: "Новость сохранена" });
        setEditingNews(null);
        await fetchNews();
      } else {
        toast({ title: "Ошибка сохранения", variant: "destructive" });
      }
    } catch {
      toast({ title: "Ошибка соединения", variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };

  const tags = ["Все", "ВНИМАНИЕ", "Актуальное из СМИ", "Собрание", "Обо всём"];

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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Новости и объявления
            </h1>
            <p className="text-xl text-muted-foreground">
              Актуальная информация о событиях, работах и изменениях
            </p>
            {isAdmin && (
              <div className="mt-3 inline-flex items-center gap-2 text-sm text-primary bg-primary/10 px-3 py-1 rounded-full">
                <Icon name="Pencil" size={14} />
                Режим редактирования активен
              </div>
            )}
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
                className={`hover:shadow-lg transition-shadow cursor-pointer relative ${
                  news.tag === "ВНИМАНИЕ" ? "urgent-card" : ""
                }`}
                onClick={() => setSelectedNews(news)}
              >
                {isAdmin && news.id < 900 && (
                  <button
                    className="absolute top-2 right-2 z-10 bg-primary text-primary-foreground rounded-full p-1.5 shadow hover:bg-primary/80 transition-colors"
                    onClick={(e) => handleEditClick(e, news)}
                    title="Редактировать"
                  >
                    <Icon name="Pencil" size={14} />
                  </button>
                )}
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
                  {news.imageUrl && (
                    <div className="mb-3 rounded-lg overflow-hidden bg-white">
                      <img src={news.imageUrl} alt={news.title} className="w-full h-auto object-contain" />
                    </div>
                  )}
                  {news.videoUrl && !news.imageUrl && (
                    <div className="mb-3 aspect-video rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                      <Icon name="Video" size={32} className="text-muted-foreground" />
                    </div>
                  )}
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {news.content}
                  </p>
                  {news.pdfUrl && (
                    <div className="mt-3">
                      <span className="inline-flex items-center gap-1 text-sm text-destructive font-medium">
                        <Icon name="FileText" size={14} />
                        PDF прикреплён
                      </span>
                    </div>
                  )}
                  <div className="mt-4 text-primary text-sm font-medium flex items-center gap-1">
                    Читать полностью
                    <Icon name="ChevronRight" size={16} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Просмотр новости */}
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
              {selectedNews?.imageUrl && (
                <div className="rounded-lg overflow-hidden mb-6 bg-white">
                  <img src={selectedNews.imageUrl} alt={selectedNews.title} className="w-full h-auto object-contain max-h-[70vh]" />
                </div>
              )}
              {selectedNews?.videoUrl && (
                <div className="mt-4">
                  {selectedNews.videoUrl.includes('yandex.ru') ? (
                    <a
                      href={selectedNews.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-6 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                    >
                      <div className="flex-shrink-0 w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon name="Video" size={32} className="text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold mb-1">Смотреть видео</div>
                        <div className="text-sm text-muted-foreground">Откроется в новом окне</div>
                      </div>
                      <Icon name="ExternalLink" size={20} className="text-muted-foreground" />
                    </a>
                  ) : selectedNews.videoUrl.includes('cdn.poehali.dev') || selectedNews.videoUrl.includes('.mp4') || selectedNews.videoUrl.includes('.webm') || selectedNews.videoUrl.includes('.mov') ? (
                    <div className="aspect-video rounded-lg overflow-hidden bg-black">
                      <video src={selectedNews.videoUrl} controls className="w-full h-full">
                        Ваш браузер не поддерживает воспроизведение видео.
                      </video>
                    </div>
                  ) : (
                    <div className="aspect-video rounded-lg overflow-hidden">
                      <iframe
                        src={selectedNews.videoUrl}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  )}
                </div>
              )}
              <div className="mt-4 whitespace-pre-wrap text-muted-foreground">
                {selectedNews?.content}
              </div>
              {selectedNews?.pdfUrl && (
                <div className="mt-6">
                  <a
                    href={selectedNews.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors w-full"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                      <Icon name="FileText" size={24} className="text-red-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-red-800">Решение (PDF)</div>
                      <div className="text-sm text-red-600">Нажмите для открытия документа</div>
                    </div>
                    <Icon name="Download" size={20} className="text-red-500" />
                  </a>
                </div>
              )}
            </DialogContent>
          </Dialog>

          {/* Диалог авторизации */}
          <Dialog open={showAuthDialog} onOpenChange={(open) => { setShowAuthDialog(open); setAuthPassword(""); setAuthError(false); }}>
            <DialogContent className="max-w-sm">
              <DialogHeader>
                <DialogTitle>Вход в режим редактирования</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="auth-password">Пароль</Label>
                  <Input
                    id="auth-password"
                    type="password"
                    value={authPassword}
                    onChange={(e) => { setAuthPassword(e.target.value); setAuthError(false); }}
                    onKeyDown={(e) => e.key === "Enter" && handleAuth()}
                    placeholder="Введите пароль"
                    className={authError ? "border-destructive" : ""}
                    autoFocus
                  />
                  {authError && <p className="text-sm text-destructive mt-1">Неверный пароль</p>}
                </div>
                <Button onClick={handleAuth} className="w-full">Войти</Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Диалог редактирования новости */}
          <Dialog open={!!editingNews} onOpenChange={(open) => { if (!open) setEditingNews(null); }}>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Редактирование новости</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="edit-title">Заголовок</Label>
                  <Input
                    id="edit-title"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-pdf">PDF файл</Label>
                  <Input
                    id="edit-pdf"
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handlePdfUpload(file);
                    }}
                    disabled={isUploadingPdf}
                    className="mt-1"
                  />
                  {isUploadingPdf && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                      <Icon name="Loader2" size={16} className="animate-spin" />
                      Загрузка PDF...
                    </div>
                  )}
                  {editPdfUrl && !isUploadingPdf && (
                    <div className="flex items-center gap-2 text-sm text-green-600 mt-2">
                      <Icon name="CheckCircle" size={16} />
                      <a href={editPdfUrl} target="_blank" rel="noopener noreferrer" className="underline truncate max-w-xs">
                        PDF прикреплён
                      </a>
                      <button
                        type="button"
                        className="text-destructive hover:text-destructive/80"
                        onClick={() => setEditPdfUrl("")}
                      >
                        <Icon name="X" size={14} />
                      </button>
                    </div>
                  )}
                  {!editPdfUrl && !isUploadingPdf && editingNews?.pdfUrl === undefined && (
                    <p className="text-xs text-muted-foreground mt-1">PDF не прикреплён</p>
                  )}
                </div>
                <div className="flex gap-3">
                  <Button onClick={handleSave} disabled={isSaving || isUploadingPdf} className="flex-1">
                    {isSaving ? "Сохранение..." : "Сохранить"}
                  </Button>
                  <Button variant="outline" onClick={() => setEditingNews(null)}>
                    Отмена
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {isLoading && (
            <div className="text-center py-12">
              <Icon name="Loader2" size={48} className="text-muted-foreground mx-auto mb-4 animate-spin" />
              <p className="text-xl text-muted-foreground">Загрузка новостей...</p>
            </div>
          )}

          {!isLoading && filteredNews.length === 0 && (
            <div className="text-center py-12">
              <Icon name="FileSearch" size={48} className="text-muted-foreground mx-auto mb-4" />
              <p className="text-xl text-muted-foreground">Новостей в данной категории пока нет</p>
            </div>
          )}
        </div>
      </section>

      {/* Скрытая кнопка входа в режим редактирования */}
      <button
        className="fixed bottom-4 right-4 w-8 h-8 opacity-0 hover:opacity-20 transition-opacity rounded-full bg-primary z-50"
        onClick={() => {
          if (isAdmin) {
            setIsAdmin(false);
            toast({ title: "Режим редактирования выключен" });
          } else {
            setShowAuthDialog(true);
          }
        }}
        title=""
        aria-label=""
      />
    </Layout>
  );
};

export default News;