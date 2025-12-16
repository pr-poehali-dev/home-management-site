import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { houses } from "@/data/housesData";
import ProtocolViewer from "@/components/ProtocolViewer";
import { useToast } from "@/components/ui/use-toast";
import funcUrls from "../../backend/func2url.json";

const HouseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [protocolOpen, setProtocolOpen] = useState(false);
  const [agreementOpen, setAgreementOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadingDocument, setUploadingDocument] = useState(false);
  const [deletingDocument, setDeletingDocument] = useState(false);
  const [currentHouseImage, setCurrentHouseImage] = useState<string | undefined>();
  const [currentManagerPhoto, setCurrentManagerPhoto] = useState<string | undefined>();
  const [currentProtocolOss, setCurrentProtocolOss] = useState<string | string[] | undefined>();
  const [currentManagementAgreement, setCurrentManagementAgreement] = useState<string | string[] | undefined>();

  const house = houses.find((h) => h.id === id);

  useEffect(() => {
    const loadData = async () => {
      if (!id) return;
      try {
        const response = await fetch(`${funcUrls['get-house-images']}?house_id=${id}`);
        if (response.ok) {
          const data = await response.json();
          if (data.image) setCurrentHouseImage(data.image);
          if (data.managerPhoto) setCurrentManagerPhoto(data.managerPhoto);
          if (data.protocolOss) setCurrentProtocolOss(data.protocolOss);
          if (data.managementAgreement) setCurrentManagementAgreement(data.managementAgreement);
        }
      } catch (error) {
        console.error('Failed to load data:', error);
      }
    };
    loadData();
  }, [id]);

  const handleImageUpload = async (file: File, type: 'house' | 'manager') => {
    setUploading(true);
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = (reader.result as string).split(',')[1];
        
        const uploadResponse = await fetch(funcUrls['upload-image'], {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: base64, type, fileType: 'image' })
        });
        
        if (!uploadResponse.ok) throw new Error('Upload failed');
        
        const uploadData = await uploadResponse.json();
        const imageUrl = uploadData.url;
        
        const updateResponse = await fetch(funcUrls['update-house'], {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            house_id: id,
            [type === 'house' ? 'image' : 'managerPhoto']: imageUrl
          })
        });
        
        if (!updateResponse.ok) throw new Error('Update failed');
        
        if (type === 'house') {
          setCurrentHouseImage(imageUrl);
        } else {
          setCurrentManagerPhoto(imageUrl);
        }
        
        toast({
          title: "Успешно!",
          description: type === 'house' ? "Фото дома загружено" : "Фото управляющего загружено"
        });
      };
      reader.readAsDataURL(file);
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить изображение",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDocumentUpload = async (files: FileList, docType: 'protocol' | 'agreement') => {
    setUploadingDocument(true);
    try {
      const uploadedUrls: string[] = [];
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Проверка размера файла (максимум 2 МБ из-за ограничений Cloud Functions)
        const maxSize = 2 * 1024 * 1024; // 2 MB
        if (file.size > maxSize) {
          toast({
            title: "Файл слишком большой",
            description: `Файл "${file.name}" весит ${(file.size / 1024 / 1024).toFixed(2)} МБ. Максимум: 2 МБ. Сожмите PDF на ilovepdf.com или smallpdf.com`,
            variant: "destructive",
            duration: 10000
          });
          setUploadingDocument(false);
          return;
        }
        
        const reader = new FileReader();
        
        await new Promise<void>((resolve, reject) => {
          reader.onloadend = async () => {
            try {
              const base64 = (reader.result as string).split(',')[1];
              const fileType = file.type === 'application/pdf' ? 'pdf' : 'image';
              
              const uploadResponse = await fetch(funcUrls['upload-image'], {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                  image: base64, 
                  type: docType === 'protocol' ? 'protocol' : 'agreement',
                  fileType
                })
              });
              
              if (!uploadResponse.ok) {
                if (uploadResponse.status === 413) {
                  throw new Error('FILE_TOO_LARGE');
                }
                throw new Error('Upload failed');
              }
              
              const uploadData = await uploadResponse.json();
              uploadedUrls.push(uploadData.url);
              resolve();
            } catch (error) {
              reject(error);
            }
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      }
      
      const updateResponse = await fetch(funcUrls['update-house'], {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          house_id: id,
          [docType === 'protocol' ? 'protocolOss' : 'managementAgreement']: uploadedUrls.length === 1 ? uploadedUrls[0] : uploadedUrls
        })
      });
      
      if (!updateResponse.ok) throw new Error('Update failed');
      
      toast({
        title: "Успешно!",
        description: `${docType === 'protocol' ? 'Протокол ОСС' : 'Договор управления'} загружен`
      });
      
      window.location.reload();
    } catch (error) {
      const errorMessage = error instanceof Error && error.message === 'FILE_TOO_LARGE'
        ? "Файл слишком большой (больше 2 МБ после конвертации). Сожмите PDF на ilovepdf.com или smallpdf.com"
        : "Не удалось загрузить документ. Убедитесь, что файл не превышает 2 МБ.";
      
      toast({
        title: "Ошибка загрузки",
        description: errorMessage,
        variant: "destructive",
        duration: 10000
      });
      console.error('Upload error:', error);
    } finally {
      setUploadingDocument(false);
    }
  };

  const handleDocumentDelete = async (docType: 'protocol' | 'agreement') => {
    if (!confirm(`Вы уверены, что хотите удалить ${docType === 'protocol' ? 'протокол ОСС' : 'договор управления'}?`)) {
      return;
    }

    setDeletingDocument(true);
    try {
      const updateResponse = await fetch(funcUrls['update-house'], {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          house_id: id,
          [docType === 'protocol' ? 'protocolOss' : 'managementAgreement']: null
        })
      });
      
      if (!updateResponse.ok) throw new Error('Delete failed');
      
      toast({
        title: "Успешно!",
        description: `${docType === 'protocol' ? 'Протокол ОСС' : 'Договор управления'} удалён`
      });
      
      window.location.reload();
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось удалить документ",
        variant: "destructive"
      });
    } finally {
      setDeletingDocument(false);
    }
  };

  if (!house) {
    return (
      <Layout>
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <Icon name="AlertCircle" size={64} className="text-muted-foreground mx-auto mb-6" />
            <h1 className="text-3xl font-bold mb-4">Объект не найден</h1>
            <p className="text-muted-foreground mb-8">
              К сожалению, запрашиваемый объект не существует
            </p>
            <Button onClick={() => navigate("/houses")}>
              <Icon name="ArrowLeft" size={16} />
              Вернуться к списку
            </Button>
          </div>
        </section>
      </Layout>
    );
  }

  const services = [
    {
      icon: "Wrench",
      title: "Техническое обслуживание",
      description: "Регулярное обслуживание инженерных систем и оборудования",
    },
    {
      icon: "Droplets",
      title: "Водоснабжение и водоотведение",
      description: "Контроль и обслуживание систем холодного и горячего водоснабжения",
    },
    {
      icon: "Zap",
      title: "Электроснабжение",
      description: "Обслуживание электросетей и освещения общих помещений",
    },
    {
      icon: "Thermometer",
      title: "Отопление",
      description: "Поддержание комфортной температуры в отопительный сезон",
    },
    {
      icon: "Broom",
      title: "Уборка территории",
      description: "Регулярная уборка придомовой территории и подъездов",
    },
    {
      icon: "Trees",
      title: "Благоустройство",
      description: "Озеленение и содержание придомовой территории",
    },
  ];

  return (
    <Layout>
      <section className="py-12 bg-gradient-to-br from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/houses")}
            className="mb-6 hover:bg-primary/10"
          >
            <Icon name="ArrowLeft" size={16} />
            Назад к списку домов
          </Button>

          <div className="mb-8 max-w-xl mx-auto rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-b from-gray-50 to-white relative">
            {(currentHouseImage || house.image) ? (
              <img 
                src={currentHouseImage || house.image} 
                alt={house.address}
                className="w-full h-auto mix-blend-darken"
              />
            ) : (
              <div className="w-full h-64 flex items-center justify-center bg-muted">
                <div className="text-center text-muted-foreground">
                  <Icon name="Image" size={48} className="mx-auto mb-2" />
                  <p className="text-sm">Фото дома не загружено</p>
                </div>
              </div>
            )}
          </div>

          <div className="max-w-5xl mx-auto">
            <Card className="mb-8">
              <CardContent className="p-8 md:p-12">
                <div className="flex items-start gap-6 mb-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon name="Building2" className="text-primary" size={32} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <h1 className="text-3xl md:text-4xl font-bold mb-2">{house.address}</h1>
                        <div className="flex items-center gap-4 text-muted-foreground">
                          <span className="flex items-center gap-2">
                            <Icon name="MapPin" size={16} />
                            {house.city}
                          </span>
                          <span className="flex items-center gap-2">
                            <Icon name="Home" size={16} />
                            {house.type}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 pt-6 border-t">
                  <Card className="bg-secondary/5">
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-4 flex items-center gap-2">
                        <Icon name="Building" size={20} className="text-primary" />
                        Управляющая компания
                      </h3>
                      <p className="text-sm font-medium">{house.company}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Обслуживающая организация
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-secondary/5">
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-4 flex items-center gap-2">
                        <Icon name="UserCircle" size={20} className="text-primary" />
                        Ваш управляющий
                      </h3>
                      <div className="mb-4 relative group cursor-pointer w-24 h-24">
                        {(currentManagerPhoto || house.managerPhoto) ? (
                          <img 
                            src={currentManagerPhoto || house.managerPhoto} 
                            alt={house.manager}
                            className="w-24 h-24 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="w-24 h-24 rounded-lg bg-muted flex items-center justify-center">
                            <Icon name="User" size={32} className="text-muted-foreground" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                          <Button
                            variant="secondary"
                            size="sm"
                            disabled={uploading}
                            onClick={() => {
                              const input = document.createElement('input');
                              input.type = 'file';
                              input.accept = 'image/*';
                              input.onchange = (e) => {
                                const file = (e.target as HTMLInputElement).files?.[0];
                                if (file) handleImageUpload(file, 'manager');
                              };
                              input.click();
                            }}
                            className="text-xs px-2 py-1 h-auto"
                          >
                            <Icon name="Upload" size={12} />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm font-medium mb-3">{house.manager}</p>
                      <a
                        href={`tel:${house.managerPhone.replace(/\s|\(|\)|\//g, "")}`}
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 hover:underline text-sm font-semibold"
                      >
                        <Icon name="Phone" size={16} />
                        {house.managerPhone}
                      </a>
                    </CardContent>
                  </Card>

                  <Card className="bg-secondary/5">
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-4 flex items-center gap-2">
                        <Icon name="PhoneCall" size={20} className="text-primary" />
                        Диспетчерская служба
                      </h3>
                      <a
                        href="tel:+78124677777"
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 hover:underline font-semibold text-sm mb-3"
                      >
                        <Icon name="Phone" size={16} />
                        467-77-77
                      </a>
                      <p className="text-xs text-muted-foreground">
                        Круглосуточно для аварийных заявок
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid md:grid-cols-2 gap-6 pt-6 border-t">
                  <Card className="bg-secondary/5">
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-4 flex items-center gap-2">
                        <Icon name="FileText" size={20} className="text-primary" />
                        Протокол ОСС
                      </h3>
                      {(currentProtocolOss || house.protocolOss) ? (
                        <>
                          <Button
                            variant="link"
                            onClick={() => setProtocolOpen(true)}
                            className="flex items-center gap-2 text-primary hover:underline text-sm font-medium p-0 h-auto mb-2"
                          >
                            <Icon name="Eye" size={16} />
                            Просмотреть протокол
                          </Button>
                          <p className="text-xs text-muted-foreground">
                            Протокол общего собрания собственников
                          </p>
                        </>
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          Протокол ОСС не загружен
                        </p>
                      )}
                    </CardContent>
                  </Card>

                  <Card className="bg-secondary/5">
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-4 flex items-center gap-2">
                        <Icon name="FileCheck" size={20} className="text-primary" />
                        Договор управления
                      </h3>
                      {(currentManagementAgreement || house.managementAgreement) ? (
                        <>
                          <Button
                            variant="link"
                            onClick={() => setAgreementOpen(true)}
                            className="flex items-center gap-2 text-primary hover:underline text-sm font-medium p-0 h-auto mb-2"
                          >
                            <Icon name="Eye" size={16} />
                            Просмотреть договор
                          </Button>
                          <p className="text-xs text-muted-foreground">
                            Договор управления многоквартирным домом
                          </p>
                        </>
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          Договор управления не загружен
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            {!['spb-moskovskiy-72k2str1', 'spb-ruchevskiy-17k2', 'spb-reshetnikova-29str1', 'spb-blagodatnaya-50str1', 'spb-sad-vremeni'].includes(id || '') && (
              <>
                <h2 className="text-2xl font-bold mb-6">Услуги для вашего дома</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {services.map((service, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon name={service.icon as any} className="text-primary" size={24} />
                    </div>
                    <h3 className="font-semibold mb-2">{service.title}</h3>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {!(
              house.address.includes("ул. Зеленогорская, д. 12 лит. В") ||
              house.address.includes("ул. Васенко, д. 12 лит. Б") ||
              house.address.includes("Фермское шоссе, д. 20, корп. 3 лит. А") ||
              house.address.includes("Фермское шоссе, д. 22, корп. 2 лит. А") ||
              house.address.includes("ул. Одоевского, д. 21 корп. 2 стр. 1") ||
              house.address.includes("Красносельское шоссе, д. 4") ||
              house.address.includes("Красносельское шоссе, д. 8") ||
              house.address.includes("Красносельское шоссе, д. 20") ||
              house.address.includes("ул. Ремесленная, д. 21 стр. 1") ||
              house.address.includes("ул. Большая Зеленина, д. 24 стр. 1")
            ) && (
            <Card className="bg-muted/50">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                  <Icon name="Info" className="text-primary" size={24} />
                  Полезная информация
                </h3>
                {(house.address.includes("пр. Металлистов, д. 116") || house.address.includes("ул. Васенко, д. 12")) && house.city === "Санкт-Петербург" ? (
                  <div className="space-y-4 text-muted-foreground">
                    <div className="flex items-start gap-3">
                      <Icon name="FileText" className="mt-1 flex-shrink-0" size={20} />
                      <div>
                        <p className="font-medium text-foreground mb-2">Паспортная служба СПб ГКУ "ЖА Калининского района"</p>
                        <p className="text-sm mb-3">Паспортный участок № 3: г. Санкт-Петербург, пр. Металлистов, д. 98</p>
                        <div className="space-y-2 text-sm">
                          <p className="flex items-center gap-2">
                            <Icon name="Phone" size={16} className="flex-shrink-0" />
                            <span>
                              <a href="tel:+78125400817" className="text-primary hover:underline">540-08-17</a>
                              {"; "}
                              <a href="tel:+78124098211" className="text-primary hover:underline">409-82-11</a>
                              {"; "}
                              <a href="tel:+78124098212" className="text-primary hover:underline">409-82-12</a>
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="Clock" className="mt-1 flex-shrink-0" size={20} />
                      <div>
                        <p className="font-medium text-foreground mb-2">Прием граждан осуществляется паспортным участком</p>
                        <div className="text-sm space-y-1">
                          <p>понедельник, среда, четверг - с 15:00 до 19:00</p>
                          <p>вторник, пятница - с 9:00 до 13:00</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : house.address.includes("ул. Академика Константинова, д. 1") && house.city === "Санкт-Петербург" ? (
                  <div className="space-y-4 text-muted-foreground">
                    <div className="flex items-start gap-3">
                      <Icon name="FileText" className="mt-1 flex-shrink-0" size={20} />
                      <div>
                        <p className="font-medium text-foreground mb-2">Паспортная служба СПб ГКУ "ЖА Калининского района"</p>
                        <p className="text-sm mb-3">Паспортный участок № 2: г. Санкт-Петербург, пр. Тихорецкий, д. 15 корп. 2</p>
                        <div className="space-y-2 text-sm">
                          <p className="flex items-center gap-2">
                            <Icon name="Phone" size={16} className="flex-shrink-0" />
                            <span>
                              <a href="tel:+79313263123" className="text-primary hover:underline">8-931-326-31-23</a>
                              {"; "}
                              <a href="tel:+78125563326" className="text-primary hover:underline">556-33-26</a>
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="Clock" className="mt-1 flex-shrink-0" size={20} />
                      <div>
                        <p className="font-medium text-foreground mb-2">Прием граждан осуществляется паспортным участком</p>
                        <div className="text-sm space-y-1">
                          <p>понедельник, среда, четверг - с 15:00 до 19:00</p>
                          <p>вторник, пятница - с 9:00 до 13:00</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (house.address.includes("пр. Строителей, д. 1") || 
                  house.address.includes("пр. Строителей, д. 3") || 
                  house.address.includes("пр. Строителей, д. 5") || 
                  house.address.includes("ул. Солнечная, д. 2") || 
                  house.address.includes("ул. Солнечная, д. 12")) && house.city === "Кудрово" ? (
                  <div className="space-y-4 text-muted-foreground">
                    <div className="flex items-start gap-3">
                      <Icon name="FileText" className="mt-1 flex-shrink-0" size={20} />
                      <div>
                        <p className="font-medium text-foreground mb-2">Паспортная служба Заневского городского поселения</p>
                        <p className="text-sm mb-3">г. Кудрово, ул. Ленинградская, 4В</p>
                        <div className="space-y-2 text-sm">
                          <p className="flex items-center gap-2">
                            <Icon name="Phone" size={16} className="flex-shrink-0" />
                            <a href="tel:+78124024245" className="text-primary hover:underline">
                              +7 (812) 402-42-45
                            </a>
                          </p>
                          <p className="flex items-center gap-2">
                            <Icon name="Mail" size={16} className="flex-shrink-0" />
                            <a href="mailto:passport_kudrovo@zanevkaorg.ru" className="text-primary hover:underline">
                              passport_kudrovo@zanevkaorg.ru
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="Clock" className="mt-1 flex-shrink-0" size={20} />
                      <div>
                        <p className="font-medium text-foreground mb-2">Прием граждан Кудрово</p>
                        <div className="text-sm space-y-1">
                          <p>ПОНЕДЕЛЬНИК: с 14:00 до 17:00</p>
                          <p>ВТОРНИК: с 9:00 до 17:00</p>
                          <p>СРЕДА: приема нет</p>
                          <p>ЧЕТВЕРГ: с 14:00 до 16:30</p>
                          <p>ПЯТНИЦА: с 9:00 до 13:00</p>
                          <p className="text-muted-foreground italic">ОБЕД: с 13:00 до 14:00</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (house.address.includes("ул. Областная") || 
                  house.address.includes("Каштановая аллея") || 
                  house.address.includes("ул. Ленинградская, д. 9/8")) && house.city === "Кудрово" ? (
                  <div className="space-y-4 text-muted-foreground">
                    <div className="flex items-start gap-3">
                      <Icon name="FileText" className="mt-1 flex-shrink-0" size={20} />
                      <div>
                        <p className="font-medium text-foreground mb-2">Паспортная служба Заневского городского поселения</p>
                        <p className="text-sm mb-3">г. Кудрово, ул. Ленинградская, 4В</p>
                        <div className="space-y-2 text-sm">
                          <p className="flex items-center gap-2">
                            <Icon name="Phone" size={16} className="flex-shrink-0" />
                            <a href="tel:+78124024245" className="text-primary hover:underline">
                              +7 (812) 402-42-45
                            </a>
                          </p>
                          <p className="flex items-center gap-2">
                            <Icon name="Mail" size={16} className="flex-shrink-0" />
                            <a href="mailto:passport_kudrovo@zanevkaorg.ru" className="text-primary hover:underline">
                              passport_kudrovo@zanevkaorg.ru
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="Clock" className="mt-1 flex-shrink-0" size={20} />
                      <div>
                        <p className="font-medium text-foreground mb-2">Прием граждан Кудрово</p>
                        <div className="text-sm space-y-1">
                          <p>ПОНЕДЕЛЬНИК: с 14:00 до 17:00</p>
                          <p>ВТОРНИК: с 9:00 до 17:00</p>
                          <p>СРЕДА: приема нет</p>
                          <p>ЧЕТВЕРГ: с 14:00 до 16:30</p>
                          <p>ПЯТНИЦА: с 9:00 до 13:00</p>
                          <p className="text-muted-foreground italic">ОБЕД: с 13:00 до 14:00</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : house.address.includes("пр. Петровский, д. 5 стр. 1") && house.city === "Санкт-Петербург" ? (
                  <div className="space-y-4 text-muted-foreground">
                    <div className="flex items-start gap-3">
                      <Icon name="FileText" className="mt-1 flex-shrink-0" size={20} />
                      <div>
                        <p className="font-medium text-foreground mb-2">Паспортная служба ООО «УК «Остров-град»</p>
                        <p className="text-sm mb-3">г. Санкт-Петербург, пр. Петровский, д. 5 стр. 1 (офис УК)</p>
                        <div className="space-y-2 text-sm">
                          <p className="flex items-center gap-2">
                            <Icon name="Phone" size={16} className="flex-shrink-0" />
                            <a href="tel:+79319648122" className="text-primary hover:underline">
                              8-931-964-81-22
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="Clock" className="mt-1 flex-shrink-0" size={20} />
                      <div>
                        <p className="font-medium text-foreground mb-2">Прием граждан осуществляется</p>
                        <div className="text-sm space-y-1">
                          <p>вторник - с 17:00 до 19:00</p>
                          <p>четверг - с 10:00 до 12:00</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : house.address.includes("ул. Малая Бухарестская, д. 12 стр. 1") && house.city === "Санкт-Петербург" ? (
                  <div className="space-y-4 text-muted-foreground">
                    <div className="flex items-start gap-3">
                      <Icon name="FileText" className="mt-1 flex-shrink-0" size={20} />
                      <div>
                        <p className="font-medium text-foreground mb-2">Паспортная служба ООО «УК «Новое Купчино»</p>
                        <p className="text-sm mb-3">г. Санкт-Петербург, ул. Малая Бухарестская, д. 12 стр. 1 (офис УК)</p>
                        <div className="space-y-2 text-sm">
                          <p className="flex items-center gap-2">
                            <Icon name="Phone" size={16} className="flex-shrink-0" />
                            <a href="tel:+78125096893" className="text-primary hover:underline">
                              509-68-93
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="Clock" className="mt-1 flex-shrink-0" size={20} />
                      <div>
                        <p className="font-medium text-foreground mb-2">Прием граждан осуществляется</p>
                        <div className="text-sm space-y-1">
                          <p>понедельник - с 16:00 до 19:00</p>
                          <p>среда - с 08:00 до 11:00</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  house.address.includes("б-р Воронцовский, д. 23/11") || 
                  (house.address.includes("пр. Петровский, д. 28") && house.city === "Бугры") ||
                  house.address.includes("пр. Ручьевский, д. 13") ||
                  house.address.includes("пр. Ручьевский, д. 15") ||
                  house.address.includes("пр. Ручьевский, д. 17 корп. 1") ||
                  house.address.includes("ул. Романовская, д. 2") ||
                  house.address.includes("ул. Шувалова, д. 33/35") ||
                  house.address.includes("ул. Шувалова, д. 37") ||
                  house.address.includes("ул. Шувалова, д. 39/21")
                ) ? (
                  <div className="space-y-4 text-muted-foreground">
                    <div className="flex items-start gap-3">
                      <Icon name="FileText" className="mt-1 flex-shrink-0" size={20} />
                      <div>
                        <p className="font-medium text-foreground mb-2">Паспортная служба</p>
                        <p className="text-sm mb-3">Ленинградская область, Всеволожский район, Мурино, пр. Ручьевский, д. 15, 4 парадная, 1 этаж</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="Clock" className="mt-1 flex-shrink-0" size={20} />
                      <div>
                        <p className="font-medium text-foreground mb-2">Прием граждан осуществляется</p>
                        <div className="text-sm space-y-1">
                          <p>вторник - с 17:00 до 19:00</p>
                          <p>среда - с 17:00 до 19:00</p>
                          <p>четверг - с 14:00 до 17:00</p>
                          <p>пятница - с 09:00 до 11:00</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  house.address.includes("Красносельское шоссе, д. 6") ||
                  house.address.includes("Красносельское шоссе, д. 16") ||
                  house.address.includes("пр. Питерский, д. 1") ||
                  house.address.includes("пр. Питерский, д. 5") ||
                  house.address.includes("пр. Питерский, д. 7") ||
                  house.address.includes("ул. Невская, д. 1") ||
                  house.address.includes("ул. Невская, д. 3") ||
                  house.address.includes("ул. Невская, д. 4") ||
                  house.address.includes("ул. Невская, д. 5/7") ||
                  house.address.includes("ул. Невская, д. 6") ||
                  house.address.includes("ул. Невская, д. 10/5") ||
                  house.address.includes("ул. Адмиралтейская, д. 1") ||
                  house.address.includes("ул. Адмиралтейская, д. 3") ||
                  house.address.includes("ул. Адмиралтейская, д. 9") ||
                  house.address.includes("ул. Адмиралтейская, д. 11") ||
                  house.address.includes("бульвар Белых Ночей, д. 3")
                ) ? (
                  <div className="space-y-4 text-muted-foreground">
                    <div className="flex items-start gap-3">
                      <Icon name="FileText" className="mt-1 flex-shrink-0" size={20} />
                      <div>
                        <p className="font-medium text-foreground mb-2">Паспортная служба:</p>
                        <p className="text-sm mb-3">Ленинградская область, Ломоносовский район, гп. Новоселье, пр. Питерский, д. 7 (3-я парадная)</p>
                        <div className="space-y-2 text-sm">
                          <p className="flex items-center gap-2">
                            <Icon name="Phone" size={16} className="flex-shrink-0" />
                            <a href="tel:+78126704715" className="text-primary hover:underline">
                              670-47-15
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="Clock" className="mt-1 flex-shrink-0" size={20} />
                      <div>
                        <p className="font-medium text-foreground mb-2">Прием граждан осуществляется</p>
                        <div className="text-sm space-y-1">
                          <p>Понедельник – с 17:00 до 21:00</p>
                          <p>Вторник - с 08:00 до 12:00</p>
                          <p>Среда - с 17:00 до 20:00</p>
                          <p>Четверг – выезд в ОУФМС</p>
                          <p>Пятница - с 08:00 до 12:00</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : house.address.includes("Фермское шоссе, д. 22, корп. 3 лит. А") && house.city === "Санкт-Петербург" ? (
                  <div className="space-y-4 text-muted-foreground">
                    <div className="flex items-start gap-3">
                      <Icon name="FileText" className="mt-1 flex-shrink-0" size={20} />
                      <div>
                        <p className="font-medium text-foreground mb-2">Паспортная служба Санкт-Петербургское государственное казенное учреждение «Жилищное агентство Приморского района Санкт-Петербурга»</p>
                        <p className="text-sm mb-3">Паспортный участок № 4: г. Санкт-Петербург, Земский пер., д. 7</p>
                        <div className="space-y-2 text-sm">
                          <p className="flex items-center gap-2">
                            <Icon name="Phone" size={16} className="flex-shrink-0" />
                            <a href="tel:+78122412269" className="text-primary hover:underline">
                              241-22-69
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="Clock" className="mt-1 flex-shrink-0" size={20} />
                      <div>
                        <p className="font-medium text-foreground mb-2">Прием граждан осуществляется паспортным участком</p>
                        <div className="text-sm space-y-1">
                          <p>понедельник, среда, четверг - с 16:00 до 19:00</p>
                          <p>вторник, пятница - с 09:00 до 12:00, прямой прием</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  house.address.includes("пр. Кондратьевский, д. 62, корп. 1 лит. А") ||
                  house.address.includes("пр. Кондратьевский, д. 62, корп. 2 лит. А") ||
                  house.address.includes("пр. Кондратьевский, д. 66, корп. 1 лит. А") ||
                  house.address.includes("пр. Кондратьевский, д. 62, корп. 7 лит. А")
                ) && house.city === "Санкт-Петербург" ? (
                  <div className="space-y-4 text-muted-foreground">
                    <div className="flex items-start gap-3">
                      <Icon name="FileText" className="mt-1 flex-shrink-0" size={20} />
                      <div>
                        <p className="font-medium text-foreground mb-2">Паспортная служба СПб ГКУ "ЖА Калининского района"</p>
                        <p className="text-sm mb-3">Паспортный участок № 5: г. Санкт-Петербург, ул. Руставели, д. 12</p>
                        <div className="space-y-2 text-sm">
                          <p className="flex items-center gap-2">
                            <Icon name="Phone" size={16} className="flex-shrink-0" />
                            <a href="tel:+78124176535" className="text-primary hover:underline">
                              417-65-35
                            </a>
                          </p>
                          <p className="flex items-center gap-2">
                            <Icon name="Phone" size={16} className="flex-shrink-0" />
                            <a href="tel:+78122990195" className="text-primary hover:underline">
                              299-01-95
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="Clock" className="mt-1 flex-shrink-0" size={20} />
                      <div>
                        <p className="font-medium text-foreground mb-2">Прием граждан осуществляется паспортным участком</p>
                        <div className="text-sm space-y-1">
                          <p>понедельник, среда, четверг - с 15:00 до 19:00</p>
                          <p>вторник, пятница - с 9:00 до 13:00</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : house.address.includes("Приморское шоссе, д. 352 стр. 1") && house.city === "Санкт-Петербург" ? (
                  <div className="space-y-4 text-muted-foreground">
                    <div className="flex items-start gap-3">
                      <Icon name="FileText" className="mt-1 flex-shrink-0" size={20} />
                      <div>
                        <p className="font-medium text-foreground mb-2">Паспортная служба</p>
                        <p className="text-sm mb-3">Санкт-Петербург, Сестрорецк г., ул. Токарева, 18</p>
                        <div className="space-y-2 text-sm">
                          <p className="flex items-center gap-2">
                            <Icon name="Phone" size={16} className="flex-shrink-0" />
                            <span>
                              <a href="tel:+78124373626" className="text-primary hover:underline">+7 (812) 437-36-26</a>
                              {"; "}
                              <a href="tel:+78124374020" className="text-primary hover:underline">+7 (812) 437-40-20</a>
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="Clock" className="mt-1 flex-shrink-0" size={20} />
                      <div>
                        <p className="font-medium text-foreground mb-2">Прием граждан осуществляется</p>
                        <div className="text-sm space-y-1">
                          <p>понедельник, среда, четверг - с 16:00 до 19:00</p>
                          <p>вторник, пятница - с 9:00 до 12:00</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 text-muted-foreground">
                    <div className="flex items-start gap-3">
                      <Icon name="Clock" className="mt-1 flex-shrink-0" size={20} />
                      <div>
                        <p className="font-medium text-foreground mb-1">График работы офиса</p>
                        <p className="text-sm">
                          Понедельник - Пятница: 9:00 - 18:00
                          <br />
                          Обед: 13:00 - 14:00
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="Mail" className="mt-1 flex-shrink-0" size={20} />
                      <div>
                        <p className="font-medium text-foreground mb-1">Электронная почта</p>
                        <a
                          href="mailto:uk.nashdom@inbox.ru"
                          className="text-sm text-primary hover:underline"
                        >
                          uk.nashdom@inbox.ru
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="MapPin" className="mt-1 flex-shrink-0" size={20} />
                      <div>
                        <p className="font-medium text-foreground mb-1">Адрес офиса</p>
                        <p className="text-sm">
                          Санкт-Петербург, ул. Большая Зеленина, д. 24, стр. 1
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            )}
              </>
            )}
          </div>
        </div>
      </section>

      {(currentProtocolOss || house.protocolOss) && (
        <ProtocolViewer
          open={protocolOpen}
          onOpenChange={setProtocolOpen}
          images={Array.isArray(currentProtocolOss || house.protocolOss) ? (currentProtocolOss || house.protocolOss) as string[] : [currentProtocolOss || house.protocolOss] as string[]}
          title="Протокол ОСС от 07.01.2014"
        />
      )}

      {(currentManagementAgreement || house.managementAgreement) && (
        <ProtocolViewer
          open={agreementOpen}
          onOpenChange={setAgreementOpen}
          images={Array.isArray(currentManagementAgreement || house.managementAgreement) ? (currentManagementAgreement || house.managementAgreement) as string[] : [currentManagementAgreement || house.managementAgreement] as string[]}
          title="Договор управления"
        />
      )}
    </Layout>
  );
};

export default HouseDetail;