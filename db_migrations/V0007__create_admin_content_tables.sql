-- Таблица для хранения контента страниц
CREATE TABLE IF NOT EXISTS site_content (
    id SERIAL PRIMARY KEY,
    content_key VARCHAR(100) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    section VARCHAR(100) NOT NULL,
    content_type VARCHAR(50) DEFAULT 'text',
    content TEXT NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица для хранения изображений
CREATE TABLE IF NOT EXISTS site_images (
    id SERIAL PRIMARY KEY,
    image_key VARCHAR(100) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    url TEXT NOT NULL,
    file_size INTEGER,
    mime_type VARCHAR(100),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица для хранения настроек сайта
CREATE TABLE IF NOT EXISTS site_settings (
    id SERIAL PRIMARY KEY,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT NOT NULL,
    description TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Вставляем начальный контент
INSERT INTO site_content (content_key, title, section, content_type, content) VALUES
('home_hero_title', 'Главная - Заголовок', 'Главная страница', 'text', 'Живите комфортно, остальное — наша забота.'),
('home_hero_description', 'Главная - Описание', 'Главная страница', 'text', 'Мы — команда профессионалов в управлении жилой недвижимостью. Обслуживаем более 50 многоквартирных домов, обеспечивая комфорт и безопасность на 1 млн м² площади. Позвольте нам позаботиться о Вашем доме!'),
('about_title', 'О компании - Заголовок', 'О компании', 'text', 'О нашей компании'),
('running_line_text', 'Бегущая строка', 'Настройки', 'text', 'Дорогие друзья! 2025 год для нас стал особенным, мы стали совсем взрослыми, нам исполнилось 18 лет! В связи с чем пришло время перемен, так что давайте знакомиться заново.')
ON CONFLICT (content_key) DO NOTHING;

-- Вставляем начальные изображения
INSERT INTO site_images (image_key, title, location, url) VALUES
('logo_main', 'Логотип НАШ ДОМ', 'Шапка сайта', 'https://cdn.poehali.dev/files/14eb97fa-77bb-472e-96a3-29f6ef0a52a8.jpg'),
('background_main', 'Фон главной страницы', 'Главная страница', 'https://cdn.poehali.dev/files/00e99c93-741c-4c4e-85a4-24bcf90a731c.png')
ON CONFLICT (image_key) DO NOTHING;

CREATE INDEX IF NOT EXISTS idx_site_content_key ON site_content(content_key);
CREATE INDEX IF NOT EXISTS idx_site_images_key ON site_images(image_key);
CREATE INDEX IF NOT EXISTS idx_site_settings_key ON site_settings(setting_key);
