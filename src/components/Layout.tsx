import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();

  const navLinks = [
    { path: "/", label: "Главная" },
    { path: "/about", label: "О компании" },
    { path: "/houses", label: "Дома" },
    { path: "/news", label: "Новости" },
    { path: "/services", label: "Услуги" },
    { path: "/documents", label: "Документы" },
    { path: "/for-residents", label: "Для жильцов" },
    { path: "/contacts", label: "Контакты" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b sticky top-0 bg-gradient-sapphire backdrop-blur z-50 shadow-sapphire">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <Icon name="Building2" className="text-white" size={28} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">НАШ ДОМ</h1>
                <p className="text-xs text-white/80">Группа управляющих компаний</p>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    location.pathname === link.path
                      ? "bg-white/20 text-white backdrop-blur-sm"
                      : "text-white/90 hover:bg-white/10"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-3">
              <a href="https://t.me/your_channel" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                  <Icon name="Send" size={20} />
                </Button>
              </a>
              <a href="https://vk.com/your_group" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14c5.6 0 6.93-1.33 6.93-6.93V8.93C22 3.33 20.67 2 15.07 2zm3.45 14.98h-1.4c-.56 0-.73-.45-1.73-1.47-.88-.88-1.27-1-1.49-1-.31 0-.4.09-.4.52v1.34c0 .36-.11.58-1.07.58-1.59 0-3.35-.97-4.59-2.77-1.87-2.66-2.38-4.64-2.38-5.04 0-.22.09-.43.52-.43h1.4c.39 0 .53.18.68.59.76 2.2 2.03 4.13 2.56 4.13.2 0 .29-.09.29-.58v-2.25c-.06-1.01-.59-1.1-.59-1.46 0-.18.15-.36.38-.36h2.2c.33 0 .44.18.44.56v3.04c0 .33.15.44.24.44.2 0 .36-.11.73-.48 1.14-1.28 1.95-3.26 1.95-3.26.11-.23.29-.43.68-.43h1.4c.47 0 .57.24.47.56-.18.81-1.97 3.42-1.97 3.42-.17.27-.23.39 0 .69.17.23.73.72 1.1 1.15.68.8 1.21 1.47 1.35 1.93.14.47-.07.71-.54.71z"/>
                  </svg>
                </Button>
              </a>
              <a href="https://disk.yandex.ru/d/your_link" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                  <Icon name="HardDrive" size={20} />
                </Button>
              </a>
            </div>

            <Sheet>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="outline" size="icon" className="text-white border-white/30 hover:bg-white/10">
                  <Icon name="Menu" size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <div className="flex flex-col gap-4 mt-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`px-4 py-3 text-base font-medium rounded-md transition-colors ${
                        location.pathname === link.path
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="flex gap-3 mt-4 justify-center">
                    <a href="https://t.me/your_channel" target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="icon">
                        <Icon name="Send" size={20} />
                      </Button>
                    </a>
                    <a href="https://vk.com/your_group" target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="icon">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14c5.6 0 6.93-1.33 6.93-6.93V8.93C22 3.33 20.67 2 15.07 2zm3.45 14.98h-1.4c-.56 0-.73-.45-1.73-1.47-.88-.88-1.27-1-1.49-1-.31 0-.4.09-.4.52v1.34c0 .36-.11.58-1.07.58-1.59 0-3.35-.97-4.59-2.77-1.87-2.66-2.38-4.64-2.38-5.04 0-.22.09-.43.52-.43h1.4c.39 0 .53.18.68.59.76 2.2 2.03 4.13 2.56 4.13.2 0 .29-.09.29-.58v-2.25c-.06-1.01-.59-1.1-.59-1.46 0-.18.15-.36.38-.36h2.2c.33 0 .44.18.44.56v3.04c0 .33.15.44.24.44.2 0 .36-.11.73-.48 1.14-1.28 1.95-3.26 1.95-3.26.11-.23.29-.43.68-.43h1.4c.47 0 .57.24.47.56-.18.81-1.97 3.42-1.97 3.42-.17.27-.23.39 0 .69.17.23.73.72 1.1 1.15.68.8 1.21 1.47 1.35 1.93.14.47-.07.71-.54.71z"/>
                        </svg>
                      </Button>
                    </a>
                    <a href="https://disk.yandex.ru/d/your_link" target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="icon">
                        <Icon name="HardDrive" size={20} />
                      </Button>
                    </a>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <div className="fixed bottom-6 right-6 z-40">
        <a href="tel:+78126408826">
          <Button
            size="lg"
            className="shadow-lg hover:shadow-xl transition-all bg-destructive hover:bg-destructive/90 text-destructive-foreground"
          >
            <Icon name="PhoneCall" size={20} className="mr-2 animate-pulse" />
            <div className="flex flex-col items-start">
              <span className="text-xs font-normal">Срочная связь</span>
              <span className="text-sm font-bold">+7 (812) 640-88-26</span>
            </div>
          </Button>
        </a>
      </div>

      <footer className="bg-foreground text-background py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-background/10 rounded-lg flex items-center justify-center">
                  <Icon name="Building2" className="text-background" size={24} />
                </div>
                <div>
                  <h3 className="font-bold">НАШ ДОМ</h3>
                  <p className="text-sm opacity-75">Группа УК</p>
                </div>
              </div>
              <p className="text-sm opacity-75">
                Профессиональное управление жилой недвижимостью с 2007 года
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <div className="space-y-2 text-sm opacity-75">
                <div className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  <a href="tel:+78126408826" className="hover:opacity-100">
                    +7 (812) 640-88-26
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  <a href="mailto:uk.nashdom@inbox.ru" className="hover:opacity-100">
                    uk.nashdom@inbox.ru
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  <a href="mailto:uk.nash-dom@mail.ru" className="hover:opacity-100">
                    uk.nash-dom@mail.ru
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Быстрые ссылки</h4>
              <nav className="space-y-2 text-sm opacity-75">
                {navLinks.map((link) => (
                  <Link key={link.path} to={link.path} className="block hover:opacity-100">
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          <div className="border-t border-background/10 pt-8 text-center text-sm opacity-75">
            <p>
              © {new Date().getFullYear()} Группа управляющих компаний «НАШ ДОМ». Все права
              защищены.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;