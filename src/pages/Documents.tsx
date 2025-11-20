import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Icon from "@/components/ui/icon";

const Documents = () => {
  const documentCategories = [
    {
      title: "Уставные документы",
      icon: "FileText",
      documents: [
        { name: "Устав организации", date: "15.03.2023", size: "2.4 МБ" },
        { name: "Свидетельство о государственной регистрации", date: "20.01.2007", size: "1.2 МБ" },
        { name: "Лицензия на управление МКД", date: "10.05.2023", size: "0.8 МБ" },
        { name: "ОГРН и ИНН", date: "20.01.2007", size: "0.5 МБ" },
      ],
    },
    {
      title: "Финансовая отчетность",
      icon: "DollarSign",
      documents: [
        { name: "Годовой отчет за 2024 год", date: "31.12.2024", size: "5.2 МБ" },
        { name: "Отчет за 1 квартал 2025 года", date: "31.03.2025", size: "3.1 МБ" },
        { name: "Отчет за 2 квартал 2025 года", date: "30.06.2025", size: "3.3 МБ" },
        { name: "Смета расходов на 2025 год", date: "15.12.2024", size: "2.8 МБ" },
        { name: "Отчет о целевом использовании средств", date: "31.10.2025", size: "1.9 МБ" },
      ],
    },
    {
      title: "Протоколы собраний собственников",
      icon: "Users",
      documents: [
        { name: "Протокол общего собрания от 15.09.2025", date: "15.09.2025", size: "1.5 МБ" },
        { name: "Протокол общего собрания от 12.06.2025", date: "12.06.2025", size: "1.7 МБ" },
        { name: "Протокол общего собрания от 20.03.2025", date: "20.03.2025", size: "1.4 МБ" },
        { name: "Протокол годового собрания 2024", date: "15.12.2024", size: "2.1 МБ" },
      ],
    },
    {
      title: "Договоры и соглашения",
      icon: "FileSignature",
      documents: [
        { name: "Типовой договор управления", date: "01.01.2025", size: "1.8 МБ" },
        { name: "Договор с поставщиком электроэнергии", date: "15.01.2025", size: "1.2 МБ" },
        { name: "Договор с водоснабжающей организацией", date: "20.01.2025", size: "1.1 МБ" },
        { name: "Договор на вывоз ТБО", date: "10.01.2025", size: "0.9 МБ" },
        { name: "Договор на обслуживание лифтов", date: "15.02.2025", size: "1.3 МБ" },
      ],
    },
    {
      title: "Техническая документация",
      icon: "Wrench",
      documents: [
        { name: "Паспорта домов", date: "Актуализировано 2025", size: "8.5 МБ" },
        { name: "Акты осмотра состояния дома", date: "15.10.2025", size: "3.2 МБ" },
        { name: "План текущего ремонта", date: "01.01.2025", size: "2.1 МБ" },
        { name: "График проведения работ", date: "Обновляется ежемесячно", size: "0.7 МБ" },
      ],
    },
    {
      title: "Правила и регламенты",
      icon: "BookOpen",
      documents: [
        { name: "Правила проживания в МКД", date: "01.01.2025", size: "1.5 МБ" },
        { name: "Правила содержания домашних животных", date: "01.01.2025", size: "0.8 МБ" },
        { name: "Правила пользования общим имуществом", date: "01.01.2025", size: "1.2 МБ" },
        { name: "Регламент работы диспетчерской службы", date: "01.01.2025", size: "0.6 МБ" },
      ],
    },
  ];

  return (
    <Layout>
      <section className="py-20 bg-gradient-to-br from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Документы</h1>
            <p className="text-xl text-muted-foreground">
              Вся необходимая документация для собственников и жильцов в открытом доступе
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {documentCategories.map((category, index) => (
                <Card key={index}>
                  <AccordionItem value={`item-${index}`} className="border-none">
                    <AccordionTrigger className="px-6 py-4 hover:no-underline">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Icon name={category.icon as any} className="text-primary" size={24} />
                        </div>
                        <div className="text-left">
                          <h3 className="text-lg font-semibold">{category.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {category.documents.length} документов
                          </p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                      <div className="space-y-3 pt-4">
                        {category.documents.map((doc, docIndex) => (
                          <div
                            key={docIndex}
                            className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors cursor-pointer"
                          >
                            <div className="flex items-center gap-3">
                              <Icon name="FileText" className="text-muted-foreground" size={20} />
                              <div>
                                <p className="font-medium">{doc.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {doc.date} • {doc.size}
                                </p>
                              </div>
                            </div>
                            <Icon name="Download" className="text-primary" size={20} />
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Card>
              ))}
            </Accordion>

            <div className="mt-12 p-8 bg-muted/50 rounded-2xl">
              <div className="flex items-start gap-4">
                <Icon name="Info" className="text-primary mt-1 flex-shrink-0" size={24} />
                <div>
                  <h4 className="font-semibold mb-2">Информация о документах</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>
                      • Все документы находятся в открытом доступе в соответствии с требованиями
                      законодательства
                    </li>
                    <li>
                      • Для просмотра некоторых документов может потребоваться программа для чтения
                      PDF
                    </li>
                    <li>
                      • Если вы не нашли нужный документ, обратитесь в офис управляющей компании
                    </li>
                    <li>• Документы регулярно обновляются и актуализируются</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Documents;
