import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FileItem {
  path: string;
  type: 'file' | 'folder';
  content?: string;
}

const AdminCode = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [files, setFiles] = useState<FileItem[]>([]);
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [editContent, setEditContent] = useState("");
  const [newFilePath, setNewFilePath] = useState("");
  const [newFileType, setNewFileType] = useState<"page" | "function" | "component">("page");
  const [isLoading, setIsLoading] = useState(false);
  const [showNewFile, setShowNewFile] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
    } else {
      setIsAuthenticated(true);
      loadFiles();
    }
  }, [navigate]);

  const loadFiles = async () => {
    try {
      const response = await fetch("https://functions.poehali.dev/8d624450-b44a-4338-bfec-cc51f3e6df16");
      if (response.ok) {
        const data = await response.json();
        setFiles(data.files || []);
      }
    } catch (error) {
      console.error("Ошибка загрузки файлов:", error);
    }
  };

  const loadFileContent = async (filePath: string) => {
    try {
      const response = await fetch(
        `https://functions.poehali.dev/b8d69c5a-6c49-4b3b-8b4c-7e8f5a9c3d2e?path=${encodeURIComponent(filePath)}`
      );
      if (response.ok) {
        const data = await response.json();
        setSelectedFile({ path: filePath, type: 'file', content: data.content });
        setEditContent(data.content || "");
      }
    } catch (error) {
      console.error("Ошибка загрузки файла:", error);
    }
  };

  const saveFile = async () => {
    if (!selectedFile) return;
    setIsLoading(true);

    try {
      const response = await fetch("https://functions.poehali.dev/b8d69c5a-6c49-4b3b-8b4c-7e8f5a9c3d2e", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          path: selectedFile.path,
          content: editContent,
        }),
      });

      if (response.ok) {
        alert("Файл успешно сохранён!");
        loadFiles();
      } else {
        alert("Ошибка сохранения файла");
      }
    } catch (error) {
      alert("Ошибка подключения");
    } finally {
      setIsLoading(false);
    }
  };

  const createNewFile = async () => {
    if (!newFilePath) {
      alert("Укажите путь к файлу");
      return;
    }

    setIsLoading(true);

    const templates: Record<string, string> = {
      page: `import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";

const NewPage = () => {
  return (
    <Layout>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-6">Новая страница</h1>
          <Card>
            <CardContent className="p-8">
              <p>Содержимое страницы</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default NewPage;`,
      function: `import json
import os
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Описание функции
    Args: event - HTTP запрос, context - контекст выполнения
    Returns: HTTP ответ
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method == 'GET':
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'message': 'Hello from new function'}),
            'isBase64Encoded': False
        }
    
    return {
        'statusCode': 405,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Method not allowed'}),
        'isBase64Encoded': False
    }`,
      component: `import Icon from "@/components/ui/icon";

interface NewComponentProps {
  title?: string;
}

const NewComponent = ({ title = "Заголовок" }: NewComponentProps) => {
  return (
    <div className="p-6 bg-card rounded-lg">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <p className="text-muted-foreground">Содержимое компонента</p>
    </div>
  );
};

export default NewComponent;`,
    };

    try {
      const response = await fetch("https://functions.poehali.dev/b8d69c5a-6c49-4b3b-8b4c-7e8f5a9c3d2e", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          path: newFilePath,
          content: templates[newFileType],
          type: newFileType,
        }),
      });

      if (response.ok) {
        alert("Файл успешно создан!");
        setShowNewFile(false);
        setNewFilePath("");
        loadFiles();
      } else {
        alert("Ошибка создания файла");
      }
    } catch (error) {
      alert("Ошибка подключения");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteFile = async (filePath: string) => {
    if (!confirm(`Удалить файл ${filePath}?`)) return;

    try {
      const response = await fetch(
        `https://functions.poehali.dev/b8d69c5a-6c49-4b3b-8b4c-7e8f5a9c3d2e?path=${encodeURIComponent(filePath)}`,
        { method: "DELETE" }
      );

      if (response.ok) {
        alert("Файл удалён!");
        if (selectedFile?.path === filePath) {
          setSelectedFile(null);
          setEditContent("");
        }
        loadFiles();
      } else {
        alert("Ошибка удаления файла");
      }
    } catch (error) {
      alert("Ошибка подключения");
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5">
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="Code" size={32} className="text-primary" />
              <div>
                <h1 className="text-2xl font-bold">Редактор кода</h1>
                <p className="text-sm text-muted-foreground">Управление файлами, функциями и страницами</p>
              </div>
            </div>
            <Link to="/admin/dashboard">
              <Button variant="outline">
                <Icon name="ArrowLeft" size={18} className="mr-2" />
                Назад
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Файлы проекта</CardTitle>
                <Button size="sm" onClick={() => setShowNewFile(!showNewFile)}>
                  <Icon name="Plus" size={16} />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {showNewFile && (
                <div className="space-y-3 mb-4 p-4 bg-muted rounded-lg">
                  <div className="space-y-2">
                    <Label>Тип файла</Label>
                    <Select value={newFileType} onValueChange={(value: any) => setNewFileType(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="page">Страница</SelectItem>
                        <SelectItem value="function">Функция</SelectItem>
                        <SelectItem value="component">Компонент</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Путь</Label>
                    <Input
                      placeholder={
                        newFileType === "page"
                          ? "src/pages/NewPage.tsx"
                          : newFileType === "function"
                          ? "backend/my-function/index.py"
                          : "src/components/NewComponent.tsx"
                      }
                      value={newFilePath}
                      onChange={(e) => setNewFilePath(e.target.value)}
                    />
                  </div>
                  <Button size="sm" onClick={createNewFile} disabled={isLoading} className="w-full">
                    Создать
                  </Button>
                </div>
              )}

              <div className="space-y-2 max-h-[600px] overflow-y-auto">
                {files.map((file) => (
                  <div
                    key={file.path}
                    className={`p-3 rounded-lg cursor-pointer hover:bg-muted transition-colors ${
                      selectedFile?.path === file.path ? "bg-muted" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div
                        className="flex items-center gap-2 flex-1"
                        onClick={() => loadFileContent(file.path)}
                      >
                        <Icon
                          name={file.type === "folder" ? "Folder" : "FileText"}
                          size={16}
                          className="text-primary"
                        />
                        <span className="text-sm truncate">{file.path}</span>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => deleteFile(file.path)}
                        className="h-8 w-8 p-0"
                      >
                        <Icon name="Trash2" size={14} className="text-destructive" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>
                {selectedFile ? selectedFile.path : "Выберите файл для редактирования"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedFile ? (
                <div className="space-y-4">
                  <Textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="min-h-[500px] font-mono text-sm"
                    placeholder="Содержимое файла..."
                  />
                  <div className="flex gap-3">
                    <Button onClick={saveFile} disabled={isLoading}>
                      <Icon name="Save" size={18} className="mr-2" />
                      {isLoading ? "Сохранение..." : "Сохранить"}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedFile(null);
                        setEditContent("");
                      }}
                    >
                      Отменить
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-20 text-muted-foreground">
                  <Icon name="Code" size={48} className="mx-auto mb-4 opacity-50" />
                  <p>Выберите файл из списка слева для начала редактирования</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdminCode;