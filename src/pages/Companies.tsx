import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";
import { houses } from "@/data/housesData";

interface CompanyInfo {
  id: string;
  name: string;
  shortName: string;
  description: string;
  objectsCount: number;
}

const Companies = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const companyList = [
    {
      id: "uk-nash-dom-sity",
      name: 'ООО «УК «Наш дом-Сити»',
      shortName: "Наш дом-Сити",
      description: "Управление многоквартирными домами в центральных районах Санкт-Петербурга",
    },
    {
      id: "uk-nash-dom-polyustrovo",
      name: 'ООО «УК «Наш дом-Полюстрово»',
      shortName: "Наш дом-Полюстрово",
      description: 'Управление ЖК "Панорама" на Кондратьевском проспекте',
    },
    {
      id: "uk-sityhome",
      name: 'ООО УК «СИТИХОУМ»',
      shortName: "СИТИХОУМ",
      description: 'Управление ЖК "Адмирал" на улице Одоевского',
    },
    {
      id: "uk-ostrov-grad",
      name: 'ООО «УК «Остров-Град»',
      shortName: "Остров-Град",
      description:
        "Управление элитными жилыми комплексами и бизнес-центрами в Санкт-Петербурге",
    },
    {
      id: "uk-novoe-kupchino",
      name: 'ООО «УК «Новое Купчино»',
      shortName: "Новое Купчино",
      description: 'Управление ЖК "Новое Купчино" на Малой Бухарестской',
    },
    {
      id: "uk-nash-dom-region",
      name: 'ООО «УК «Наш дом – Регион»',
      shortName: "Наш дом – Регион",
      description: "Управление домами в Мурино и Кудрово, Ленинградская область",
    },
    {
      id: "uk-nash-dom-kudrovo-grad",
      name: 'ООО «УК «Наш дом-Кудрово Град»',
      shortName: "Наш дом-Кудрово Град",
      description: "Управление жилыми комплексами в городе Кудрово",
    },
    {
      id: "uk-kudrovo-dom",
      name: 'ООО «УК «Кудрово-Дом»',
      shortName: "Кудрово-Дом",
      description: "Комплексное управление многоквартирными домами в Кудрово",
    },
    {
      id: "uk-kudrovo-service",
      name: 'ООО «УК «Кудрово-Сервис»',
      shortName: "Кудрово-Сервис",
      description: "Качественное обслуживание жилых домов в Кудрово",
    },
    {
      id: "uk-nash-dom-kudrovo",
      name: 'ООО «УК «Наш дом-Кудрово»',
      shortName: "Наш дом-Кудрово",
      description: "Профессиональное управление недвижимостью в Кудрово",
    },
    {
      id: "uk-nash-dom-novoselye",
      name: 'ООО «УК «Наш Дом Новоселье»',
      shortName: "Наш Дом Новоселье",
      description: 'Управление крупнейшим ЖК "NewПитер" в поселке Новоселье',
    },
    {
      id: "uk-usadba",
      name: 'ООО «УК «Усадьба»',
      shortName: "Усадьба",
      description: 'Управление коттеджным поселком "Сад времени"',
    },
    {
      id: "uk-city-parking",
      name: 'ООО «Сити Паркинг»',
      shortName: "Сити Паркинг",
      description: "Специализированное управление паркингами в Санкт-Петербурге",
    },
    {
      id: "uk-nash-dom-group",
      name: 'Группа УК «НАШ ДОМ»',
      shortName: "НАШ ДОМ",
      description: "Прочие объекты группы компаний",
    },
  ];

  const companies: CompanyInfo[] = companyList.map((company) => ({
    ...company,
    objectsCount: houses.filter((house) => house.company === company.name).length,
  })).filter((company) => company.objectsCount > 0);

  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCompanyHouses = (companyName: string) => {
    return houses.filter((house) => house.company === companyName);
  };

  return (
    <Layout>
      <section className="py-20 bg-gradient-to-br from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Управляющие компании группы
            </h1>
            <p className="text-xl text-muted-foreground">
              13 профессиональных управляющих компаний в составе группы «НАШ ДОМ»
            </p>
          </div>

          <div className="max-w-6xl mx-auto mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="relative">
                  <Icon
                    name="Search"
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    size={20}
                  />
                  <Input
                    placeholder="Поиск управляющей компании..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                  <Icon name="Info" size={16} />
                  <span>
                    Найдено компаний: {filteredCompanies.length} из {companies.length}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCompanies.map((company) => (
                <Card
                  key={company.id}
                  className="hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 cursor-pointer group hover:-translate-y-1"
                  onClick={() => navigate(`/companies/${company.id}`)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md group-hover:shadow-primary/30 transition-shadow">
                        <Icon name="Building2" className="text-primary" size={24} />
                      </div>
                      <Icon
                        name="ChevronRight"
                        className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0"
                        size={20}
                      />
                    </div>
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                      {company.shortName}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {company.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-secondary/15 to-secondary/5 rounded-full shadow-sm">
                        <Icon name="Home" size={14} className="text-secondary" />
                        <span className="font-medium">{company.objectsCount}</span>
                        <span className="text-muted-foreground">
                          {company.objectsCount === 1
                            ? "объект"
                            : company.objectsCount < 5
                            ? "объекта"
                            : "объектов"}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredCompanies.length === 0 && (
              <div className="text-center py-16">
                <Icon name="SearchX" size={64} className="text-muted-foreground mx-auto mb-6" />
                <h3 className="text-2xl font-semibold mb-4">Ничего не найдено</h3>
                <p className="text-muted-foreground mb-6">
                  Попробуйте изменить поисковый запрос
                </p>
              </div>
            )}
          </div>

          <div className="max-w-6xl mx-auto mt-16">
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <Icon name="Award" className="flex-shrink-0 mt-1" size={32} />
                  <div>
                    <h3 className="text-2xl font-bold mb-4">
                      Почему группа «НАШ ДОМ» — ваш надежный выбор
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3">
                        <Icon name="CheckCircle2" className="flex-shrink-0 mt-1" size={20} />
                        <p>Более 15 лет опыта в сфере управления недвижимостью</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <Icon name="CheckCircle2" className="flex-shrink-0 mt-1" size={20} />
                        <p>13 специализированных управляющих компаний</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <Icon name="CheckCircle2" className="flex-shrink-0 mt-1" size={20} />
                        <p>Более 50 объектов под управлением</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <Icon name="CheckCircle2" className="flex-shrink-0 mt-1" size={20} />
                        <p>Профессиональная команда специалистов</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Companies;