import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Icon from "@/components/ui/icon";
import { Alert, AlertDescription } from "@/components/ui/alert";

const containerTypes = [
  { id: "20ft", name: "20' стандартный", length: 5.9, width: 2.35, height: 2.39, capacity: 33.2, maxWeight: 21700, category: "Стандартные" },
  { id: "40ft", name: "40' стандартный", length: 12.03, width: 2.35, height: 2.39, capacity: 67.7, maxWeight: 26680, category: "Стандартные" },
  { id: "40hc", name: "40' High Cube", length: 12.03, width: 2.35, height: 2.69, capacity: 76.4, maxWeight: 26680, category: "Стандартные" },
  { id: "45hc", name: "45' High Cube", length: 13.55, width: 2.35, height: 2.69, capacity: 86, maxWeight: 27700, category: "Стандартные" },
  { id: "20rf", name: "20' рефрижератор", length: 5.44, width: 2.29, height: 2.27, capacity: 28.3, maxWeight: 27400, category: "Рефрижераторы" },
  { id: "40rf", name: "40' рефрижератор", length: 11.56, width: 2.29, height: 2.24, capacity: 59.3, maxWeight: 27700, category: "Рефрижераторы" },
  { id: "20ot", name: "20' Open Top", length: 5.89, width: 2.35, height: 2.35, capacity: 32.5, maxWeight: 28180, category: "Специальные" },
  { id: "40ot", name: "40' Open Top", length: 12.03, width: 2.35, height: 2.35, capacity: 66.5, maxWeight: 30480, category: "Специальные" },
  { id: "20fr", name: "20' Flat Rack", length: 5.94, width: 2.35, height: 2.35, capacity: 32.8, maxWeight: 28100, category: "Специальные" },
  { id: "40fr", name: "40' Flat Rack", length: 12.08, width: 2.35, height: 2.13, capacity: 60.5, maxWeight: 40000, category: "Специальные" },
  { id: "20tank", name: "20' танк-контейнер", length: 6.06, width: 2.44, height: 2.59, capacity: 38.3, maxWeight: 30480, category: "Специальные" },
  { id: "truck5", name: "Фура 5т", length: 6.0, width: 2.4, height: 2.4, capacity: 34.5, maxWeight: 5000, category: "Автофуры" },
  { id: "truck10", name: "Фура 10т", length: 8.0, width: 2.45, height: 2.5, capacity: 49, maxWeight: 10000, category: "Автофуры" },
  { id: "truck20", name: "Фура 20т", length: 13.6, width: 2.45, height: 2.7, capacity: 90, maxWeight: 20000, category: "Автофуры" },
];

const cargoUnits = [
  { id: "europallet", name: "Европаллет (EUR)", length: 1.2, width: 0.8, height: 0.15, weight: 25 },
  { id: "pallet", name: "Американский паллет (120x100)", length: 1.2, width: 1.0, height: 0.15, weight: 30 },
  { id: "finnpallet", name: "Финский паллет (120x100)", length: 1.2, width: 1.0, height: 0.15, weight: 28 },
  { id: "box", name: "Коробка стандартная", length: 0.6, width: 0.4, height: 0.4, weight: 15 },
  { id: "bigbox", name: "Крупногабаритная коробка", length: 1.0, width: 0.8, height: 0.8, weight: 50 },
  { id: "drum", name: "Бочка 200л", length: 0.6, width: 0.6, height: 0.9, weight: 220 },
  { id: "bag", name: "Мешок биг-бэг", length: 1.1, width: 1.1, height: 1.8, weight: 1000 },
  { id: "custom", name: "Свой размер", length: 0, width: 0, height: 0, weight: 0 },
];

interface CargoItem {
  id: string;
  unitType: typeof cargoUnits[0];
  length: number;
  width: number;
  height: number;
  weight: number;
  quantity: number;
}

