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
  { id: "20ft", name: "20' контейнер", length: 5.9, width: 2.35, height: 2.39, capacity: 33.2, maxWeight: 21700 },
  { id: "40ft", name: "40' контейнер", length: 12.03, width: 2.35, height: 2.39, capacity: 67.7, maxWeight: 26680 },
  { id: "40hc", name: "40' HC контейнер", length: 12.03, width: 2.35, height: 2.69, capacity: 76.4, maxWeight: 26680 },
  { id: "45hc", name: "45' HC контейнер", length: 13.55, width: 2.35, height: 2.69, capacity: 86, maxWeight: 27700 },
  { id: "truck", name: "Фура 20т", length: 13.6, width: 2.45, height: 2.7, capacity: 90, maxWeight: 20000 },
];

const cargoUnits = [
  { id: "europallet", name: "Европаллет", length: 1.2, width: 0.8, height: 0.15 },
  { id: "pallet", name: "Американский паллет", length: 1.2, width: 1.0, height: 0.15 },
  { id: "box", name: "Коробка", length: 0.6, width: 0.4, height: 0.4 },
  { id: "custom", name: "Свой размер", length: 0, width: 0, height: 0 },
];

const Index = () => {
  const [selectedContainer, setSelectedContainer] = useState(containerTypes[0]);
  const [selectedCargoUnit, setSelectedCargoUnit] = useState(cargoUnits[0]);
  const [cargoLength, setCargoLength] = useState(selectedCargoUnit.length);
  const [cargoWidth, setCargoWidth] = useState(selectedCargoUnit.width);
  const [cargoHeight, setCargoHeight] = useState(selectedCargoUnit.height);
  const [cargoWeight, setCargoWeight] = useState(500);
  const [quantity, setQuantity] = useState(1);
  const [calculated, setCalculated] = useState(false);

  const calculate = () => {
    setCalculated(true);
  };

  const maxUnitsLength = Math.floor(selectedContainer.length / cargoLength);
  const maxUnitsWidth = Math.floor(selectedContainer.width / cargoWidth);
  const maxUnitsHeight = Math.floor(selectedContainer.height / cargoHeight);
  const maxUnits = maxUnitsLength * maxUnitsWidth * maxUnitsHeight;
  const maxByWeight = Math.floor(selectedContainer.maxWeight / cargoWeight);
  const actualMax = Math.min(maxUnits, maxByWeight);
  const usedVolume = ((cargoLength * cargoWidth * cargoHeight * quantity) / selectedContainer.capacity) * 100;
  const usedWeight = ((cargoWeight * quantity) / selectedContainer.maxWeight) * 100;

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
            <div className="grid md:grid-cols-2 gap-6">
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
                        {containerTypes.map((container) => (
                          <SelectItem key={container.id} value={container.id}>
                            {container.name}
                          </SelectItem>
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

                  <div className="space-y-2">
                    <Label className="text-[#1a3a5c] font-medium">Тип грузовой единицы</Label>
                    <Select
                      value={selectedCargoUnit.id}
                      onValueChange={(value) => {
                        const unit = cargoUnits.find((u) => u.id === value);
                        if (unit) {
                          setSelectedCargoUnit(unit);
                          if (unit.id !== "custom") {
                            setCargoLength(unit.length);
                            setCargoWidth(unit.width);
                            setCargoHeight(unit.height);
                          }
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

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label className="text-[#1a3a5c] font-medium">Длина (м)</Label>
                      <Input
                        type="number"
                        step="0.1"
                        value={cargoLength}
                        onChange={(e) => setCargoLength(parseFloat(e.target.value) || 0)}
                        className="bg-white border-[#3a8dd8]/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[#1a3a5c] font-medium">Ширина (м)</Label>
                      <Input
                        type="number"
                        step="0.1"
                        value={cargoWidth}
                        onChange={(e) => setCargoWidth(parseFloat(e.target.value) || 0)}
                        className="bg-white border-[#3a8dd8]/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[#1a3a5c] font-medium">Высота (м)</Label>
                      <Input
                        type="number"
                        step="0.1"
                        value={cargoHeight}
                        onChange={(e) => setCargoHeight(parseFloat(e.target.value) || 0)}
                        className="bg-white border-[#3a8dd8]/30"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-[#1a3a5c] font-medium">Вес единицы (кг)</Label>
                      <Input
                        type="number"
                        value={cargoWeight}
                        onChange={(e) => setCargoWeight(parseFloat(e.target.value) || 0)}
                        className="bg-white border-[#3a8dd8]/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[#1a3a5c] font-medium">Количество</Label>
                      <Input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                        className="bg-white border-[#3a8dd8]/30"
                      />
                    </div>
                  </div>

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
                        <div className="p-6 bg-gradient-to-br from-[#2d7a1f] to-[#2d7a1f]/80 rounded-lg text-white">
                          <p className="text-sm opacity-90 mb-2">Максимальное количество</p>
                          <p className="text-5xl font-bold">{actualMax}</p>
                          <p className="text-sm opacity-90 mt-2">грузовых единиц</p>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm text-[#1a3a5c]/70 font-medium">Использование объема</span>
                              <span className="text-sm font-bold text-[#1a3a5c]">{Math.min(usedVolume, 100).toFixed(1)}%</span>
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
                              <span className="text-sm text-[#1a3a5c]/70 font-medium">Использование веса</span>
                              <span className="text-sm font-bold text-[#1a3a5c]">{Math.min(usedWeight, 100).toFixed(1)}%</span>
                            </div>
                            <div className="h-3 bg-[#2d7a1f]/20 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-[#2d7a1f] transition-all duration-500"
                                style={{ width: `${Math.min(usedWeight, 100)}%` }}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#3a8dd8]/20">
                          <div className="p-4 bg-[#3a8dd8]/10 rounded-lg">
                            <p className="text-xs text-[#1a3a5c]/60 mb-1">По объему</p>
                            <p className="text-2xl font-bold text-[#1a3a5c]">{maxUnits}</p>
                            <p className="text-xs text-[#1a3a5c]/60 mt-1">единиц</p>
                          </div>
                          <div className="p-4 bg-[#2d7a1f]/10 rounded-lg">
                            <p className="text-xs text-[#1a3a5c]/60 mb-1">По весу</p>
                            <p className="text-2xl font-bold text-[#1a3a5c]">{maxByWeight}</p>
                            <p className="text-xs text-[#1a3a5c]/60 mt-1">единиц</p>
                          </div>
                        </div>

                        {quantity > actualMax && (
                          <Alert className="bg-red-50 border-red-200">
                            <Icon name="AlertTriangle" size={18} className="text-red-600" />
                            <AlertDescription className="text-red-800">
                              Указанное количество ({quantity}) превышает максимально возможное ({actualMax})
                            </AlertDescription>
                          </Alert>
                        )}
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <Icon name="PackageSearch" size={64} className="text-[#3a8dd8]/30 mb-4" />
                        <p className="text-[#1a3a5c]/60">Заполните параметры и нажмите "Рассчитать размещение"</p>
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
                <CardDescription>Технические характеристики стандартных контейнеров и фур</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {containerTypes.map((container) => (
                    <Card key={container.id} className="border-2 border-[#3a8dd8]/30 hover:border-[#3a8dd8] transition-colors">
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
                            <span className="font-semibold text-[#1a3a5c]">{container.length} м</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#1a3a5c]/60">Ширина:</span>
                            <span className="font-semibold text-[#1a3a5c]">{container.width} м</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#1a3a5c]/60">Высота:</span>
                            <span className="font-semibold text-[#1a3a5c]">{container.height} м</span>
                          </div>
                          <div className="flex justify-between pt-2 border-t border-[#3a8dd8]/20">
                            <span className="text-[#1a3a5c]/60">Объем:</span>
                            <span className="font-semibold text-[#3a8dd8]">{container.capacity} м³</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#1a3a5c]/60">Макс. вес:</span>
                            <span className="font-semibold text-[#2d7a1f]">{container.maxWeight} кг</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
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
                <div className="grid md:grid-cols-2 gap-6">
                  {cargoUnits.filter((u) => u.id !== "custom").map((unit) => (
                    <Card key={unit.id} className="border-2 border-[#3a8dd8]/30">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg text-[#1a3a5c] flex items-center gap-2">
                          <Icon name="Package" size={20} className="text-[#3a8dd8]" />
                          {unit.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-3 gap-4 text-sm">
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
                        <div className="w-8 h-8 rounded-full bg-[#3a8dd8] text-white flex items-center justify-center font-bold">1</div>
                        Выбор транспортного средства
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-[#1a3a5c]/80 ml-11">
                      <p className="mb-3">Выберите тип контейнера или фуры из выпадающего списка. Система автоматически загрузит технические параметры:</p>
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
                        <div className="w-8 h-8 rounded-full bg-[#3a8dd8] text-white flex items-center justify-center font-bold">2</div>
                        Указание параметров груза
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-[#1a3a5c]/80 ml-11">
                      <p className="mb-3">Выберите стандартную грузовую единицу или укажите свои размеры:</p>
                      <ul className="space-y-2 list-disc list-inside">
                        <li>Для стандартных паллет размеры загрузятся автоматически</li>
                        <li>При выборе "Свой размер" введите длину, ширину и высоту</li>
                        <li>Укажите вес одной грузовой единицы в килограммах</li>
                        <li>Введите количество единиц для расчета</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="step3">
                    <AccordionTrigger className="text-[#1a3a5c] font-medium hover:text-[#3a8dd8]">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#3a8dd8] text-white flex items-center justify-center font-bold">3</div>
                        Получение результатов
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-[#1a3a5c]/80 ml-11">
                      <p className="mb-3">После нажатия кнопки "Рассчитать размещение" вы получите:</p>
                      <ul className="space-y-2 list-disc list-inside">
                        <li>Максимальное количество грузовых единиц с учетом объема и веса</li>
                        <li>Процент использования объема контейнера</li>
                        <li>Процент использования грузоподъемности</li>
                        <li>Предупреждения при превышении лимитов</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="step4">
                    <AccordionTrigger className="text-[#1a3a5c] font-medium hover:text-[#3a8dd8]">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#3a8dd8] text-white flex items-center justify-center font-bold">4</div>
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
                    Специализируемся исключительно на международных перевозках коммерческих грузов для юридических лиц.
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
                      <p className="text-white/90">Весь комплекс транспортно-экспедиторских и складских услуг</p>
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
                      Не осуществляем внутрироссийские перевозки, если они не являются частью международных.
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
