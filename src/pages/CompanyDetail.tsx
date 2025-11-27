import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { houses } from "@/data/housesData";

interface CompanyInfo {
  id: string;
  name: string;
  director: string;
  accountant: string;
  engineer: string;
  inn: string;
  kpp: string;
  ogrn: string;
  address: string;
  hours: string;
  phone: string;
  email: string;
  documents: { name: string; url: string }[];
}

const companiesData: Record<string, CompanyInfo> = {
  "uk-nash-dom-sity": {
    id: "uk-nash-dom-sity",
    name: 'ООО «УК «Наш дом-Сити»',
    director: "Иванов Иван Иванович",
    accountant: "Петрова Мария Сергеевна",
    engineer: "Сидоров Алексей Викторович",
    inn: "7810123456",
    kpp: "781001001",
    ogrn: "1027800123456",
    address: "г. Санкт-Петербург, ул. Примерная, д. 1",
    hours: "Пн-Пт: 9:00-18:00, Сб: 10:00-15:00",
    phone: "+7 (812) 640-88-26",
    email: "uk.nashdom@inbox.ru",
    documents: [
      { name: "Устав", url: "#" },
      { name: "Лицензия", url: "#" },
      { name: "Свидетельство о регистрации", url: "#" },
    ]
  },
  "uk-nash-dom-polyustrovo": {
    id: "uk-nash-dom-polyustrovo",
    name: 'ООО «УК «Наш дом-Полюстрово»',
    director: "Козлов Петр Александрович",
    accountant: "Николаева Ольга Дмитриевна",
    engineer: "Морозов Сергей Иванович",
    inn: "7810234567",
    kpp: "781001002",
    ogrn: "1027800234567",
    address: "г. Санкт-Петербург, ул. Полюстровская, д. 15",
    hours: "Пн-Пт: 9:00-18:00, Сб: 10:00-15:00",
    phone: "+7 (812) 640-88-26",
    email: "uk.nashdom@inbox.ru",
    documents: [
      { name: "Устав", url: "#" },
      { name: "Лицензия", url: "#" },
      { name: "Свидетельство о регистрации", url: "#" },
    ]
  },
  "uk-sityhome": {
    id: "uk-sityhome",
    name: 'ООО УК «СИТИХОУМ»',
    director: "Васильев Андрей Николаевич",
    accountant: "Смирнова Елена Владимировна",
    engineer: "Федоров Дмитрий Сергеевич",
    inn: "7810345678",
    kpp: "781001003",
    ogrn: "1027800345678",
    address: "г. Санкт-Петербург, ул. Центральная, д. 20",
    hours: "Пн-Пт: 9:00-18:00, Сб: 10:00-15:00",
    phone: "+7 (812) 640-88-26",
    email: "uk.nashdom@inbox.ru",
    documents: [
      { name: "Устав", url: "#" },
      { name: "Лицензия", url: "#" },
      { name: "Свидетельство о регистрации", url: "#" },
    ]
  },
  "uk-ostrov-grad": {
    id: "uk-ostrov-grad",
    name: 'ООО «УК «Остров-Град»',
    director: "Соколов Владимир Петрович",
    accountant: "Кузнецова Анна Ивановна",
    engineer: "Григорьев Павел Александрович",
    inn: "7810456789",
    kpp: "781001004",
    ogrn: "1027800456789",
    address: "г. Санкт-Петербург, ул. Островная, д. 5",
    hours: "Пн-Пт: 9:00-18:00, Сб: 10:00-15:00",
    phone: "+7 (812) 640-88-26",
    email: "uk.nashdom@inbox.ru",
    documents: [
      { name: "Устав", url: "#" },
      { name: "Лицензия", url: "#" },
      { name: "Свидетельство о регистрации", url: "#" },
    ]
  },
  "uk-novoe-kupchino": {
    id: "uk-novoe-kupchino",
    name: 'ООО «УК «Новое Купчино»',
    director: "Михайлов Олег Викторович",
    accountant: "Лебедева Татьяна Николаевна",
    engineer: "Борисов Игорь Сергеевич",
    inn: "7810567890",
    kpp: "781001005",
    ogrn: "1027800567890",
    address: "г. Санкт-Петербург, ул. Купчинская, д. 30",
    hours: "Пн-Пт: 9:00-18:00, Сб: 10:00-15:00",
    phone: "+7 (812) 640-88-26",
    email: "uk.nashdom@inbox.ru",
    documents: [
      { name: "Устав", url: "#" },
      { name: "Лицензия", url: "#" },
      { name: "Свидетельство о регистрации", url: "#" },
    ]
  },
  "uk-nash-dom-region": {
    id: "uk-nash-dom-region",
    name: 'ООО «УК «Наш дом – Регион»',
    director: "Новиков Константин Андреевич",
    accountant: "Волкова Ирина Павловна",
    engineer: "Захаров Юрий Владимирович",
    inn: "7810678901",
    kpp: "781001006",
    ogrn: "1027800678901",
    address: "г. Санкт-Петербург, ул. Региональная, д. 12",
    hours: "Пн-Пт: 9:00-18:00, Сб: 10:00-15:00",
    phone: "+7 (812) 640-88-26",
    email: "uk.nashdom@inbox.ru",
    documents: [
      { name: "Устав", url: "#" },
      { name: "Лицензия", url: "#" },
      { name: "Свидетельство о регистрации", url: "#" },
    ]
  },
  "uk-nash-dom-kudrovo-grad": {
    id: "uk-nash-dom-kudrovo-grad",
    name: 'ООО «УК «Наш дом-Кудрово Град»',
    director: "Степанов Максим Игоревич",
    accountant: "Павлова Светлана Алексеевна",
    engineer: "Крылов Роман Дмитриевич",
    inn: "7810789012",
    kpp: "781001007",
    ogrn: "1027800789012",
    address: "Ленинградская область, г. Кудрово, ул. Центральная, д. 8",
    hours: "Пн-Пт: 9:00-18:00, Сб: 10:00-15:00",
    phone: "+7 (812) 640-88-26",
    email: "uk.nashdom@inbox.ru",
    documents: [
      { name: "Устав", url: "#" },
      { name: "Лицензия", url: "#" },
      { name: "Свидетельство о регистрации", url: "#" },
    ]
  },
  "uk-kudrovo-dom": {
    id: "uk-kudrovo-dom",
    name: 'ООО «УК «Кудрово-Дом»',
    director: "Макаров Денис Олегович",
    accountant: "Соловьева Наталья Викторовна",
    engineer: "Белов Антон Павлович",
    inn: "7810890123",
    kpp: "781001008",
    ogrn: "1027800890123",
    address: "Ленинградская область, г. Кудрово, ул. Строителей, д. 22",
    hours: "Пн-Пт: 9:00-18:00, Сб: 10:00-15:00",
    phone: "+7 (812) 640-88-26",
    email: "uk.nashdom@inbox.ru",
    documents: [
      { name: "Устав", url: "#" },
      { name: "Лицензия", url: "#" },
      { name: "Свидетельство о регистрации", url: "#" },
    ]
  },
  "uk-kudrovo-service": {
    id: "uk-kudrovo-service",
    name: 'ООО «УК «Кудрово-Сервис»',
    director: "Комаров Евгений Александрович",
    accountant: "Медведева Юлия Сергеевна",
    engineer: "Тихонов Виктор Николаевич",
    inn: "7810901234",
    kpp: "781001009",
    ogrn: "1027800901234",
    address: "Ленинградская область, г. Кудрово, ул. Сервисная, д. 14",
    hours: "Пн-Пт: 9:00-18:00, Сб: 10:00-15:00",
    phone: "+7 (812) 640-88-26",
    email: "uk.nashdom@inbox.ru",
    documents: [
      { name: "Устав", url: "#" },
      { name: "Лицензия", url: "#" },
      { name: "Свидетельство о регистрации", url: "#" },
    ]
  },
  "uk-nash-dom-kudrovo": {
    id: "uk-nash-dom-kudrovo",
    name: 'ООО «УК «Наш дом-Кудрово»',
    director: "Орлов Николай Викторович",
    accountant: "Зайцева Екатерина Петровна",
    engineer: "Семенов Артем Игоревич",
    inn: "7811012345",
    kpp: "781001010",
    ogrn: "1027801012345",
    address: "Ленинградская область, г. Кудрово, ул. Ленинградская, д. 7",
    hours: "Пн-Пт: 9:00-18:00, Сб: 10:00-15:00",
    phone: "+7 (812) 640-88-26",
    email: "uk.nashdom@inbox.ru",
    documents: [
      { name: "Устав", url: "#" },
      { name: "Лицензия", url: "#" },
      { name: "Свидетельство о регистрации", url: "#" },
    ]
  },
  "uk-nash-dom-novoselye": {
    id: "uk-nash-dom-novoselye",
    name: 'ООО «УК «Наш Дом Новоселье»',
    director: "Попов Сергей Алексеевич",
    accountant: "Романова Людмила Ивановна",
    engineer: "Баранов Вячеслав Петрович",
    inn: "7811123456",
    kpp: "781001011",
    ogrn: "1027801123456",
    address: "г. Санкт-Петербург, ул. Новоселов, д. 25",
    hours: "Пн-Пт: 9:00-18:00, Сб: 10:00-15:00",
    phone: "+7 (812) 640-88-26",
    email: "uk.nashdom@inbox.ru",
    documents: [
      { name: "Устав", url: "#" },
      { name: "Лицензия", url: "#" },
      { name: "Свидетельство о регистрации", url: "#" },
    ]
  },
  "uk-usadba": {
    id: "uk-usadba",
    name: 'ООО «УК «Усадьба»',
    director: "Егоров Артур Владимирович",
    accountant: "Алексеева Марина Дмитриевна",
    engineer: "Назаров Илья Сергеевич",
    inn: "7811234567",
    kpp: "781001012",
    ogrn: "1027801234567",
    address: "г. Санкт-Петербург, ул. Усадебная, д. 18",
    hours: "Пн-Пт: 9:00-18:00, Сб: 10:00-15:00",
    phone: "+7 (812) 640-88-26",
    email: "uk.nashdom@inbox.ru",
    documents: [
      { name: "Устав", url: "#" },
      { name: "Лицензия", url: "#" },
      { name: "Свидетельство о регистрации", url: "#" },
    ]
  },
  "uk-city-parking": {
    id: "uk-city-parking",
    name: 'ООО «Сити Паркинг»',
    director: "Киселев Роман Андреевич",
    accountant: "Тарасова Вера Николаевна",
    engineer: "Гуляев Станислав Викторович",
    inn: "7811345678",
    kpp: "781001013",
    ogrn: "1027801345678",
    address: "г. Санкт-Петербург, ул. Парковая, д. 9",
    hours: "Пн-Пт: 9:00-18:00, Сб: 10:00-15:00",
    phone: "+7 (812) 640-88-26",
    email: "uk.nashdom@inbox.ru",
    documents: [
      { name: "Устав", url: "#" },
      { name: "Лицензия", url: "#" },
      { name: "Свидетельство о регистрации", url: "#" },
    ]
  },
  "uk-nash-dom-kudrovo-sity": {
    id: "uk-nash-dom-kudrovo-sity",
    name: 'ООО «УК «Наш дом-Кудрово-Сити»',
    director: "Давыдов Кирилл Петрович",
    accountant: "Антонова Валентина Олеговна",
    engineer: "Фролов Геннадий Иванович",
    inn: "7811456789",
    kpp: "781001014",
    ogrn: "1027801456789",
    address: "Ленинградская область, г. Кудрово, ул. Городская, д. 33",
    hours: "Пн-Пт: 9:00-18:00, Сб: 10:00-15:00",
    phone: "+7 (812) 640-88-26",
    email: "uk.nashdom@inbox.ru",
    documents: [
      { name: "Устав", url: "#" },
      { name: "Лицензия", url: "#" },
      { name: "Свидетельство о регистрации", url: "#" },
    ]
  },
  "uk-kapital-komfort": {
    id: "uk-kapital-komfort",
    name: 'ООО «УК «Капитал-Комфорт»',
    director: "Гусев Михаил Сергеевич",
    accountant: "Калинина Лариса Александровна",
    engineer: "Щербаков Валерий Дмитриевич",
    inn: "7811567890",
    kpp: "781001015",
    ogrn: "1027801567890",
    address: "г. Санкт-Петербург, ул. Капитальная, д. 11",
    hours: "Пн-Пт: 9:00-18:00, Сб: 10:00-15:00",
    phone: "+7 (812) 640-88-26",
    email: "uk.nashdom@inbox.ru",
    documents: [
      { name: "Устав", url: "#" },
      { name: "Лицензия", url: "#" },
      { name: "Свидетельство о регистрации", url: "#" },
    ]
  },
  "uk-mks": {
    id: "uk-mks",
    name: 'ООО «УК «МКС»',
    director: "Лазарев Александр Владимирович",
    accountant: "Савельева Оксана Ивановна",
    engineer: "Яковлев Борис Петрович",
    inn: "7811678901",
    kpp: "781001016",
    ogrn: "1027801678901",
    address: "г. Санкт-Петербург, ул. Московская, д. 44",
    hours: "Пн-Пт: 9:00-18:00, Сб: 10:00-15:00",
    phone: "+7 (812) 640-88-26",
    email: "uk.nashdom@inbox.ru",
    documents: [
      { name: "Устав", url: "#" },
      { name: "Лицензия", url: "#" },
      { name: "Свидетельство о регистрации", url: "#" },
    ]
  },
  "uk-biznes-sity-dom": {
    id: "uk-biznes-sity-dom",
    name: 'ООО «УК «Бизнес сити дом»',
    director: "Богданов Игорь Николаевич",
    accountant: "Королева Анастасия Викторовна",
    engineer: "Никитин Владислав Олегович",
    inn: "7811789012",
    kpp: "781001017",
    ogrn: "1027801789012",
    address: "г. Санкт-Петербург, ул. Бизнес-центра, д. 2",
    hours: "Пн-Пт: 9:00-18:00, Сб: 10:00-15:00",
    phone: "+7 (812) 640-88-26",
    email: "uk.nashdom@inbox.ru",
    documents: [
      { name: "Устав", url: "#" },
      { name: "Лицензия", url: "#" },
      { name: "Свидетельство о регистрации", url: "#" },
    ]
  },
};

const CompanyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const company = id ? companiesData[id] : null;

  if (!company) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Компания не найдена</h1>
          <Link to="/about">
            <Button>Вернуться к списку компаний</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const companyHouses = houses.filter(h => h.company === company.name);

  return (
    <Layout>
      <section className="py-12 bg-gradient-to-br from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <Link to="/about" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
            <Icon name="ArrowLeft" size={20} />
            Вернуться к списку компаний
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold mb-8">{company.name}</h1>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Users" size={24} className="text-primary" />
                  Руководство
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Генеральный директор</div>
                  <div className="font-semibold">{company.director}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Главный бухгалтер</div>
                  <div className="font-semibold">{company.accountant}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Главный инженер</div>
                  <div className="font-semibold">{company.engineer}</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="FileText" size={24} className="text-primary" />
                  Реквизиты
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">ИНН</div>
                    <div className="font-medium">{company.inn}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">КПП</div>
                    <div className="font-medium">{company.kpp}</div>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">ОГРН</div>
                  <div className="font-medium">{company.ogrn}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Юридический адрес</div>
                  <div className="font-medium">{company.address}</div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Phone" size={24} className="text-primary" />
                  Контактная информация
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Телефон</div>
                  <a href={`tel:${company.phone.replace(/\D/g, '')}`} className="font-semibold hover:text-primary">
                    {company.phone}
                  </a>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Электронная почта</div>
                  <a href={`mailto:${company.email}`} className="font-semibold hover:text-primary">
                    {company.email}
                  </a>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Приемные часы</div>
                  <div className="font-medium">{company.hours}</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="FileCheck" size={24} className="text-primary" />
                  Документы организации
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {company.documents.map((doc, index) => (
                    <a
                      key={index}
                      href={doc.url}
                      className="flex items-center gap-2 p-3 rounded-lg hover:bg-muted transition-colors"
                    >
                      <Icon name="Download" size={18} className="text-primary" />
                      <span className="font-medium">{doc.name}</span>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {companyHouses.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Building2" size={24} className="text-primary" />
                  Дома в управлении ({companyHouses.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {companyHouses.map((house) => (
                    <Link
                      key={house.id}
                      to={`/houses/${house.id}`}
                      className="p-4 rounded-lg border hover:border-primary hover:shadow-md transition-all"
                    >
                      <div className="font-semibold mb-1">{house.address}</div>
                      <div className="text-sm text-muted-foreground">{house.district}</div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default CompanyDetail;
