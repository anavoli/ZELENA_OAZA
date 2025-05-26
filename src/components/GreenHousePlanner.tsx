
import React, { useState } from 'react';
import { Plus, Move, RotateCcw, Save, Download, Upload, Grid, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PlantItem {
  id: string;
  name: string;
  type: 'vegetable' | 'herb' | 'flower';
  size: 'small' | 'medium' | 'large';
  color: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

const GreenHousePlanner = () => {
  const [plants, setPlants] = useState<PlantItem[]>([]);
  const [selectedPlant, setSelectedPlant] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [gridSize, setGridSize] = useState(20);
  const [showGrid, setShowGrid] = useState(true);

  const plantTemplates = [
    { name: 'Paradajz', type: 'vegetable' as const, size: 'large' as const, color: '#ef4444', width: 80, height: 80 },
    { name: 'Paprika', type: 'vegetable' as const, size: 'medium' as const, color: '#f97316', width: 60, height: 60 },
    { name: 'Krastavac', type: 'vegetable' as const, size: 'large' as const, color: '#22c55e', width: 100, height: 60 },
    { name: 'Salata', type: 'vegetable' as const, size: 'small' as const, color: '#84cc16', width: 40, height: 40 },
    { name: 'Bosiljak', type: 'herb' as const, size: 'small' as const, color: '#10b981', width: 30, height: 30 },
    { name: 'Ruzmarin', type: 'herb' as const, size: 'medium' as const, color: '#059669', width: 50, height: 50 },
    { name: 'Cveće', type: 'flower' as const, size: 'small' as const, color: '#a855f7', width: 35, height: 35 }
  ];

  const addPlant = (template: typeof plantTemplates[0]) => {
    const newPlant: PlantItem = {
      id: `plant-${Date.now()}`,
      name: template.name,
      type: template.type,
      size: template.size,
      color: template.color,
      x: 50,
      y: 50,
      width: template.width,
      height: template.height
    };
    setPlants([...plants, newPlant]);
  };

  const removePlant = (id: string) => {
    setPlants(plants.filter(plant => plant.id !== id));
    setSelectedPlant(null);
  };

  const updatePlantPosition = (id: string, x: number, y: number) => {
    setPlants(plants.map(plant => 
      plant.id === id ? { ...plant, x, y } : plant
    ));
  };

  const clearAll = () => {
    setPlants([]);
    setSelectedPlant(null);
  };

  const savePlan = () => {
    const planData = JSON.stringify(plants, null, 2);
    const blob = new Blob([planData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'greenhouse-plan.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleMouseDown = (e: React.MouseEvent, plantId: string) => {
    e.preventDefault();
    setSelectedPlant(plantId);
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && selectedPlant) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Snap to grid if enabled
      const snapX = showGrid ? Math.round(x / gridSize) * gridSize : x;
      const snapY = showGrid ? Math.round(y / gridSize) * gridSize : y;
      
      updatePlantPosition(selectedPlant, snapX, snapY);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Planer Plastenika</h1>
            <p className="text-gray-600">Planirajte raspored biljaka u vašem plastenik</p>
          </div>
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={() => setShowGrid(!showGrid)}
              className="flex items-center space-x-2"
            >
              <Grid className="h-4 w-4" />
              <span>{showGrid ? 'Sakrij' : 'Prikaži'} mrežu</span>
            </Button>
            <Button
              variant="outline"
              onClick={clearAll}
              className="flex items-center space-x-2"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Obriši sve</span>
            </Button>
            <Button
              onClick={savePlan}
              className="flex items-center space-x-2 bg-green-600 hover:bg-green-700"
            >
              <Download className="h-4 w-4" />
              <span>Sačuvaj plan</span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Plant Library */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Plus className="h-5 w-5" />
                  <span>Biljke</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {plantTemplates.map((template, index) => (
                  <button
                    key={index}
                    onClick={() => addPlant(template)}
                    className="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-6 h-6 rounded"
                        style={{ backgroundColor: template.color }}
                      ></div>
                      <div>
                        <div className="font-medium text-sm">{template.name}</div>
                        <div className="text-xs text-gray-500 capitalize">
                          {template.type} • {template.size}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}

                {/* Plant Info */}
                {selectedPlant && (
                  <div className="mt-6 p-3 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-900 mb-2">Selektovana biljka</h4>
                    {(() => {
                      const plant = plants.find(p => p.id === selectedPlant);
                      return plant ? (
                        <div className="text-sm text-green-800">
                          <div>{plant.name}</div>
                          <div>Pozicija: {Math.round(plant.x)}, {Math.round(plant.y)}</div>
                          <button
                            onClick={() => removePlant(plant.id)}
                            className="mt-2 text-red-600 hover:text-red-800 text-xs"
                          >
                            Ukloni biljku
                          </button>
                        </div>
                      ) : null;
                    })()}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Planning Canvas */}
          <div className="lg:col-span-3">
            <Card className="h-[600px]">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Plan Plastenika</span>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Maximize2 className="h-4 w-4" />
                    <span>800 x 600 cm</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 h-full">
                <div 
                  className="relative w-full h-full bg-green-50 overflow-hidden cursor-crosshair"
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  style={{
                    backgroundImage: showGrid 
                      ? `linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)`
                      : 'none',
                    backgroundSize: showGrid ? `${gridSize}px ${gridSize}px` : 'auto'
                  }}
                >
                  {/* Plants */}
                  {plants.map((plant) => (
                    <div
                      key={plant.id}
                      className={`absolute cursor-move border-2 rounded-lg flex items-center justify-center text-white text-xs font-medium select-none ${
                        selectedPlant === plant.id ? 'border-blue-500 shadow-lg' : 'border-gray-300'
                      }`}
                      style={{
                        left: plant.x,
                        top: plant.y,
                        width: plant.width,
                        height: plant.height,
                        backgroundColor: plant.color,
                        transform: selectedPlant === plant.id ? 'scale(1.05)' : 'scale(1)',
                        transition: isDragging ? 'none' : 'transform 0.2s ease'
                      }}
                      onMouseDown={(e) => handleMouseDown(e, plant.id)}
                      onClick={() => setSelectedPlant(plant.id)}
                    >
                      {plant.name}
                    </div>
                  ))}

                  {/* Empty state */}
                  {plants.length === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-gray-500">
                        <Maximize2 className="h-12 w-12 mx-auto mb-3 opacity-50" />
                        <p className="text-lg font-medium">Prazan plastenik</p>
                        <p className="text-sm">Dodajte biljke iz biblioteke levo</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-green-600">{plants.length}</div>
                  <div className="text-sm text-gray-600">Ukupno biljaka</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-blue-600">
                    {plants.filter(p => p.type === 'vegetable').length}
                  </div>
                  <div className="text-sm text-gray-600">Povrće</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-purple-600">
                    {Math.round((plants.reduce((acc, plant) => acc + (plant.width * plant.height), 0) / (800 * 600)) * 100)}%
                  </div>
                  <div className="text-sm text-gray-600">Iskorišćenost prostora</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GreenHousePlanner;
