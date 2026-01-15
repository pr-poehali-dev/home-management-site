-- Добавление поля video_url в таблицу news
ALTER TABLE news ADD COLUMN IF NOT EXISTS video_url TEXT;