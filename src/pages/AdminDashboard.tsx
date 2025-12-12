import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  if (!isAuthenticated) return null;

  const sections = [
    {
      title: "Редактор страниц",
      description: "Редактирование текстов и контента страниц",
      icon: "FileText",
      link: "/admin/pages",
      color: "bg-blue-500"
    },
    {
      title: "Изображения",
      description: "Загрузка и управление изображениями",
      icon: "Image",
      link: "/admin/images",
      color: "bg-green-500"
    },
    {
      title: "Новости",
      description: "Управление новостями и объявлениями",
      icon: "Newspaper",
      link: "/admin/news",
      color: "bg-purple-500"
    },
    {
      title: "Дома",
      description: "Управление информацией о домах",
      icon: "Building",
      link: "/admin/houses",
      color: "bg-orange-500"
    },
    {
      title: "Документы",
      description: "Загрузка и управление документами",
      icon: "FileDown",
      link: "/admin/documents",
      color: "bg-red-500"
    },
    {
      title: "Настройки сайта",
      description: "Общие настройки и конфигурация",
      icon: "Settings",
      link: "/admin/settings",
      color: "bg-gray-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5">
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="Shield" size={32} className="text-primary" />
              <div>
                <h1 className="text-2xl font-bold">Админ-панель</h1>
                <p className="text-sm text-muted-foreground">Управление сайтом "НАШ ДОМ"</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/">
                <Button variant="outline">
                  <Icon name="Eye" size={18} className="mr-2" />
                  Посмотреть сайт
                </Button>
              </Link>
              <Button variant="destructive" onClick={handleLogout}>
                <Icon name="LogOut" size={18} className="mr-2" />
                Выйти
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Панель управления</h2>
          <p className="text-muted-foreground">
            Выберите раздел для редактирования
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section) => (
            <Link key={section.link} to={section.link}>
              <Card className="hover:shadow-lg transition-all cursor-pointer h-full">
                <CardHeader>
                  <div className={`w-12 h-12 ${section.color} rounded-lg flex items-center justify-center mb-3`}>
                    <Icon name={section.icon as any} size={24} className="text-white" />
                  </div>
                  <CardTitle>{section.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{section.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
