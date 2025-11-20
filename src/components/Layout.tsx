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
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Building2" className="text-primary-foreground" size={28} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">НАШ ДОМ</h1>
                <p className="text-xs text-muted-foreground">Группа управляющих компаний</p>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    location.pathname === link.path
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-3">
              <a href="tel:+78126408826">
                <Button>
                  <Icon name="Phone" size={16} className="mr-2" />
                  +7 (812) 640-88-26
                </Button>
              </a>
            </div>

            <Sheet>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="outline" size="icon">
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
                  <a href="tel:+78126408826" className="mt-4">
                    <Button className="w-full">
                      <Icon name="Phone" size={16} className="mr-2" />
                      +7 (812) 640-88-26
                    </Button>
                  </a>
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