import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";

interface PageContent {
  id: string;
  title: string;
  section: string;
  content: string;
}

const AdminPages = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pages, setPages] = useState<PageContent[]>([
    {
      id: "home-hero",
      title: "Главная - Заголовок",
      section: "Главная страница",
      content: "Живите комфортно, остальное — наша забота."
    },
    {
      id: "home-description",
      title: "Главная - Описание",
      section: "Главная страница",
      content: "Мы — команда профессионалов в управлении жилой недвижимостью..."
    },
    {
      id: "about-title",
      title: "О компании - Заголовок",
      section: "О компании",
      content: "О нашей компании"
    }
  ]);
  const [editingPage, setEditingPage] = useState<PageContent | null>(null);
  const [saveStatus, setSaveStatus] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  const handleSave = async () => {
    if (!editingPage) return;
    
    setSaveStatus("Сохранение...");
    
    setTimeout(() => {
      const updatedPages = pages.map(p => 
        p.id === editingPage.id ? editingPage : p
      );
      setPages(updatedPages);
      setSaveStatus("✓ Сохранено");
      setTimeout(() => setSaveStatus(""), 2000);
    }, 500);
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5">
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link to="/admin/dashboard">
                <Button variant="ghost" size="icon">
                  <Icon name="ArrowLeft" size={24} />
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold">Редактор страниц</h1>
                <p className="text-sm text-muted-foreground">Редактирование текстов и контента</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-bold mb-4">Список разделов</h2>
            <div className="space-y-3">
              {pages.map((page) => (
                <Card 
                  key={page.id}
                  className={`cursor-pointer transition-all ${editingPage?.id === page.id ? 'ring-2 ring-primary' : 'hover:shadow-md'}`}
                  onClick={() => setEditingPage(page)}
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">{page.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{page.section}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {page.content}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            {editingPage ? (
              <Card>
                <CardHeader>
                  <CardTitle>Редактирование</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Заголовок раздела</Label>
                    <Input
                      value={editingPage.title}
                      onChange={(e) => setEditingPage({...editingPage, title: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label>Контент</Label>
                    <Textarea
                      value={editingPage.content}
                      onChange={(e) => setEditingPage({...editingPage, content: e.target.value})}
                      rows={10}
                      className="font-mono text-sm"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Button onClick={handleSave} className="w-full">
                      <Icon name="Save" size={18} className="mr-2" />
                      Сохранить изменения
                    </Button>
                  </div>
                  {saveStatus && (
                    <div className="text-center text-sm text-green-600 font-medium">
                      {saveStatus}
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card className="h-full flex items-center justify-center">
                <CardContent className="text-center text-muted-foreground py-12">
                  <Icon name="FileText" size={48} className="mx-auto mb-4 opacity-50" />
                  <p>Выберите раздел для редактирования</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPages;
