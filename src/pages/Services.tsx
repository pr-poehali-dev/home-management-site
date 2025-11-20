import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const Services = () => {
  const [area, setArea] = useState("");
  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null);

  const services = [
    {
      category: "Управление",
      icon: "ClipboardList",
      items: [
        "Организация и контроль всех рабочих процессов",
        "Взаимодействие с собственниками жилья",
        "Финансовое планирование и бухгалтерский учет",
        "Юридическое сопровождение договорной деятельности",
      ],
      tariff: "25 ₽/м² в месяц",
    },
    {
      category: "Техническое обслуживание",
      icon: "Wrench",
      items: [
        "Обслуживание инженерных систем здания",
        "Технический надзор за состоянием общего имущества",
        "Подготовка к сезонной эксплуатации",
        "Текущий ремонт общего имущества дома",
        "Устранение аварий и неисправностей",
        "Выполнение работ по заявкам жителей",
      ],
      tariff: "18 ₽/м² в месяц",
    },
    {
      category: "Санитарное содержание",
      icon: "Sparkles",
      items: [
        "Поддержание чистоты мест общего пользования",
        "Санитарное содержание придомовой территории",
        "Сбор и вывоз твердых бытовых отходов",
      ],
      tariff: "12 ₽/м² в месяц",
    },
    {
      category: "Благоустройство",
      icon: "Trees",
      items: [
        "Уход за зелеными насаждениями",
        "Обслуживание предметов интерьера",
        "Разработка проектов благоустройства территории",
      ],
      tariff: "8 ₽/м² в месяц",
    },
    {
      category: "Обеспечение безопасности",
      icon: "Shield",
      items: [
        "Круглосуточная охрана жилого комплекса",
        "Организация службы видеонаблюдения",
        "Контроль доступа на территорию",
        "Взаимодействие с органами полиции и пожарной инспекции",
      ],
      tariff: "15 ₽/м² в месяц",
    },
    {
      category: "Диспетчерская служба",
      icon: "Clock",
      items: [
        "Круглосуточное дежурство диспетчера",
        "Постоянный контроль за инженерными системами",
        "Вызов аварийных служб при необходимости",
        "Прием обращений от жителей",
      ],
      tariff: "6 ₽/м² в месяц",
    },
  ];

  const handleCalculate = () => {
    const areaNum = parseFloat(area);
    if (!isNaN(areaNum) && areaNum > 0) {
      const totalRate = 25 + 18 + 12 + 8 + 15 + 6;
      setCalculatedPrice(areaNum * totalRate);
    }
  };

  return (
    <Layout>
      <section className="py-20 bg-gradient-to-br from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Услуги и тарифы</h1>
            <p className="text-xl text-muted-foreground">
              Полный комплекс услуг по управлению многоквартирными домами с прозрачным
              ценообразованием
            </p>
          </div>

          <div className="mb-16">
            <Card className="max-w-2xl mx-auto bg-secondary/5">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                  <Icon name="Calculator" className="text-secondary" size={28} />
                  Калькулятор стоимости обслуживания
                </h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="area">Площадь квартиры (м²)</Label>
                    <Input
                      id="area"
                      type="number"
                      placeholder="Введите площадь"
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                    />
                  </div>
                  <Button onClick={handleCalculate} className="w-full" size="lg">
                    Рассчитать стоимость
                  </Button>
                  {calculatedPrice !== null && (
                    <div className="p-6 bg-primary text-primary-foreground rounded-lg text-center">
                      <p className="text-sm mb-2">Примерная стоимость обслуживания в месяц:</p>
                      <p className="text-4xl font-bold">{calculatedPrice.toFixed(2)} ₽</p>
                      <p className="text-xs mt-2 opacity-75">
                        * Включает все базовые услуги управления
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon name={service.icon as any} className="text-primary" size={28} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{service.category}</h3>
                  <ul className="space-y-2 mb-6">
                    {service.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Icon name="Check" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Тариф:</span>
                      <span className="text-lg font-bold text-primary">{service.tariff}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 p-8 bg-muted/50 rounded-2xl max-w-4xl mx-auto">
            <div className="flex items-start gap-4">
              <Icon name="Info" className="text-primary mt-1 flex-shrink-0" size={24} />
              <div>
                <h4 className="font-semibold mb-2">Важная информация о тарифах</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Тарифы указаны без учёта стоимости коммунальных ресурсов (электричество, вода, отопление)</li>
                  <li>• Окончательная стоимость может варьироваться в зависимости от дома и набора услуг</li>
                  <li>• Все тарифы утверждены на общем собрании собственников</li>
                  <li>• Возможна оплата дополнительных услуг по отдельным заявкам</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
