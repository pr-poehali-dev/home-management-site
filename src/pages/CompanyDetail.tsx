import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
  documents: { name: string; url?: string; images?: string[] }[];
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
      { 
        name: "Устав", 
        images: [
          "https://cdn.poehali.dev/files/fc048f8c-4478-4db7-8a92-60286923fcc9.jpg",
          "https://cdn.poehali.dev/files/7faf8760-fb4d-4b3f-9499-fad5087318ab.jpg",
          "https://cdn.poehali.dev/files/b54f26d0-f57d-4ea7-86c5-af528d6002c6.jpg",
          "https://cdn.poehali.dev/files/45a5b3c1-223d-49ed-81da-a336254c6023.jpg",
          "https://cdn.poehali.dev/files/b52134cc-c8b8-4e86-8cec-7a53b8baf443.jpg",
          "https://cdn.poehali.dev/files/336ad485-dd4d-4fd7-b62a-d143f51e9d8a.jpg",
          "https://cdn.poehali.dev/files/3710a038-d996-4b8e-b6da-fe63f4066692.jpg",
          "https://cdn.poehali.dev/files/1dae7596-af19-449e-81ab-ddbfaeae427e.jpg",
          "https://cdn.poehali.dev/files/fbc762a1-1298-4875-976e-0e079b345184.jpg",
          "https://cdn.poehali.dev/files/424da67f-f2c7-4955-8290-3205e4c74685.jpg",
          "https://cdn.poehali.dev/files/8a25f00b-7751-4820-ac79-54047fcdf4f1.jpg",
          "https://cdn.poehali.dev/files/93fcbfbe-9f22-4a45-888b-6bbcaf277b71.jpg",
          "https://cdn.poehali.dev/files/c9979b69-59b3-4940-8c36-f0399a0db090.jpg",
          "https://cdn.poehali.dev/files/38a6fb5b-6279-43a3-927f-0db57a47aaff.jpg",
          "https://cdn.poehali.dev/files/84879ff3-7600-42b3-8c78-1a42e1abd0ea.jpg"
        ]
      },
      { name: "Лицензия" },
      { name: "Свидетельство о регистрации" },
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
      { 
        name: "Устав",
        images: [
          "https://cdn.poehali.dev/files/2bae8275-d2a3-4a7e-9369-6690934b23f5.jpg",
          "https://cdn.poehali.dev/files/05b0c79f-660a-46f9-ba17-7bf4528cf04d.jpg",
          "https://cdn.poehali.dev/files/0b068ed3-8ba9-44f6-98d5-da8066229455.jpg",
          "https://cdn.poehali.dev/files/26dd368c-b856-4043-bf7b-964744ff9416.jpg",
          "https://cdn.poehali.dev/files/50a9a71d-a1e7-4184-a4e1-b270485bb267.jpg",
          "https://cdn.poehali.dev/files/9a5e1298-24d9-42aa-9d56-5df31cbd8a75.jpg",
          "https://cdn.poehali.dev/files/05b96042-1f47-4c49-908f-a13be3cdcdc3.jpg",
          "https://cdn.poehali.dev/files/8671be0f-bffa-4efb-826f-88f5722d9531.jpg",
          "https://cdn.poehali.dev/files/5ccd351a-0089-4f06-9f22-68d35db62cc8.jpg",
          "https://cdn.poehali.dev/files/fceccef4-3b4d-4e43-9d37-73f09e1491b5.jpg",
          "https://cdn.poehali.dev/files/090474d1-426c-4ee1-86f1-f38eec3ec3a1.jpg",
          "https://cdn.poehali.dev/files/683c393a-e75f-4531-b4b5-c3221739e200.jpg",
          "https://cdn.poehali.dev/files/7fadf1cf-b1b8-4818-a88e-b0b28c58d838.jpg",
          "https://cdn.poehali.dev/files/872696dd-66dc-4b96-8c72-3d3d1aa391a5.jpg",
          "https://cdn.poehali.dev/files/3d80084b-ba60-415e-9a1e-162888a2ec59.jpg"
        ]
      },
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
      { 
        name: "Устав",
        images: [
          "https://cdn.poehali.dev/files/bc74b827-d3a0-4776-8651-ffbc0ea3b5ac.jpg",
          "https://cdn.poehali.dev/files/be1398e9-526c-4f85-8960-f7380b37df3d.jpg",
          "https://cdn.poehali.dev/files/80a8ef27-978f-42c7-8454-70cd57af6627.jpg",
          "https://cdn.poehali.dev/files/13fe032a-b33b-4739-993f-aac743383d36.jpg",
          "https://cdn.poehali.dev/files/ab242e95-e084-44f8-97fe-d5c88b960e63.jpg",
          "https://cdn.poehali.dev/files/52ea1e8d-1c62-4b42-a969-3a0edfd75c52.jpg",
          "https://cdn.poehali.dev/files/f5f4d931-9e8b-429e-988a-330ea5d9d8cf.jpg",
          "https://cdn.poehali.dev/files/d97d5b64-3e7d-46c0-b3a8-e16855d7584d.jpg",
          "https://cdn.poehali.dev/files/c96408e5-6c70-4edc-bd22-625afb4eefe3.jpg",
          "https://cdn.poehali.dev/files/ad8d90f2-53d5-4d55-940b-fe1bf659119d.jpg",
          "https://cdn.poehali.dev/files/ef1eb360-bc1a-461f-946a-54f503883dbb.jpg",
          "https://cdn.poehali.dev/files/5e2839bc-e0a6-42fe-a34b-349fd9f73b05.jpg",
          "https://cdn.poehali.dev/files/8f3a6cc8-7e92-4a50-8626-6fdebb0e99b3.jpg",
          "https://cdn.poehali.dev/files/06d761bb-0770-423f-8f9f-08f4cf6f0041.jpg",
          "https://cdn.poehali.dev/files/18f3b305-d9f2-4e8e-837b-37bf3d6a2818.jpg"
        ]
      },
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
      { 
        name: "Устав",
        images: [
          "https://cdn.poehali.dev/files/8711602a-944f-465c-9bb2-fdf47a93a563.jpg",
          "https://cdn.poehali.dev/files/5eaf20d7-2007-4a1d-ac84-b28e9432e341.jpg",
          "https://cdn.poehali.dev/files/88ddef7d-32d3-43db-9432-02e69d2a197d.jpg",
          "https://cdn.poehali.dev/files/7c9b944d-1c1d-4f36-904e-1e4054e7d976.jpg",
          "https://cdn.poehali.dev/files/7aecd831-e4d3-40cc-b1b3-46734b57e139.jpg",
          "https://cdn.poehali.dev/files/872dcfaf-1187-4af9-9bfe-b1a8e98b3386.jpg",
          "https://cdn.poehali.dev/files/2dd33080-01a2-474c-ab73-e91f7b6a0772.jpg",
          "https://cdn.poehali.dev/files/0a18a9ce-5f0f-4ccc-9427-301b830f5845.jpg",
          "https://cdn.poehali.dev/files/b1905cc1-023a-4c34-9fc6-36f85249e477.jpg",
          "https://cdn.poehali.dev/files/49710bce-b4d6-4584-bdce-608151bbf0ef.jpg",
          "https://cdn.poehali.dev/files/9b6e87d6-45d9-4e71-b965-061c108271eb.jpg",
          "https://cdn.poehali.dev/files/122d077e-2fed-4cd8-b85b-930eb467fe7d.jpg",
          "https://cdn.poehali.dev/files/39782a2d-67c9-4426-a487-4688080c1690.jpg",
          "https://cdn.poehali.dev/files/9f11378f-6677-4a7c-8f2a-72966082e771.jpg",
          "https://cdn.poehali.dev/files/09c20d11-7080-487b-8b5e-dfb447d65ef5.jpg"
        ]
      },
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
      { 
        name: "Устав",
        images: [
          "https://cdn.poehali.dev/files/22a9d2cf-98a7-4f5e-ad74-265636666521.jpg",
          "https://cdn.poehali.dev/files/ac94373d-70d4-48e5-90d6-93838f65292e.jpg",
          "https://cdn.poehali.dev/files/893269e7-8043-4b5b-8c96-a18c81c68a5b.jpg",
          "https://cdn.poehali.dev/files/3df79bf2-3c45-447c-a708-4cdf270c441a.jpg",
          "https://cdn.poehali.dev/files/65b857e3-40de-4573-8b4b-02f50c80a33b.jpg",
          "https://cdn.poehali.dev/files/6f09209f-2423-497d-bb12-5d6190aad570.jpg",
          "https://cdn.poehali.dev/files/714895a9-591f-4d1e-a382-02468f838446.jpg",
          "https://cdn.poehali.dev/files/0184dd89-67b0-4745-9005-f7993c70c8c0.jpg",
          "https://cdn.poehali.dev/files/e1a398a3-925e-459f-ba39-b979851d6664.jpg",
          "https://cdn.poehali.dev/files/85b50415-66ac-48c6-84e0-d889c97f0ade.jpg",
          "https://cdn.poehali.dev/files/84fd4a53-b75a-4273-a607-903aa0ec6e09.jpg",
          "https://cdn.poehali.dev/files/e4d46d6f-2279-4625-99e4-49a3bb9fe68c.jpg",
          "https://cdn.poehali.dev/files/84619b4b-4397-4f58-b551-3801750750d6.jpg",
          "https://cdn.poehali.dev/files/3cd5cc2a-a09f-413f-b780-43702aeddcd1.jpg",
          "https://cdn.poehali.dev/files/76efdac2-b28c-4305-befe-7f550a04a228.jpg"
        ]
      },
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
      { 
        name: "Устав",
        images: [
          "https://cdn.poehali.dev/files/21d94583-c605-49a3-851b-700101b550ab.jpg",
          "https://cdn.poehali.dev/files/59c89ec6-a0fa-41b0-9eda-049f7c23a233.jpg",
          "https://cdn.poehali.dev/files/3357cd57-4ecb-473d-9b25-289f04bc21db.jpg",
          "https://cdn.poehali.dev/files/dac6ecd7-e418-4bee-809c-575ab7ff9b54.jpg",
          "https://cdn.poehali.dev/files/3cd9e2ac-810f-4549-bef9-e03fcb42059e.jpg",
          "https://cdn.poehali.dev/files/f9503e42-6f91-41e9-a405-d83fd2bdb30f.jpg",
          "https://cdn.poehali.dev/files/1d093beb-d518-4ca5-9239-c1b681744942.jpg",
          "https://cdn.poehali.dev/files/fa37f231-4f60-4587-bc7d-5e5e239881c4.jpg",
          "https://cdn.poehali.dev/files/fc986d76-2f68-4aef-af1c-418a8471afd8.jpg",
          "https://cdn.poehali.dev/files/a391f6b9-27b4-4b48-953c-2636609d78fd.jpg",
          "https://cdn.poehali.dev/files/99b32b24-bcfd-4acd-854e-cef7fea5bea7.jpg",
          "https://cdn.poehali.dev/files/75427486-e3c3-4360-afe7-511834bd16cc.jpg",
          "https://cdn.poehali.dev/files/1b1f2ac2-0e51-4f4b-8f26-4828cc9a0cc3.jpg",
          "https://cdn.poehali.dev/files/ff2cebb8-eec6-411a-9996-45cdcd0046b5.jpg",
          "https://cdn.poehali.dev/files/8079cbe6-d8ac-4f80-9f36-84d13cf7ac7f.jpg"
        ]
      },
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
      { 
        name: "Устав",
        images: [
          "https://cdn.poehali.dev/files/97bb7376-aa2b-4619-99c7-6475ce40883c.jpg",
          "https://cdn.poehali.dev/files/2c8e5ced-d2ba-45ec-8ebb-b6c514ba6375.jpg",
          "https://cdn.poehali.dev/files/98be8780-3c89-4eab-bc38-69acfe71149e.jpg",
          "https://cdn.poehali.dev/files/bc17d0c3-9f8d-45bd-bedb-34425796ad2a.jpg",
          "https://cdn.poehali.dev/files/a67d46b7-0093-4238-b6cd-fd31c5d91150.jpg",
          "https://cdn.poehali.dev/files/6556e73d-7946-42c5-94c9-9cadd4e9ad32.jpg",
          "https://cdn.poehali.dev/files/99ff706d-f365-4903-b521-b6d8769701cf.jpg",
          "https://cdn.poehali.dev/files/4ebfb078-07ea-4d62-bbc8-41085f5af230.jpg",
          "https://cdn.poehali.dev/files/87a4be3d-f126-40fc-8a05-ab71c6b7e9c6.jpg",
          "https://cdn.poehali.dev/files/19246810-8dc5-4927-aeba-84948b97aca7.jpg",
          "https://cdn.poehali.dev/files/fa4b140a-dce9-493c-a3c8-3d9d6fe45981.jpg",
          "https://cdn.poehali.dev/files/15fcd2d6-aec2-486c-a1c5-db966452121a.jpg",
          "https://cdn.poehali.dev/files/6c6a1654-61d7-4777-be9f-024eb82f34f7.jpg",
          "https://cdn.poehali.dev/files/df2226e5-d6fd-4228-a1b2-0f729b4a99de.jpg",
          "https://cdn.poehali.dev/files/6b0117cb-1e55-42f7-a4dd-54a9160b89f0.jpg"
        ]
      },
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
      { 
        name: "Устав",
        images: [
          "https://cdn.poehali.dev/files/7d8054c0-14b4-47ac-8060-90019cd7be3e.jpg",
          "https://cdn.poehali.dev/files/f0a2382e-4ba1-4af6-93d3-89de9c2a7204.jpg",
          "https://cdn.poehali.dev/files/9bd24024-7ff0-4fb6-9459-c3abb37d06bd.jpg",
          "https://cdn.poehali.dev/files/bef7a146-0cf6-4a19-b147-a87667c6a532.jpg",
          "https://cdn.poehali.dev/files/a77e8294-e90b-46f8-9ee3-631abe08f7da.jpg",
          "https://cdn.poehali.dev/files/de6cc228-5e82-4018-87a4-5d7d1c74e7b5.jpg",
          "https://cdn.poehali.dev/files/68955741-f514-4e5e-a72e-1537e2d5682e.jpg",
          "https://cdn.poehali.dev/files/3020cb7a-4232-49b6-9204-78d483c26c50.jpg",
          "https://cdn.poehali.dev/files/f0d02fa0-bed1-495e-959a-cd6aa5162844.jpg",
          "https://cdn.poehali.dev/files/87226d26-aa3c-4948-bf44-c72b93bd1e67.jpg",
          "https://cdn.poehali.dev/files/943419e3-0d65-4afc-817a-3ef821d576aa.jpg",
          "https://cdn.poehali.dev/files/7efedf6b-7502-4df2-8dbf-f6ce8f584ce1.jpg",
          "https://cdn.poehali.dev/files/8445cb85-65db-4238-952a-75ae416f6a91.jpg",
          "https://cdn.poehali.dev/files/dbf4ed26-e176-4728-9d7e-7882bab354e4.jpg",
          "https://cdn.poehali.dev/files/49a5183d-1182-458d-8c27-e574c2101d82.jpg"
        ]
      },
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
      { 
        name: "Устав",
        images: [
          "https://cdn.poehali.dev/files/5784c2fc-6cb7-44c6-9727-e3116b77e973.jpg",
          "https://cdn.poehali.dev/files/21a8a5fd-3f9d-4046-96ae-f6cc7b88b04f.jpg",
          "https://cdn.poehali.dev/files/fcb23550-8c9c-4bd6-b8db-72c59d717b25.jpg",
          "https://cdn.poehali.dev/files/b388b034-c820-44d9-9916-3eddf2ae8f20.jpg",
          "https://cdn.poehali.dev/files/310d9d8b-faf5-4d1a-b290-d82798e550f7.jpg",
          "https://cdn.poehali.dev/files/c887fd3e-5b47-4d72-a168-4684a4e26458.jpg",
          "https://cdn.poehali.dev/files/24a0a5a5-06f4-4907-bc3d-33086927a184.jpg",
          "https://cdn.poehali.dev/files/1b0564fa-e639-434e-ba70-8c755b0fd51b.jpg",
          "https://cdn.poehali.dev/files/b472834e-6319-40f7-a8ee-154ff173d553.jpg",
          "https://cdn.poehali.dev/files/5eb75927-e78c-4822-ba51-6af105a02737.jpg",
          "https://cdn.poehali.dev/files/9dce71a1-4860-4d32-8e1a-538095238820.jpg",
          "https://cdn.poehali.dev/files/bbe37104-c34c-4245-9558-f43ef4b427ab.jpg",
          "https://cdn.poehali.dev/files/15e6b89c-ede5-47b8-9406-666bed8fe73c.jpg",
          "https://cdn.poehali.dev/files/e659ce1f-ea67-497b-925a-29f70f6127f4.jpg",
          "https://cdn.poehali.dev/files/9ad40f58-b6ae-4349-bb13-12676516d98f.jpg"
        ]
      },
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
      { 
        name: "Устав",
        images: [
          "https://cdn.poehali.dev/files/50eb45e4-2bd7-43a4-bc73-7b854e16be72.jpg",
          "https://cdn.poehali.dev/files/45e37c8f-e3c6-44f1-9606-2d4b23d69675.jpg",
          "https://cdn.poehali.dev/files/09fd0904-a6e5-40a5-aceb-e0f2619ab130.jpg",
          "https://cdn.poehali.dev/files/9e3e1bb0-dd4d-4671-836d-f17435d10331.jpg",
          "https://cdn.poehali.dev/files/ed880950-793a-4130-bb3c-25c9dfcf2b9f.jpg",
          "https://cdn.poehali.dev/files/32847eb0-bef5-4506-ae53-764fedf79d72.jpg",
          "https://cdn.poehali.dev/files/a1fa0802-5868-4cfb-88b5-074a7e0f4361.jpg",
          "https://cdn.poehali.dev/files/6b5c0651-0bf1-4c92-bc65-5e88cb855144.jpg",
          "https://cdn.poehali.dev/files/621522fe-5197-4ace-a780-8e72b7a1c032.jpg",
          "https://cdn.poehali.dev/files/162cd38f-05e2-4a2d-b4e0-7b6d05545f35.jpg",
          "https://cdn.poehali.dev/files/916ec40c-87eb-40af-8b51-78eafa600efc.jpg",
          "https://cdn.poehali.dev/files/115100ad-f070-48fd-a64e-6ddda710df46.jpg",
          "https://cdn.poehali.dev/files/9f88a2b1-de75-4289-93ab-7220495a5461.jpg",
          "https://cdn.poehali.dev/files/33b6541a-17b8-4037-9c15-dd230421bc97.jpg",
          "https://cdn.poehali.dev/files/f8c57814-54da-4601-a139-fd9e635a229d.jpg"
        ]
      },
      { name: "Лицензия" },
      { name: "Свидетельство о регистрации" },
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
    engineer: "Шадян Сергей Валентинович",
    engineerSchedule: "вт. 17:00-19:00, чт. 10:00-12:00",
    inn: "7804680253",
    kpp: "780401001",
    ogrn: "1217800026531",
    legalAddress: "195197, г. Санкт-Петербург, ул. Минеральная, д.13, лит. А, пом. 47-Н, оф. 13",
    receptionAddress: "195197, г. Санкт-Петербург, ул. Васенко, д. 12, лит. А, офис 21-Н",
    phone: "8 (812) 640-88-26 (доб. 1086)",
    email: "uk.bsd@mail.ru",
    documents: [
      { 
        name: "Устав",
        images: [
          "https://cdn.poehali.dev/files/1850188f-f4e2-4346-98f9-8707e9db36d7.jpg",
          "https://cdn.poehali.dev/files/46987618-3c92-47aa-9c2a-6d25b2304d27.jpg",
          "https://cdn.poehali.dev/files/a804b8fe-8034-41c3-8259-1057883fe2c4.jpg",
          "https://cdn.poehali.dev/files/0636c233-b7ef-4297-b09e-6cf24727011b.jpg",
          "https://cdn.poehali.dev/files/26428fa2-2f2c-48fa-bbc5-690fbfe4b67e.jpg",
          "https://cdn.poehali.dev/files/dc4291bf-bbe9-4b82-b513-054383c4613c.jpg",
          "https://cdn.poehali.dev/files/1f918fd8-895b-44a5-ad12-2201d68508b5.jpg",
          "https://cdn.poehali.dev/files/8c69c65e-befc-44b8-a7db-d1ef5142b89f.jpg",
          "https://cdn.poehali.dev/files/023d16df-e6e8-4f61-b77b-f9547d3e0e1b.jpg",
          "https://cdn.poehali.dev/files/30e81aa5-2348-4eaf-9b0d-028a748b0e71.jpg",
          "https://cdn.poehali.dev/files/7e8bb447-2194-4ae0-9e82-fb0eff4025fd.jpg",
          "https://cdn.poehali.dev/files/cc041efb-5b63-446f-872d-061cd7d5e372.jpg",
          "https://cdn.poehali.dev/files/188f34de-8da4-4c0f-8ca1-f9b553018e40.jpg",
          "https://cdn.poehali.dev/files/f1a9d781-6f06-43f7-b18e-e6923a6be482.jpg",
          "https://cdn.poehali.dev/files/5fe9de59-6a5f-4872-96a7-f496e664be1b.jpg",
          "https://cdn.poehali.dev/files/71588f1b-b5f7-4307-b593-6459cb66f1fa.jpg",
          "https://cdn.poehali.dev/files/432e41a1-1898-441c-8fde-3d31215551cc.jpg",
          "https://cdn.poehali.dev/files/0485fb57-eebf-48ab-a039-3e00b84fb982.jpg"
        ]
      },
      { name: "Лицензия" },
      { name: "Свидетельство о регистрации" },
    ]
  },
};

const CompanyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const company = id ? companiesData[id] : null;
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<{ name: string; images: string[] } | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openDocument = (doc: { name: string; url?: string; images?: string[] }) => {
    if (doc.images && doc.images.length > 0) {
      setSelectedDocument({ name: doc.name, images: doc.images });
      setCurrentImageIndex(0);
      setDialogOpen(true);
    } else if (doc.url && doc.url !== "#") {
      window.open(doc.url, "_blank");
    }
  };

  const nextImage = () => {
    if (selectedDocument && currentImageIndex < selectedDocument.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

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
                      {!doc.url && !doc.images ? (
                        <span className="flex items-center gap-2 text-muted-foreground">
                          <Icon name="FileText" size={16} />
                          {doc.name}
                        </span>
                      ) : (
                        <button
                          onClick={() => openDocument(doc)}
                          className="flex items-center gap-2 text-primary hover:underline"
                        >
                          <Icon name="Eye" size={16} />
                          {doc.name}
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedDocument?.name}</DialogTitle>
          </DialogHeader>
          {selectedDocument && (
            <div className="space-y-4">
              <div className="relative">
                <img
                  src={selectedDocument.images[currentImageIndex]}
                  alt={`${selectedDocument.name} - страница ${currentImageIndex + 1}`}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="flex items-center justify-between">
                <Button
                  onClick={prevImage}
                  disabled={currentImageIndex === 0}
                  variant="outline"
                  size="sm"
                >
                  <Icon name="ChevronLeft" size={20} />
                  Назад
                </Button>
                <span className="text-sm text-muted-foreground">
                  Страница {currentImageIndex + 1} из {selectedDocument.images.length}
                </span>
                <Button
                  onClick={nextImage}
                  disabled={currentImageIndex === selectedDocument.images.length - 1}
                  variant="outline"
                  size="sm"
                >
                  Вперёд
                  <Icon name="ChevronRight" size={20} />
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default CompanyDetail;