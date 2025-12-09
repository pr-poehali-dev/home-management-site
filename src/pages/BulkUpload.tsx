import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useToast } from "@/components/ui/use-toast";
import { houses } from "@/data/housesData";
import funcUrls from "../../backend/func2url.json";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UploadItem {
  houseId: string;
  houseImage?: File;
  managerImage?: File;
  status: 'pending' | 'uploading' | 'success' | 'error';
  error?: string;
}

const BulkUpload = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [uploads, setUploads] = useState<UploadItem[]>([]);
  const [selectedHouseId, setSelectedHouseId] = useState<string>("");
  const [uploading, setUploading] = useState(false);

  const addUploadItem = () => {
    if (!selectedHouseId) {
      toast({
        title: "Ошибка",
        description: "Выберите дом из списка",
        variant: "destructive"
      });
      return;
    }

    if (uploads.find(u => u.houseId === selectedHouseId)) {
      toast({
        title: "Ошибка",
        description: "Этот дом уже добавлен в список",
        variant: "destructive"
      });
      return;
    }

    setUploads([...uploads, {
      houseId: selectedHouseId,
      status: 'pending'
    }]);
    setSelectedHouseId("");
  };

  const removeUploadItem = (houseId: string) => {
    setUploads(uploads.filter(u => u.houseId !== houseId));
  };

  const handleFileSelect = (houseId: string, file: File, type: 'house' | 'manager') => {
    setUploads(uploads.map(u => 
      u.houseId === houseId 
        ? { ...u, [type === 'house' ? 'houseImage' : 'managerImage']: file }
        : u
    ));
  };

  const uploadSingle = async (item: UploadItem): Promise<void> => {
    setUploads(prev => prev.map(u => 
      u.houseId === item.houseId ? { ...u, status: 'uploading' as const } : u
    ));

    try {
      const uploadFile = async (file: File, type: 'house' | 'manager') => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = async () => {
            try {
              const base64 = (reader.result as string).split(',')[1];
              
              const uploadResponse = await fetch(funcUrls['upload-image'], {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ image: base64, type })
              });
              
              if (!uploadResponse.ok) throw new Error('Upload failed');
              
              const uploadData = await uploadResponse.json();
              resolve(uploadData.url);
            } catch (error) {
              reject(error);
            }
          };
          reader.onerror = () => reject(new Error('File read error'));
          reader.readAsDataURL(file);
        });
      };

      let houseImageUrl: string | undefined;
      let managerImageUrl: string | undefined;

      if (item.houseImage) {
        houseImageUrl = await uploadFile(item.houseImage, 'house');
      }

      if (item.managerImage) {
        managerImageUrl = await uploadFile(item.managerImage, 'manager');
      }

      const updateResponse = await fetch(funcUrls['update-house'], {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          house_id: item.houseId,
          image: houseImageUrl,
          managerPhoto: managerImageUrl
        })
      });

      if (!updateResponse.ok) throw new Error('Update failed');

      setUploads(prev => prev.map(u => 
        u.houseId === item.houseId ? { ...u, status: 'success' as const } : u
      ));
    } catch (error) {
      setUploads(prev => prev.map(u => 
        u.houseId === item.houseId 
          ? { ...u, status: 'error' as const, error: (error as Error).message }
          : u
      ));
    }
  };

  const uploadAll = async () => {
    setUploading(true);
    
    const pendingUploads = uploads.filter(u => 
      u.status === 'pending' && (u.houseImage || u.managerImage)
    );

    if (pendingUploads.length === 0) {
      toast({
        title: "Ошибка",
        description: "Нет файлов для загрузки",
        variant: "destructive"
      });
      setUploading(false);
      return;
    }

    for (const item of pendingUploads) {
      await uploadSingle(item);
    }

    setUploading(false);
    toast({
      title: "Готово!",
      description: `Загружено ${pendingUploads.length} объектов`
    });
  };

  const getHouseName = (houseId: string) => {
    const house = houses.find(h => h.id === houseId);
    return house ? house.address : houseId;
  };

  return (
    <Layout>
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Button
            variant="ghost"
            onClick={() => navigate("/houses")}
            className="mb-6"
          >
            <Icon name="ArrowLeft" size={16} />
            Назад к списку домов
          </Button>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Upload" size={24} />
                Массовая загрузка фотографий
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Select value={selectedHouseId} onValueChange={setSelectedHouseId}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Выберите дом" />
                    </SelectTrigger>
                    <SelectContent>
                      {houses.map((house) => (
                        <SelectItem key={house.id} value={house.id}>
                          {house.address} - {house.city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button onClick={addUploadItem}>
                    <Icon name="Plus" size={16} />
                    Добавить
                  </Button>
                </div>

                {uploads.length > 0 && (
                  <div className="space-y-4 mt-6">
                    {uploads.map((item) => (
                      <Card key={item.houseId} className="relative">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-4">
                            <div className="flex-1">
                              <h4 className="font-semibold mb-2 flex items-center gap-2">
                                {getHouseName(item.houseId)}
                                {item.status === 'success' && (
                                  <Icon name="CheckCircle" size={16} className="text-green-500" />
                                )}
                                {item.status === 'error' && (
                                  <Icon name="XCircle" size={16} className="text-red-500" />
                                )}
                                {item.status === 'uploading' && (
                                  <Icon name="Loader2" size={16} className="text-blue-500 animate-spin" />
                                )}
                              </h4>
                              
                              <div className="grid md:grid-cols-2 gap-4 mt-4">
                                <div>
                                  <label className="text-sm font-medium mb-2 block">
                                    Фото дома
                                  </label>
                                  {item.houseImage ? (
                                    <div className="flex items-center gap-2 text-sm text-green-600">
                                      <Icon name="Check" size={16} />
                                      {item.houseImage.name}
                                    </div>
                                  ) : (
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      disabled={item.status === 'uploading' || item.status === 'success'}
                                      onClick={() => {
                                        const input = document.createElement('input');
                                        input.type = 'file';
                                        input.accept = 'image/*';
                                        input.onchange = (e) => {
                                          const file = (e.target as HTMLInputElement).files?.[0];
                                          if (file) handleFileSelect(item.houseId, file, 'house');
                                        };
                                        input.click();
                                      }}
                                    >
                                      <Icon name="Image" size={16} />
                                      Выбрать файл
                                    </Button>
                                  )}
                                </div>

                                <div>
                                  <label className="text-sm font-medium mb-2 block">
                                    Фото управляющего
                                  </label>
                                  {item.managerImage ? (
                                    <div className="flex items-center gap-2 text-sm text-green-600">
                                      <Icon name="Check" size={16} />
                                      {item.managerImage.name}
                                    </div>
                                  ) : (
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      disabled={item.status === 'uploading' || item.status === 'success'}
                                      onClick={() => {
                                        const input = document.createElement('input');
                                        input.type = 'file';
                                        input.accept = 'image/*';
                                        input.onchange = (e) => {
                                          const file = (e.target as HTMLInputElement).files?.[0];
                                          if (file) handleFileSelect(item.houseId, file, 'manager');
                                        };
                                        input.click();
                                      }}
                                    >
                                      <Icon name="User" size={16} />
                                      Выбрать файл
                                    </Button>
                                  )}
                                </div>
                              </div>

                              {item.error && (
                                <p className="text-sm text-red-500 mt-2">{item.error}</p>
                              )}
                            </div>

                            {item.status !== 'uploading' && item.status !== 'success' && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeUploadItem(item.houseId)}
                              >
                                <Icon name="X" size={16} />
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}

                    <div className="flex gap-4 justify-end pt-4">
                      <Button
                        variant="outline"
                        onClick={() => setUploads([])}
                        disabled={uploading}
                      >
                        Очистить всё
                      </Button>
                      <Button
                        onClick={uploadAll}
                        disabled={uploading || uploads.every(u => u.status === 'success')}
                        className="min-w-32"
                      >
                        {uploading ? (
                          <>
                            <Icon name="Loader2" size={16} className="animate-spin" />
                            Загрузка...
                          </>
                        ) : (
                          <>
                            <Icon name="Upload" size={16} />
                            Загрузить всё
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                )}

                {uploads.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    <Icon name="FolderOpen" size={48} className="mx-auto mb-4" />
                    <p>Добавьте дома для загрузки фотографий</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default BulkUpload;
