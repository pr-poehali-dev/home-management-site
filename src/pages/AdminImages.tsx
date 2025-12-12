import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";

interface ImageItem {
  id: string;
  url: string;
  title: string;
  location: string;
}

const AdminImages = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [images, setImages] = useState<ImageItem[]>([
    {
      id: "1",
      url: "https://cdn.poehali.dev/files/14eb97fa-77bb-472e-96a3-29f6ef0a52a8.jpg",
      title: "Логотип НАШ ДОМ",
      location: "Шапка сайта"
    }
  ]);
  const [uploadStatus, setUploadStatus] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadStatus("Загрузка...");

    const reader = new FileReader();
    reader.onloadend = () => {
      const newImage: ImageItem = {
        id: Date.now().toString(),
        url: reader.result as string,
        title: file.name,
        location: "Новое изображение"
      };
      setImages([newImage, ...images]);
      setUploadStatus("✓ Загружено");
      setTimeout(() => setUploadStatus(""), 2000);
    };
    reader.readAsDataURL(file);
  };

  const handleDelete = (id: string) => {
    if (confirm("Удалить это изображение?")) {
      setImages(images.filter(img => img.id !== id));
    }
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
                <h1 className="text-2xl font-bold">Управление изображениями</h1>
                <p className="text-sm text-muted-foreground">Загрузка и редактирование изображений</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Загрузить новое изображение</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="image-upload">Выберите файл</Label>
                <Input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="cursor-pointer"
                />
              </div>
              {uploadStatus && (
                <div className="text-sm text-green-600 font-medium">
                  {uploadStatus}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <h2 className="text-xl font-bold mb-4">Все изображения</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image) => (
            <Card key={image.id}>
              <CardHeader>
                <img 
                  src={image.url} 
                  alt={image.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </CardHeader>
              <CardContent>
                <h3 className="font-semibold mb-1">{image.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{image.location}</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Icon name="Edit" size={16} className="mr-1" />
                    Заменить
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => handleDelete(image.id)}
                  >
                    <Icon name="Trash2" size={16} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AdminImages;
