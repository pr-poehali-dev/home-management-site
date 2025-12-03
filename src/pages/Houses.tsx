import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Icon from "@/components/ui/icon";
import { houses, type HouseData } from "@/data/housesData";

const Houses = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [cityFilter, setCityFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const cities = ["all", ...Array.from(new Set(houses.map((h) => h.city)))];
  const types = ["all", ...Array.from(new Set(houses.map((h) => h.type)))];

  const filteredHouses = houses.filter((house) => {
    const matchesSearch =
      house.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      house.manager.toLowerCase().includes(searchQuery.toLowerCase()) ||
      house.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCity = cityFilter === "all" || house.city === cityFilter;
    const matchesType = typeFilter === "all" || house.type === typeFilter;
    return matchesSearch && matchesCity && matchesType;
  });

  const handleCardClick = (houseId: string) => {
    navigate(`/houses/${houseId}`);
  };

  return (
    <Layout>
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: 'url(https://cdn.poehali.dev/files/486f5d46-9475-45e5-9b2d-51eddd29866e.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundAttachment: 'fixed',
          filter: 'brightness(1.3) contrast(1.1)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/30 to-black/40"></div>
      </div>
      <section className="relative py-16 md:py-20 z-10">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-sapphire">
              Наши дома
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Найдите информацию о вашем доме и управляющем
            </p>
          </div>

          <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Icon
                name="Search"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                size={20}
              />
              <Input
                type="text"
                placeholder="Поиск по адресу, управляющему..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={cityFilter} onValueChange={setCityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите город" />
              </SelectTrigger>
              <SelectContent>
                {cities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city === "all" ? "Все города" : city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Тип объекта" />
              </SelectTrigger>
              <SelectContent>
                {types.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type === "all" ? "Все типы" : type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {filteredHouses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHouses.map((house) => (
                <Card
                  key={house.id}
                  className="hover:shadow-lg transition-all cursor-pointer bg-card/50 backdrop-blur-sm border-border/50"
                  onClick={() => handleCardClick(house.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2 text-foreground">
                          {house.address}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-1">
                          <Icon
                            name="MapPin"
                            className="inline mr-1"
                            size={14}
                          />
                          {house.city}
                        </p>
                        <p className="text-xs text-accent mb-3">{house.type}</p>
                      </div>
                    </div>

                    <div className="space-y-2 border-t border-border/50 pt-4">
                      <div className="flex items-start">
                        <Icon
                          name="User"
                          className="mr-2 mt-1 text-primary flex-shrink-0"
                          size={16}
                        />
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {house.manager}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <Icon
                          name="Phone"
                          className="mr-2 text-primary flex-shrink-0"
                          size={16}
                        />
                        <a
                          href={`tel:${house.managerPhone}`}
                          className="text-sm text-foreground hover:text-primary transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {house.managerPhone}
                        </a>
                      </div>

                      <div className="flex items-center">
                        <Icon
                          name="Mail"
                          className="mr-2 text-primary flex-shrink-0"
                          size={16}
                        />
                        <a
                          href={`mailto:${house.managerEmail}`}
                          className="text-sm text-foreground hover:text-primary transition-colors break-all"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {house.managerEmail}
                        </a>
                      </div>

                      <div className="flex items-start">
                        <Icon
                          name="Clock"
                          className="mr-2 mt-1 text-primary flex-shrink-0"
                          size={16}
                        />
                        <p className="text-sm text-muted-foreground">
                          {house.receptionSchedule}
                        </p>
                      </div>

                      <div className="flex items-start pt-2">
                        <Icon
                          name="Building"
                          className="mr-2 mt-1 text-primary flex-shrink-0"
                          size={16}
                        />
                        <p className="text-xs text-muted-foreground">
                          {house.company}
                        </p>
                      </div>
                    </div>

                    <Button
                      variant="ghost"
                      className="w-full mt-4"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCardClick(house.id);
                      }}
                    >
                      Подробнее
                      <Icon name="ChevronRight" className="ml-2" size={16} />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Icon
                name="Search"
                className="mx-auto mb-4 text-muted-foreground"
                size={48}
              />
              <p className="text-lg text-muted-foreground">
                По вашему запросу ничего не найдено
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Попробуйте изменить параметры поиска
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Houses;