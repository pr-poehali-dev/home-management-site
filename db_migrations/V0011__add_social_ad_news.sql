-- Добавление новости про социальную рекламу проекта "Береги фасад"
INSERT INTO news (id, title, content, tag, published_date, image_url) 
VALUES (
  996, 
  'Береги фасад!', 
  'Социальная реклама. Проект «Береги фасад». Заказчик: Ассоциация «ЦКТ». Свой "фасад" бережешь, а на здания плевать?', 
  'Обо всём', 
  '2026-02-04',
  'https://cdn.poehali.dev/projects/fe9589b6-f411-4b39-b21e-3be97169a177/bucket/aa7e802c-afdc-4b1d-80e2-ef730c8ff3c8.jpg'
)
ON CONFLICT (id) DO NOTHING;