import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";

interface NewsItem {
  id: number;
  title: string;
  date: string;
  tag: string;
  content: string;
}

const AdminNews = () => {
  const [adminKey, setAdminKey] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("Важно!");
  const [isLoading, setIsLoading] = useState(false);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const { toast } = useToast();

  const handleAuth = () => {
    if (adminKey === "admin123") {
      setIsAuthenticated(true);
      toast({
        title: "Успешно",
        description: "Вы вошли в админ-панель",
      });
      fetchNews();
    } else {
      toast({
        title: "Ошибка",
        description: "Неверный ключ доступа",
        variant: "destructive",
      });
    }
  };

  const fetchNews = async () => {
    try {
      const response = await fetch("https://functions.poehali.dev/6f5d03d9-cebe-4ce5-b3cd-39bd952ae555");
      const data = await response.json();
      setNews(data.news || []);
    } catch (error) {
      console.error("Ошибка загрузки новостей:", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchNews();
    }
  }, [isAuthenticated]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const url = "https://functions.poehali.dev/6f5d03d9-cebe-4ce5-b3cd-39bd952ae555";
      const method = editingId ? "PUT" : "POST";
      const body = editingId 
        ? JSON.stringify({ id: editingId, title, content, tag })
        : JSON.stringify({ title, content, tag });

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "X-Admin-Key": adminKey,
        },
        body,
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Успешно",
          description: editingId ? "Новость обновлена" : "Новость добавлена",
        });
        setTitle("");
        setContent("");
        setTag("Важно!");
        setEditingId(null);
        fetchNews();
      } else {
        toast({
          title: "Ошибка",
          description: data.error || "Не удалось сохранить новость",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось подключиться к серверу",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (newsItem: NewsItem) => {
    setEditingId(newsItem.id);
    setTitle(newsItem.title);
    setContent(newsItem.content);
    setTag(newsItem.tag);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Вы уверены, что хотите удалить эту новость?")) return;

    try {
      const response = await fetch(`https://functions.poehali.dev/6f5d03d9-cebe-4ce5-b3cd-39bd952ae555?id=${id}`, {
        method: "DELETE",
        headers: {
          "X-Admin-Key": adminKey,
        },
      });

      if (response.ok) {
        toast({
          title: "Успешно",
          description: "Новость удалена",
        });
        fetchNews();
      } else {
        const data = await response.json();
        toast({
          title: "Ошибка",
          description: data.error || "Не удалось удалить новость",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось подключиться к серверу",
        variant: "destructive",
      });
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setTitle("");
    setContent("");
    setTag("Важно!");
  };

  if (!isAuthenticated) {
    return (
      <Layout>
        <section className="py-20 min-h-[calc(100vh-200px)] flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Вход в админ-панель</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="adminKey">Ключ доступа</Label>
                <Input
                  id="adminKey"
                  type="password"
                  value={adminKey}
                  onChange={(e) => setAdminKey(e.target.value)}
                  placeholder="Введите ключ доступа"
                  onKeyPress={(e) => e.key === 'Enter' && handleAuth()}
                />
              </div>
              <Button onClick={handleAuth} className="w-full">
                Войти
              </Button>
            </CardContent>
          </Card>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>{editingId ? "Редактирование новости" : "Добавление новости"}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="title">Заголовок</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Введите заголовок новости"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="tag">Категория</Label>
                    <Select value={tag} onValueChange={setTag}>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите категорию" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Важно!">Важно!</SelectItem>
                        <SelectItem value="Новое о ЖКХ">Новое о ЖКХ</SelectItem>
                        <SelectItem value="Собрание">Собрание</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="content">Содержание</Label>
                    <Textarea
                      id="content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Введите текст новости"
                      rows={8}
                      required
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button type="submit" disabled={isLoading} className="flex-1">
                      {isLoading ? "Сохранение..." : editingId ? "Обновить" : "Добавить"}
                    </Button>
                    {editingId && (
                      <Button type="button" variant="outline" onClick={handleCancel}>
                        Отмена
                      </Button>
                    )}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setIsAuthenticated(false);
                        setAdminKey("");
                      }}
                    >
                      Выйти
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Все новости ({news.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-[600px] overflow-y-auto">
                    {news.map((item) => (
                      <Card key={item.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge
                                  className={
                                    item.tag === "Важно!"
                                      ? "bg-destructive"
                                      : item.tag === "Новое о ЖКХ"
                                      ? "bg-secondary"
                                      : "bg-primary"
                                  }
                                >
                                  {item.tag}
                                </Badge>
                                <span className="text-xs text-muted-foreground">{item.date}</span>
                              </div>
                              <h4 className="font-semibold mb-1">{item.title}</h4>
                              <p className="text-sm text-muted-foreground line-clamp-2">{item.content}</p>
                            </div>
                            <div className="flex flex-col gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleEdit(item)}
                              >
                                <Icon name="Edit" size={16} />
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleDelete(item.id)}
                              >
                                <Icon name="Trash2" size={16} />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AdminNews;
