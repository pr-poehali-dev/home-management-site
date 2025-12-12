import { useState, useEffect } from 'react';

interface SiteContent {
  [key: string]: string;
}

export const useSiteContent = () => {
  const [content, setContent] = useState<SiteContent>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const response = await fetch("https://functions.poehali.dev/90a8d990-f013-4431-8797-2a81c74d64cc");
        const data = await response.json();
        
        const contentMap: SiteContent = {};
        data.content?.forEach((item: any) => {
          contentMap[item.id] = item.content;
        });
        
        setContent(contentMap);
      } catch (error) {
        console.error("Ошибка загрузки контента:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, []);

  const getContent = (key: string, fallback: string = '') => {
    return content[key] || fallback;
  };

  return { content, getContent, isLoading };
};