const Index = () => {
  const [selectedContainer, setSelectedContainer] = useState(containerTypes[0]);
  const [cargoItems, setCargoItems] = useState<CargoItem[]>([
    {
      id: "1",
      unitType: cargoUnits[0],
      length: cargoUnits[0].length,
      width: cargoUnits[0].width,
      height: cargoUnits[0].height,
      weight: cargoUnits[0].weight,
      quantity: 1,
    },
  ]);
  const [calculated, setCalculated] = useState(false);

  const addCargoItem = () => {
    setCargoItems([
      ...cargoItems,
      {
        id: Date.now().toString(),
        unitType: cargoUnits[0],
        length: cargoUnits[0].length,
        width: cargoUnits[0].width,
        height: cargoUnits[0].height,
        weight: cargoUnits[0].weight,
        quantity: 1,
      },
    ]);
  };

  const removeCargoItem = (id: string) => {
    if (cargoItems.length > 1) {
      setCargoItems(cargoItems.filter((item) => item.id !== id));
    }
  };

  const updateCargoItem = (id: string, updates: Partial<CargoItem>) => {
    setCargoItems(
      cargoItems.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const calculate = () => {
    setCalculated(true);
  };

  const totalVolume = cargoItems.reduce(
    (sum, item) => sum + item.length * item.width * item.height * item.quantity,
    0
  );
  const totalWeight = cargoItems.reduce((sum, item) => sum + item.weight * item.quantity, 0);
  const usedVolume = (totalVolume / selectedContainer.capacity) * 100;
  const usedWeight = (totalWeight / selectedContainer.maxWeight) * 100;

  const calculateMaxUnits = (item: CargoItem) => {
    const maxLength = Math.floor(selectedContainer.length / item.length);
    const maxWidth = Math.floor(selectedContainer.width / item.width);
    const maxHeight = Math.floor(selectedContainer.height / item.height);
    const maxByVolume = maxLength * maxWidth * maxHeight;
    const maxByWeight = Math.floor(selectedContainer.maxWeight / item.weight);
    return Math.min(maxByVolume, maxByWeight);
  };

  const containerCategories = Array.from(new Set(containerTypes.map((c) => c.category)));

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a3a5c] via-[#2d5a7a] to-[#1a3a5c]">
      <header className="bg-[#1a3a5c] border-b border-[#3a8dd8]/30 sticky top-0 z-50 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon name="Container" size={32} className="text-[#3a8dd8]" />
            <div>
              <h1 className="text-2xl font-bold text-white">РУСМАРИН</h1>
              <p className="text-xs text-[#3a8dd8]">Калькулятор размещения груза</p>
            </div>
          </div>
          <div className="flex items-center gap-6 text-sm text-white/90">
            <div className="flex items-center gap-2">
              <Icon name="Phone" size={18} className="text-[#3a8dd8]" />
              <span>8 (800) 550-81-65</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Mail" size={18} className="text-[#3a8dd8]" />
              <span>rgsite@rusmarine.ru</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="calculator" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8 bg-[#1a3a5c]/50 p-1">
            <TabsTrigger value="calculator" className="data-[state=active]:bg-[#3a8dd8]">
              <Icon name="Calculator" size={18} className="mr-2" />
              Калькулятор
            </TabsTrigger>
            <TabsTrigger value="containers" className="data-[state=active]:bg-[#3a8dd8]">
              <Icon name="Container" size={18} className="mr-2" />
              Контейнеры
            </TabsTrigger>
            <TabsTrigger value="cargo" className="data-[state=active]:bg-[#3a8dd8]">
              <Icon name="Package" size={18} className="mr-2" />
              Грузовые единицы
            </TabsTrigger>
            <TabsTrigger value="guide" className="data-[state=active]:bg-[#3a8dd8]">
              <Icon name="BookOpen" size={18} className="mr-2" />
              Инструкция
            </TabsTrigger>
            <TabsTrigger value="contact" className="data-[state=active]:bg-[#3a8dd8]">
              <Icon name="MessageCircle" size={18} className="mr-2" />
              Контакты
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calculator" className="space-y-6 animate-fade-in">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card className="bg-white/95 backdrop-blur">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-[#1a3a5c]">
                      <Icon name="Settings" size={24} className="text-[#3a8dd8]" />
                      Параметры расчета
                    </CardTitle>
                    <CardDescription>Выберите тип контейнера и параметры груза</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label className="text-[#1a3a5c] font-medium">Тип транспортного средства</Label>
                      <Select
                        value={selectedContainer.id}
                        onValueChange={(value) => {
                          const container = containerTypes.find((c) => c.id === value);
                          if (container) setSelectedContainer(container);
                        }}
                      >
                        <SelectTrigger className="bg-white border-[#3a8dd8]/30">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {containerCategories.map((category) => (
                            <div key={category}>
                              <div className="px-2 py-1.5 text-sm font-semibold text-[#1a3a5c]">{category}</div>
                              {containerTypes
                                .filter((c) => c.category === category)
                                .map((container) => (
                                  <SelectItem key={container.id} value={container.id}>
                                    {container.name}
                                  </SelectItem>
                                ))}
                            </div>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="p-4 bg-[#3a8dd8]/10 rounded-lg space-y-2">
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-[#1a3a5c]/60 text-xs">Длина</p>
                          <p className="font-semibold text-[#1a3a5c]">{selectedContainer.length} м</p>
                        </div>
                        <div>
                          <p className="text-[#1a3a5c]/60 text-xs">Ширина</p>
                          <p className="font-semibold text-[#1a3a5c]">{selectedContainer.width} м</p>
                        </div>
                        <div>
                          <p className="text-[#1a3a5c]/60 text-xs">Высота</p>
                          <p className="font-semibold text-[#1a3a5c]">{selectedContainer.height} м</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm pt-2 border-t border-[#3a8dd8]/20">
                        <div>
                          <p className="text-[#1a3a5c]/60 text-xs">Объем</p>
                          <p className="font-semibold text-[#1a3a5c]">{selectedContainer.capacity} м³</p>
                        </div>
                        <div>
                          <p className="text-[#1a3a5c]/60 text-xs">Макс. вес</p>
                          <p className="font-semibold text-[#1a3a5c]">{selectedContainer.maxWeight} кг</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/95 backdrop-blur">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2 text-[#1a3a5c]">
                          <Icon name="Package" size={24} className="text-[#3a8dd8]" />
                          Грузовые единицы
                        </CardTitle>
                        <CardDescription>Добавьте различные типы груза</CardDescription>
                      </div>
                      <Button
                        onClick={addCargoItem}
                        size="sm"
                        className="bg-[#2d7a1f] hover:bg-[#2d7a1f]/90"
                      >
                        <Icon name="Plus" size={18} className="mr-1" />
                        Добавить груз
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {cargoItems.map((item, index) => (
                      <Card key={item.id} className="border-2 border-[#3a8dd8]/30">
                        <CardContent className="pt-6 space-y-4">
                          <div className="flex items-center justify-between">
                            <Label className="text-[#1a3a5c] font-medium">
                              Груз #{index + 1}
                            </Label>
                            {cargoItems.length > 1 && (
                              <Button
                                onClick={() => removeCargoItem(item.id)}
                                variant="ghost"
                                size="sm"
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <Icon name="Trash2" size={16} />
                              </Button>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label className="text-[#1a3a5c] text-sm">Тип грузовой единицы</Label>
                            <Select
                              value={item.unitType.id}
                              onValueChange={(value) => {
                                const unit = cargoUnits.find((u) => u.id === value);
                                if (unit) {
                                  updateCargoItem(item.id, {
                                    unitType: unit,
                                    length: unit.id !== "custom" ? unit.length : item.length,
                                    width: unit.id !== "custom" ? unit.width : item.width,
                                    height: unit.id !== "custom" ? unit.height : item.height,
                                    weight: unit.id !== "custom" ? unit.weight : item.weight,
                                  });
                                }
                              }}
                            >
                              <SelectTrigger className="bg-white border-[#3a8dd8]/30">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {cargoUnits.map((unit) => (
                                  <SelectItem key={unit.id} value={unit.id}>
                                    {unit.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="grid grid-cols-4 gap-3">
                            <div className="space-y-2">
                              <Label className="text-[#1a3a5c] text-xs">Длина (м)</Label>
                              <Input
                                type="number"
                                step="0.1"
                                value={item.length}
                                onChange={(e) =>
                                  updateCargoItem(item.id, { length: parseFloat(e.target.value) || 0 })
                                }
                                className="bg-white border-[#3a8dd8]/30 h-9"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-[#1a3a5c] text-xs">Ширина (м)</Label>
                              <Input
                                type="number"
                                step="0.1"
                                value={item.width}
                                onChange={(e) =>
                                  updateCargoItem(item.id, { width: parseFloat(e.target.value) || 0 })
                                }
                                className="bg-white border-[#3a8dd8]/30 h-9"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-[#1a3a5c] text-xs">Высота (м)</Label>
                              <Input
                                type="number"
                                step="0.1"
                                value={item.height}
                                onChange={(e) =>
                                  updateCargoItem(item.id, { height: parseFloat(e.target.value) || 0 })
                                }
                                className="bg-white border-[#3a8dd8]/30 h-9"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-[#1a3a5c] text-xs">Вес (кг)</Label>
                              <Input
                                type="number"
                                value={item.weight}
                                onChange={(e) =>
                                  updateCargoItem(item.id, { weight: parseFloat(e.target.value) || 0 })
                                }
                                className="bg-white border-[#3a8dd8]/30 h-9"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label className="text-[#1a3a5c] text-sm">
                              Количество (макс: {calculateMaxUnits(item)})
                            </Label>
                            <Input
                              type="number"
                              value={item.quantity}
                              onChange={(e) =>
                                updateCargoItem(item.id, { quantity: parseInt(e.target.value) || 1 })
                              }
                              className="bg-white border-[#3a8dd8]/30"
                            />
                          </div>
                        </CardContent>
                      </Card>
                    ))}

                    <Button
                      onClick={calculate}
                      className="w-full bg-[#2d7a1f] hover:bg-[#2d7a1f]/90 text-white font-medium"
                      size="lg"
                    >
                      <Icon name="Calculator" size={20} className="mr-2" />
                      Рассчитать размещение
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="bg-white/95 backdrop-blur">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-[#1a3a5c]">
                      <Icon name="BarChart3" size={24} className="text-[#3a8dd8]" />
                      Результаты расчета
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {calculated ? (
                      <>
                        <div className="space-y-3">
                          <div className="p-4 bg-gradient-to-br from-[#3a8dd8] to-[#3a8dd8]/80 rounded-lg text-white">
                            <p className="text-xs opacity-90 mb-1">Общее количество</p>
                            <p className="text-3xl font-bold">
                              {cargoItems.reduce((sum, item) => sum + item.quantity, 0)}
                            </p>
                            <p className="text-xs opacity-90 mt-1">грузовых единиц</p>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div className="p-3 bg-[#3a8dd8]/10 rounded-lg text-center">
                              <p className="text-xs text-[#1a3a5c]/60 mb-1">Общий вес</p>
                              <p className="text-xl font-bold text-[#1a3a5c]">
                                {totalWeight.toFixed(0)}
                              </p>
                              <p className="text-xs text-[#1a3a5c]/60">кг</p>
                            </div>
                            <div className="p-3 bg-[#3a8dd8]/10 rounded-lg text-center">
                              <p className="text-xs text-[#1a3a5c]/60 mb-1">Общий объем</p>
                              <p className="text-xl font-bold text-[#1a3a5c]">
                                {totalVolume.toFixed(2)}
                              </p>
                              <p className="text-xs text-[#1a3a5c]/60">м³</p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm text-[#1a3a5c]/70 font-medium">
                                Использование объема
                              </span>
                              <span className="text-sm font-bold text-[#1a3a5c]">
                                {Math.min(usedVolume, 100).toFixed(1)}%
                              </span>
                            </div>
                            <div className="h-3 bg-[#3a8dd8]/20 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-[#3a8dd8] transition-all duration-500"
                                style={{ width: `${Math.min(usedVolume, 100)}%` }}
                              />
                            </div>
                          </div>

                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm text-[#1a3a5c]/70 font-medium">
                                Использование веса
                              </span>
                              <span className="text-sm font-bold text-[#1a3a5c]">
                                {Math.min(usedWeight, 100).toFixed(1)}%
                              </span>
                            </div>
                            <div className="h-3 bg-[#2d7a1f]/20 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-[#2d7a1f] transition-all duration-500"
                                style={{ width: `${Math.min(usedWeight, 100)}%` }}
                              />
                            </div>
                          </div>
                        </div>

                        {(usedVolume > 100 || usedWeight > 100) && (
                          <Alert className="bg-red-50 border-red-200">
                            <Icon name="AlertTriangle" size={18} className="text-red-600" />
                            <AlertDescription className="text-red-800">
                              {usedVolume > 100 && "Превышен максимальный объем контейнера! "}
                              {usedWeight > 100 && "Превышена максимальная грузоподъемность!"}
                            </AlertDescription>
                          </Alert>
                        )}
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <Icon name="PackageSearch" size={64} className="text-[#3a8dd8]/30 mb-4" />
                        <p className="text-[#1a3a5c]/60">
                          Заполните параметры и нажмите "Рассчитать размещение"
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-[#3a8dd8] to-[#3a8dd8]/80 text-white">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Icon name="Info" size={24} className="flex-shrink-0 mt-1" />
                      <div className="space-y-2 text-sm">
                        <p className="font-medium">Важно учитывать:</p>
                        <ul className="space-y-1 opacity-90">
                          <li>• Расчет предполагает идеальную укладку груза</li>
                          <li>• На практике могут потребоваться зазоры и крепления</li>
                          <li>• Учитывайте распределение веса по площади пола</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="containers" className="animate-fade-in">
            <Card className="bg-white/95 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#1a3a5c]">
                  <Icon name="Container" size={24} className="text-[#3a8dd8]" />
                  Справочник типов контейнеров
                </CardTitle>
                <CardDescription>
                  Технические характеристики стандартных контейнеров и фур
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {containerCategories.map((category) => (
                  <div key={category}>
                    <h3 className="text-xl font-bold text-[#1a3a5c] mb-4">{category}</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {containerTypes
                        .filter((c) => c.category === category)
                        .map((container) => (
                          <Card
                            key={container.id}
                            className="border-2 border-[#3a8dd8]/30 hover:border-[#3a8dd8] transition-colors"
                          >
                            <CardHeader className="pb-3">
                              <CardTitle className="text-lg text-[#1a3a5c]">{container.name}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                              <div className="aspect-video bg-gradient-to-br from-[#3a8dd8]/20 to-[#1a3a5c]/20 rounded-lg flex items-center justify-center">
                                <Icon name="Container" size={64} className="text-[#3a8dd8]" />
                              </div>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-[#1a3a5c]/60">Длина:</span>
                                  <span className="font-semibold text-[#1a3a5c]">
                                    {container.length} м
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-[#1a3a5c]/60">Ширина:</span>
                                  <span className="font-semibold text-[#1a3a5c]">
                                    {container.width} м
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-[#1a3a5c]/60">Высота:</span>
                                  <span className="font-semibold text-[#1a3a5c]">
                                    {container.height} м
                                  </span>
                                </div>
                                <div className="flex justify-between pt-2 border-t border-[#3a8dd8]/20">
                                  <span className="text-[#1a3a5c]/60">Объем:</span>
                                  <span className="font-semibold text-[#3a8dd8]">
                                    {container.capacity} м³
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-[#1a3a5c]/60">Макс. вес:</span>
                                  <span className="font-semibold text-[#2d7a1f]">
                                    {container.maxWeight} кг
                                  </span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cargo" className="animate-fade-in">
            <Card className="bg-white/95 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#1a3a5c]">
                  <Icon name="Package" size={24} className="text-[#3a8dd8]" />
                  Типы грузовых единиц
                </CardTitle>
                <CardDescription>Стандартные размеры паллет и упаковок</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {cargoUnits
                    .filter((u) => u.id !== "custom")
                    .map((unit) => (
                      <Card key={unit.id} className="border-2 border-[#3a8dd8]/30">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg text-[#1a3a5c] flex items-center gap-2">
                            <Icon name="Package" size={20} className="text-[#3a8dd8]" />
                            {unit.name}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="text-center p-3 bg-[#3a8dd8]/10 rounded">
                              <p className="text-xs text-[#1a3a5c]/60 mb-1">Длина</p>
                              <p className="text-lg font-bold text-[#1a3a5c]">{unit.length}</p>
                              <p className="text-xs text-[#1a3a5c]/60">м</p>
                            </div>
                            <div className="text-center p-3 bg-[#3a8dd8]/10 rounded">
                              <p className="text-xs text-[#1a3a5c]/60 mb-1">Ширина</p>
                              <p className="text-lg font-bold text-[#1a3a5c]">{unit.width}</p>
                              <p className="text-xs text-[#1a3a5c]/60">м</p>
                            </div>
                            <div className="text-center p-3 bg-[#3a8dd8]/10 rounded">
                              <p className="text-xs text-[#1a3a5c]/60 mb-1">Высота</p>
                              <p className="text-lg font-bold text-[#1a3a5c]">{unit.height}</p>
                              <p className="text-xs text-[#1a3a5c]/60">м</p>
                            </div>
                            <div className="text-center p-3 bg-[#2d7a1f]/10 rounded">
                              <p className="text-xs text-[#1a3a5c]/60 mb-1">Вес</p>
                              <p className="text-lg font-bold text-[#1a3a5c]">{unit.weight}</p>
                              <p className="text-xs text-[#1a3a5c]/60">кг</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="guide" className="animate-fade-in">
            <Card className="bg-white/95 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#1a3a5c]">
                  <Icon name="BookOpen" size={24} className="text-[#3a8dd8]" />
                  Как пользоваться калькулятором
                </CardTitle>
                <CardDescription>Пошаговая инструкция для расчета размещения груза</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="step1">
                    <AccordionTrigger className="text-[#1a3a5c] font-medium hover:text-[#3a8dd8]">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#3a8dd8] text-white flex items-center justify-center font-bold">
                          1
                        </div>
                        Выбор транспортного средства
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-[#1a3a5c]/80 ml-11">
                      <p className="mb-3">
                        Выберите тип контейнера или фуры из выпадающего списка. Система автоматически
                        загрузит технические параметры:
                      </p>
                      <ul className="space-y-2 list-disc list-inside">
                        <li>Внутренние размеры (длина, ширина, высота)</li>
                        <li>Полезный объем в кубометрах</li>
                        <li>Максимальная грузоподъемность</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="step2">
                    <AccordionTrigger className="text-[#1a3a5c] font-medium hover:text-[#3a8dd8]">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#3a8dd8] text-white flex items-center justify-center font-bold">
                          2
                        </div>
                        Добавление грузовых единиц
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-[#1a3a5c]/80 ml-11">
                      <p className="mb-3">
                        Вы можете добавить несколько типов груза в один контейнер:
                      </p>
                      <ul className="space-y-2 list-disc list-inside">
                        <li>Нажмите "Добавить груз" для создания новой позиции</li>
                        <li>Выберите тип грузовой единицы из списка</li>
                        <li>Укажите размеры, вес и количество для каждого типа груза</li>
                        <li>Система покажет максимально возможное количество для каждого типа</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="step3">
                    <AccordionTrigger className="text-[#1a3a5c] font-medium hover:text-[#3a8dd8]">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#3a8dd8] text-white flex items-center justify-center font-bold">
                          3
                        </div>
                        Получение результатов
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-[#1a3a5c]/80 ml-11">
                      <p className="mb-3">
                        После нажатия кнопки "Рассчитать размещение" вы получите:
                      </p>
                      <ul className="space-y-2 list-disc list-inside">
                        <li>Общее количество всех грузовых единиц</li>
                        <li>Суммарный вес и объем груза</li>
                        <li>Процент использования объема контейнера</li>
                        <li>Процент использования грузоподъемности</li>
                        <li>Предупреждения при превышении лимитов</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="step4">
                    <AccordionTrigger className="text-[#1a3a5c] font-medium hover:text-[#3a8dd8]">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#3a8dd8] text-white flex items-center justify-center font-bold">
                          4
                        </div>
                        Важные рекомендации
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-[#1a3a5c]/80 ml-11">
                      <div className="space-y-3">
                        <p className="font-medium text-[#2d7a1f]">Обратите внимание:</p>
                        <ul className="space-y-2 list-disc list-inside">
                          <li>Калькулятор рассчитывает идеальное размещение без зазоров</li>
                          <li>В реальности нужно предусмотреть место для крепежных элементов</li>
                          <li>Учитывайте требования к распределению веса по площади</li>
                          <li>При перевозке хрупких грузов оставляйте дополнительное пространство</li>
                          <li>Консультируйтесь с нашими специалистами для точного расчета</li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="animate-fade-in">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-white/95 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-[#1a3a5c]">
                    <Icon name="MessageCircle" size={24} className="text-[#3a8dd8]" />
                    Контактная информация
                  </CardTitle>
                  <CardDescription>Свяжитесь с нами для консультации</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start gap-4 p-4 bg-[#3a8dd8]/10 rounded-lg">
                    <Icon name="Phone" size={24} className="text-[#3a8dd8] flex-shrink-0" />
                    <div>
                      <p className="font-medium text-[#1a3a5c]">Телефон</p>
                      <p className="text-lg font-bold text-[#3a8dd8]">8 (800) 550-81-65</p>
                      <p className="text-sm text-[#1a3a5c]/60 mt-1">Бесплатный звонок по России</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-[#3a8dd8]/10 rounded-lg">
                    <Icon name="Mail" size={24} className="text-[#3a8dd8] flex-shrink-0" />
                    <div>
                      <p className="font-medium text-[#1a3a5c]">Email</p>
                      <p className="text-lg font-bold text-[#3a8dd8]">rgsite@rusmarine.ru</p>
                      <p className="text-sm text-[#1a3a5c]/60 mt-1">Ответим в течение 24 часов</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-[#3a8dd8]/10 rounded-lg">
                    <Icon name="Clock" size={24} className="text-[#3a8dd8] flex-shrink-0" />
                    <div>
                      <p className="font-medium text-[#1a3a5c]">Режим работы</p>
                      <p className="text-[#1a3a5c]/80 mt-1">Пн-Пт: 9:00 - 18:00 МСК</p>
                      <p className="text-[#1a3a5c]/80">Сб-Вс: выходной</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-[#1a3a5c] to-[#2d5a7a] text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Ship" size={24} />
                    О компании РУСМАРИН
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-white/90">
                    Специализируемся исключительно на международных перевозках коммерческих грузов
                    для юридических лиц.
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#2d7a1f] flex items-center justify-center flex-shrink-0">
                        <Icon name="CheckCircle2" size={20} />
                      </div>
                      <p className="text-white/90">Работаем с 1991 года</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#2d7a1f] flex items-center justify-center flex-shrink-0">
                        <Icon name="CheckCircle2" size={20} />
                      </div>
                      <p className="text-white/90">
                        Весь комплекс транспортно-экспедиторских и складских услуг
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#2d7a1f] flex items-center justify-center flex-shrink-0">
                        <Icon name="CheckCircle2" size={20} />
                      </div>
                      <p className="text-white/90">Надёжная сеть партнёров по всему миру</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#2d7a1f] flex items-center justify-center flex-shrink-0">
                        <Icon name="CheckCircle2" size={20} />
                      </div>
                      <p className="text-white/90">Работаем со всеми портами РФ</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/20">
                    <p className="text-sm text-white/70">
                      Не осуществляем внутрироссийские перевозки, если они не являются частью
                      международных.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="bg-[#1a3a5c] border-t border-[#3a8dd8]/30 mt-16">
        <div className="container mx-auto px-4 py-6 text-center text-white/70 text-sm">
          <p>© 2024 РУСМАРИН. Международные морские грузоперевозки</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
