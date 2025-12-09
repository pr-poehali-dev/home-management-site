-- Создание таблицы для хранения загруженных изображений домов
CREATE TABLE IF NOT EXISTS houses (
    id TEXT PRIMARY KEY,
    image TEXT,
    manager_photo TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание индекса для быстрого поиска
CREATE INDEX IF NOT EXISTS idx_houses_id ON houses(id);

COMMENT ON TABLE houses IS 'Хранит загруженные пользователем изображения домов и управляющих';
COMMENT ON COLUMN houses.id IS 'ID дома из housesData.ts';
COMMENT ON COLUMN houses.image IS 'URL фотографии дома';
COMMENT ON COLUMN houses.manager_photo IS 'URL фотографии управляющего';
