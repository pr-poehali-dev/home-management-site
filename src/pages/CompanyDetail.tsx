import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";

interface CompanyInfo {
  id: string;
  name: string;
  director: string;
  directorSchedule?: string;
  accountant: string;
  accountantSchedule?: string;
  engineer: string;
  engineerSchedule?: string;
  inn: string;
  kpp: string;
  ogrn: string;
  legalAddress: string;
  postalAddress?: string;
  actualAddress?: string;
  receptionAddress?: string;
  phone: string;
  email: string;
  documents: { name: string; url: string }[];
}

const companiesData: Record<string, CompanyInfo> = {
  "uk-nash-dom-sity": {
    id: "uk-nash-dom-sity",
    name: 'ООО «УК «Наш дом-Сити»',
    director: "Рябинин Андрей Владимирович",
    directorSchedule: "по предварительной записи",
    accountant: "Дмитрова Елена Владимировна",
    accountantSchedule: "вт. 17:00-19:00, чт. 10:00-12:00",
    engineer: "Шевчук Анна Николаевна",
    engineerSchedule: "вт. 17:00-19:00, чт. 10:00-12:00",
    inn: "7806367021",
    kpp: "780401001",
    ogrn: "1077847537460",
    legalAddress: "195197, г. Санкт-Петербург, ул. Минеральная, д.13, литер. А, помещение 47-Н, офис 16",
    postalAddress: "195197, а/я 150",
    phone: "8 (812) 640-88-26",
    email: "uk.nash-dom@mail.ru, uk.nashdom@inbox.ru",
    documents: [
      { name: "Устав", url: "#" },
      { name: "Лицензия", url: "#" },
      { name: "Свидетельство о регистрации", url: "#" },
    ]
  },
  "uk-nash-dom-polyustrovo": {
    id: "uk-nash-dom-polyustrovo",
    name: 'ООО «УК «Наш дом-Полюстрово»',
    director: "Рябинин Андрей Владимирович",
    directorSchedule: "по предварительной записи",
    accountant: "Дмитрова Елена Владимировна",
    accountantSchedule: "вт. 17:00-19:00, чт. 10:00-12:00",
    engineer: "Шевчук Анна Николаевна",
    engineerSchedule: "вт. 17:00-19:00, чт. 10:00-12:00",
    inn: "7804554121",
    kpp: "780401001",
    ogrn: "1157847435646",
    legalAddress: "195197, г. Санкт-Петербург, ул. Минеральная, дом 13, литера А, помещение 1-Н, офис 4",
    postalAddress: "195197, а/я 168",
    phone: "8 (812) 640-88-26",
    email: "uk.nash-dom@mail.ru, uk.nashdom@inbox.ru",
    documents: [
      { name: "Устав", url: "#" },
      { name: "Лицензия", url: "#" },
      { name: "Свидетельство о регистрации", url: "#" },
    ]
  },
  "uk-sityhome": {
    id: "uk-sityhome",
    name: 'ООО УК «СИТИХОУМ»',
    director: "Рябинин Андрей Владимирович",
    directorSchedule: "по предварительной записи",
    accountant: "Дмитрова Елена Владимировна",
    accountantSchedule: "вт. 17:00-19:00, чт. 10:00-12:00",
    engineer: "Шевчук Анна Николаевна",
    engineerSchedule: "вт. 17:00-19:00, чт. 10:00-12:00",
    inn: "7802692542",
    kpp: "780401001",
    ogrn: "1197847146056",
    legalAddress: "195197, г. Санкт-Петербург, ул. Минеральная, дом 13, литера А, помещение 47-Н, офис 15",
    postalAddress: "195197, а/я 162",
    phone: "8 (812) 640-88-26",
    email: "uk.nash-dom@mail.ru, uk.nashdom@inbox.ru",
    documents: [
      { name: "Устав", url: "#" },
      { name: "Лицензия", url: "#" },
      { name: "Свидетельство о регистрации", url: "#" },
    ]
  },
  "uk-ostrov-grad": {
    id: "uk-ostrov-grad",
    name: 'ООО «УК «Остров-град»',
    director: "Рябинин Андрей Владимирович",
    directorSchedule: "по предварительной записи",
    accountant: "Дмитрова Елена Владимировна",
    accountantSchedule: "вт. 17:00-19:00, чт. 10:00-12:00",
    engineer: "Шевчук Анна Николаевна",
    engineerSchedule: "вт. 17:00-19:00, чт. 10:00-12:00",
    inn: "7804604277",
    kpp: "780401001",
    ogrn: "1177847260964",
    legalAddress: "195197, г. Санкт-Петербург, ул. Минеральная, дом 13, литера А, помещение 46-Н, офис 9",
    postalAddress: "195197, а/я 184",
    phone: "8 (812) 640-88-26",
    email: "uk.nash-dom@mail.ru, uk.nashdom@inbox.ru",
    documents: [
      { name: "Устав", url: "#" },
      { name: "Лицензия", url: "#" },
      { name: "Свидетельство о регистрации", url: "#" },
    ]
  },
  "uk-novoe-kupchino": {
    id: "uk-novoe-kupchino",
    name: 'ООО «УК «Новое Купчино»',
    director: "Рябинин Андрей Владимирович",
    directorSchedule: "по предварительной записи",
    accountant: "Дмитрова Елена Владимировна",
    accountantSchedule: "вт. 17:00-19:00, чт. 10:00-12:00",
    engineer: "Шевчук Анна Николаевна",
    engineerSchedule: "вт. 17:00-19:00, чт. 10:00-12:00",
    inn: "7804669235",
    kpp: "780401001",
    ogrn: "1207800058784",
    legalAddress: "195197, г. Санкт-Петербург, ул. Минеральная, дом 13, литера А, помещение 4-Н, офис 5",
    postalAddress: "195197, а/я 163",
    phone: "8 (812) 640-88-26",
    email: "uk.nash-dom@mail.ru, uk.nashdom@inbox.ru",
    documents: [
      { name: "Устав", url: "#" },
      { name: "Лицензия", url: "#" },
      { name: "Свидетельство о регистрации", url: "#" },
    ]
  },
  "uk-nash-dom-region": {
    id: "uk-nash-dom-region",
    name: 'ООО «УК «Наш дом – Регион»',
    director: "Рябинин Андрей Владимирович",
    directorSchedule: "по предварительной записи",
    accountant: "Дмитрова Елена Владимировна",
    accountantSchedule: "вт. 17:00-19:00, чт. 10:00-12:00",
    engineer: "Шлык Владимир Владимирович",
    engineerSchedule: "вт. 17:00-19:00, чт. 10:00-12:00",
    inn: "7806512790",
    kpp: "780401001",
    ogrn: "1137847414792",
    legalAddress: "195197, г. Санкт-Петербург, ул. Минеральная, дом 13, литера А, помещение 47-Н, офис 20",
    postalAddress: "195197, а/я 153",
    phone: "8 (812) 640-88-26",
    email: "uk.nash-dom@mail.ru, uk.nashdom@inbox.ru",
    documents: [
      { name: "Устав", url: "#" },
      { name: "Лицензия", url: "#" },
      { name: "Свидетельство о регистрации", url: "#" },
    ]
  },
  "uk-nash-dom-kudrovo-grad": {
    id: "uk-nash-dom-kudrovo-grad",
    name: 'ООО «УК «Наш дом-Кудрово Град»',
    director: "Рябинин Андрей Владимирович",
    directorSchedule: "по предварительной записи",
    accountant: "Дмитрова Елена Владимировна",
    accountantSchedule: "вт. 17:00-19:00, чт. 10:00-12:00",
    engineer: "Шлык Владимир Владимирович",
    engineerSchedule: "вт. 17:00-19:00, чт. 10:00-12:00",
    inn: "7804547759",
    kpp: "780401001",
    ogrn: "1157847342938",
    legalAddress: "195197 г. Санкт-Петербург, ул. Минеральная, дом 13, литера А, помещение 47-Н, офис 19",
    postalAddress: "195197, а/я 172",
    phone: "8 (812) 640-88-26",
    email: "uk.nash-dom@mail.ru, uk.nashdom@inbox.ru",
    documents: [
      { name: "Устав", url: "#" },
      { name: "Лицензия", url: "#" },
      { name: "Свидетельство о регистрации", url: "#" },
    ]
  },
  "uk-kudrovo-dom": {
    id: "uk-kudrovo-dom",
    name: 'ООО «УК «Кудрово-Дом»',
    director: "Рябинин Андрей Владимирович",
    directorSchedule: "по предварительной записи",
    accountant: "Дмитрова Елена Владимировна",
    accountantSchedule: "вт. 17:00-19:00, чт. 10:00-12:00",
    engineer: "Шлык Владимир Владимирович",
    engineerSchedule: "вт. 17:00-19:00, чт. 10:00-12:00",
    inn: "7804604284",
    kpp: "780401001",
    ogrn: "1177847261240",
    legalAddress: "195197, г. Санкт-Петербург, ул. Минеральная, дом 13, литера А, помещение 47-Н, офис 21",
    postalAddress: "195197, а/я 176",
    phone: "8 (812) 640-88-26",
    email: "uk.nash-dom@mail.ru, uk.nashdom@inbox.ru",
    documents: [
      { name: "Устав", url: "#" },
      { name: "Лицензия", url: "#" },
      { name: "Свидетельство о регистрации", url: "#" },
    ]
  },
  "uk-kudrovo-service": {
    id: "uk-kudrovo-service",
    name: 'ООО «УК «Кудрово-сервис»',
    director: "Рябинин Андрей Владимирович",
    directorSchedule: "по предварительной записи",
    accountant: "Дмитрова Елена Владимировна",
    accountantSchedule: "вт. 17:00-19:00, чт. 10:00-12:00",
    engineer: "Шлык Владимир Владимирович",
    engineerSchedule: "вт. 17:00-19:00, чт. 10:00-12:00",
    inn: "7804604291",
    kpp: "780401001",
    ogrn: "1177847261360",
    legalAddress: "195197, г. Санкт-Петербург, ул. Минеральная, дом 13, литера А, помещение 47-Н, офис 18",
    postalAddress: "195197, а/я 178",
    phone: "8 (812) 640-88-26",
    email: "uk.nash-dom@mail.ru, uk.nashdom@inbox.ru",
    documents: [
      { name: "Устав", url: "#" },
      { name: "Лицензия", url: "#" },
      { name: "Свидетельство о регистрации", url: "#" },
    ]
  },
  "uk-nash-dom-kudrovo": {
    id: "uk-nash-dom-kudrovo",
    name: 'ООО «УК «Наш дом-Кудрово»',
    director: "Рябинин Андрей Владимирович",
    directorSchedule: "по предварительной записи",
    accountant: "Дмитрова Елена Владимировна",
    accountantSchedule: "вт. 17:00-19:00, чт. 10:00-12:00",
    engineer: "Шлык Владимир Владимирович",
    engineerSchedule: "вт. 17:00-19:00, чт. 10:00-12:00",
    inn: "7804547798",
    kpp: "780401001",
    ogrn: "1157847343455",
    legalAddress: "195197 г. Санкт-Петербург, ул. Минеральная, дом 13, литера А, помещение 46-Н, офис 7",
    postalAddress: "195197, а/я 169",
    phone: "8 (812) 640-88-26",
    email: "uk.nash-dom@mail.ru, uk.nashdom@inbox.ru",
    documents: [
      { name: "Устав", url: "#" },
      { name: "Лицензия", url: "#" },
      { name: "Свидетельство о регистрации", url: "#" },
    ]
  },
  "uk-nash-dom-novoselye": {
    id: "uk-nash-dom-novoselye",
    name: 'ООО «УК «Наш Дом Новоселье»',
    director: "Соломенцев Сергей Алексеевич",
    directorSchedule: "по предварительной записи",
    accountant: "Скоробогатова Алла Владимировна",
    accountantSchedule: "вт. 17:00-19:00, чт. 10:00-12:00",
    engineer: "Никоноров Сергей Юрьевич",
    engineerSchedule: "вт. 17:00-19:00, чт. 10:00-12:00",
    inn: "7804604380",
    kpp: "780401001",
    ogrn: "1177847262515",
    legalAddress: "195197, г. Санкт-Петербург, ул. Минеральная, дом 13, литера А, помещение 47-Н, офис 14",
    postalAddress: "195197, а/я 174",
    receptionAddress: "Ленинградская область, Ломоносовский район, гп. Новоселье, пр. Питерский, д. 1 (в помещении УК)",
    phone: "8 (812) 640-88-26",
    email: "uk.nash-dom@mail.ru, uk.nashdom@inbox.ru",
    documents: [
      { name: "Устав", url: "#" },
      { name: "Лицензия", url: "#" },
      { name: "Свидетельство о регистрации", url: "#" },
    ]
  },
  "uk-usadba": {
    id: "uk-usadba",
    name: 'ООО «УК «Усадьба»',
    director: "Юпатов Андрей Владимирович",
    directorSchedule: "по предварительной записи",
    accountant: "Скоробогатова Алла Владимировна",
    accountantSchedule: "вт. 17:00-19:00, чт. 10:00-12:00",
    engineer: "Шевчук Анна Николаевна",
    engineerSchedule: "вт. 17:00-19:00, чт. 10:00-12:00",
    inn: "7802772117",
    kpp: "780401001",
    ogrn: "1117847534881",
    legalAddress: "195197, г. Санкт-Петербург, ул. Минеральная, дом 13, литера А, помещение 46-Н, офис 6",
    postalAddress: "195197, а/я 181",
    phone: "8 (812) 640-88-26",
    email: "uk.nash-dom@mail.ru, uk.nashdom@inbox.ru",
    documents: [
      { name: "Устав", url: "#" },
      { name: "Лицензия", url: "#" },
      { name: "Свидетельство о регистрации", url: "#" },
    ]
  },
  "uk-city-parking": {
    id: "uk-city-parking",
    name: 'ООО «Сити Паркинг»',
    director: "Рябинин Андрей Владимирович",
    directorSchedule: "по предварительной записи",
    accountant: "Дмитрова Елена Владимировна",
    accountantSchedule: "вт. 17:00-19:00, чт. 10:00-12:00",
    engineer: "Шевчук Анна Николаевна",
    engineerSchedule: "вт. 17:00-19:00, чт. 10:00-12:00",
    inn: "7804586483",
    kpp: "780401001",
    ogrn: "1167847496300",
    legalAddress: "195197, г. Санкт-Петербург, ул. Минеральная, дом 13, литера А, помещение 46-Н, офис 8",
    postalAddress: "195197, а/я 154",
    phone: "8 (812) 640-88-26",
    email: "uk.nash-dom@mail.ru, uk.nashdom@inbox.ru",
    documents: [
      { name: "Устав", url: "#" },
      { name: "Лицензия", url: "#" },
      { name: "Свидетельство о регистрации", url: "#" },
    ]
  },
  "uk-nash-dom-kudrovo-sity": {
    id: "uk-nash-dom-kudrovo-sity",
    name: 'ООО «УК «Наш дом-Кудрово-Сити»',
    director: "Рябинин Андрей Владимирович",
    directorSchedule: "по предварительной записи",
    accountant: "Дмитрова Елена Владимировна",
    accountantSchedule: "вт. 17:00-19:00, чт. 10:00-12:00",
    engineer: "Шлык Владимир Владимирович",
    engineerSchedule: "вт. 17:00-19:00, чт. 10:00-12:00",
    inn: "4703143105",
    kpp: "470301001",
    ogrn: "1154704005830",
    legalAddress: "188689, Ленинградская обл., Всеволожский р-он, гор. Кудрово, аллея Каштановая (Новый Оккервиль мкр), д. 3, пом.18-Н",
    postalAddress: "195197, а/я 173",
    phone: "8 (812) 640-88-26",
    email: "uk.nash-dom@mail.ru, uk.nashdom@inbox.ru",
    documents: [
      { name: "Устав", url: "#" },
      { name: "Лицензия", url: "#" },
      { name: "Свидетельство о регистрации", url: "#" },
    ]
  },
  "uk-kapital-komfort": {
    id: "uk-kapital-komfort",
    name: 'ООО «УК «Капитал-Комфорт»',
    director: "Рябинин Андрей Владимирович",
    directorSchedule: "по предварительной записи",
    accountant: "Дмитрова Елена Владимировна",
    accountantSchedule: "вт. 17:00-19:00, чт. 10:00-12:00",
    engineer: "Шлык Владимир Владимирович",
    engineerSchedule: "вт. 17:00-19:00, чт. 10:00-12:00",
    inn: "7804663191",
    kpp: "470601001",
    ogrn: "1197847249621",
    legalAddress: "188691, Ленинградская обл., Всеволожский м.р-н, Кудрово г., Заневское г.п., Кудрово г., Каштановая аллея (мкр. Новый Оккервиль), д. 3, помещ. 18-Н, офис 1",
    postalAddress: "",
    phone: "8 (812) 640-88-26",
    email: "uk.nash-dom@mail.ru, uk.nashdom@inbox.ru",
    documents: [
      { name: "Устав", url: "#" },
      { name: "Лицензия", url: "#" },
      { name: "Свидетельство о регистрации", url: "#" },
    ]
  },
  "uk-mks": {
    id: "uk-mks",
    name: 'ООО «УК «МКС»',
    director: "Никитин Сергей Андреевич",
    directorSchedule: "по предварительной записи",
    accountant: "Дмитрова Елена Владимировна",
    accountantSchedule: "вт. 17:00-19:00, чт. 10:00-12:00",
    engineer: "",
    inn: "7804684096",
    kpp: "780401001",
    ogrn: "1217800098340",
    legalAddress: "195197, г. Санкт-Петербург, вн.тер.г. муниципальный округ Финляндский округ, пр-кт Полюстровский, д. 59, литера Ф, помещ. 1-Н, офис 443",
    postalAddress: "",
    phone: "8 (812) 640-88-26",
    email: "uk.nash-dom@mail.ru, uk.nashdom@inbox.ru",
    documents: [
      { name: "Устав", url: "#" },
      { name: "Лицензия", url: "#" },
      { name: "Свидетельство о регистрации", url: "#" },
    ]
  },
  "uk-biznes-sity-dom": {
    id: "uk-biznes-sity-dom",
    name: 'ООО «УК «Бизнес сити дом»',
    director: "Скоробогатова Ксения Анатольевна",
    directorSchedule: "по предварительной записи",
    accountant: "Аколюшная Наталья Олеговна",
    accountantSchedule: "вт. 17:00-19:00, чт. 10:00-12:00",
    engineer: "Шадян Сергей Валентinович",
    engineerSchedule: "вт. 17:00-19:00, чт. 10:00-12:00",
    inn: "7804680253",
    kpp: "780401001",
    ogrn: "1217800026531",
    legalAddress: "195197, г. Санкт-Петербург, ул. Минеральная, д.13, лит. А, пом. 47-Н, оф. 13",
    actualAddress: "195197, г. Санкт-Петербург, ул. Васенко, д. 12, лит. А, офис 21-Н",
    phone: "467-77-77",
    email: "uk.bsd@mail.ru",
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
        <div className="container mx-auto px-4 py-20">
          <Card>
            <CardContent className="p-8 text-center">
              <Icon name="AlertCircle" className="mx-auto mb-4 text-destructive" size={48} />
              <h2 className="text-2xl font-bold mb-4">Компания не найдена</h2>
              <p className="text-muted-foreground mb-6">
                К сожалению, информация о данной управляющей компании не найдена.
              </p>
              <Link to="/about">
                <Button>Вернуться к списку компаний</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-20 bg-gradient-to-br from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Link to="/about">
              <Button variant="ghost" className="mb-4">
                <Icon name="ArrowLeft" size={20} className="mr-2" />
                Вернуться к списку компаний
              </Button>
            </Link>
            <h1 className="text-4xl font-bold mb-4">{company.name}</h1>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Building2" className="text-primary" />
                  Юридическая информация
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">ИНН</p>
                  <p className="font-medium">{company.inn}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">КПП</p>
                  <p className="font-medium">{company.kpp}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">ОГРН</p>
                  <p className="font-medium">{company.ogrn}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Юридический адрес</p>
                  <p className="font-medium">{company.legalAddress}</p>
                </div>
                {company.postalAddress && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Почтовый адрес</p>
                    <p className="font-medium">{company.postalAddress}</p>
                  </div>
                )}
                {company.actualAddress && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Фактический адрес</p>
                    <p className="font-medium">{company.actualAddress}</p>
                  </div>
                )}
                {company.receptionAddress && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Адрес приема</p>
                    <p className="font-medium">{company.receptionAddress}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Users" className="text-primary" />
                  Руководство
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Генеральный директор</p>
                  <p className="font-medium">{company.director}</p>
                  {company.directorSchedule && (
                    <p className="text-sm text-muted-foreground italic">{company.directorSchedule}</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Главный бухгалтер</p>
                  <p className="font-medium">{company.accountant}</p>
                  {company.accountantSchedule && (
                    <p className="text-sm text-muted-foreground italic">{company.accountantSchedule}</p>
                  )}
                </div>
                {company.engineer && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Главный инженер</p>
                    <p className="font-medium">{company.engineer}</p>
                    {company.engineerSchedule && (
                      <p className="text-sm text-muted-foreground italic">{company.engineerSchedule}</p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Phone" className="text-primary" />
                  Контактная информация
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Телефон / Факс</p>
                  <a href={`tel:${company.phone}`} className="font-medium hover:text-primary transition-colors">
                    {company.phone}
                  </a>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Электронная почта</p>
                  <div className="space-y-1">
                    {company.email.split(',').map((email, idx) => (
                      <a 
                        key={idx}
                        href={`mailto:${email.trim()}`} 
                        className="block font-medium hover:text-primary transition-colors"
                      >
                        {email.trim()}
                      </a>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="FileText" className="text-primary" />
                  Документы
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {company.documents.map((doc, idx) => (
                    <li key={idx}>
                      <a
                        href={doc.url}
                        className="flex items-center gap-2 text-primary hover:underline"
                      >
                        <Icon name="Download" size={16} />
                        {doc.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CompanyDetail;