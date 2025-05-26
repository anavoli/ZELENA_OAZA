
import React, { useState } from 'react';
import PlantCard from '../components/PlantCard';
import { Plus, Search, Filter, Grid, List } from 'lucide-react';

const Plants = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');

  const plants = [
    {
      name: 'Paradajz Cherry',
      variety: 'Solanum lycopersicum',
      image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400',
      waterLevel: 85,
      lightLevel: 92,
      health: 'excellent' as const,
      lastWatered: 'Pre 2 sata',
      nextWatering: 'Za 6 sati'
    },
    {
      name: 'Bosiljak',
      variety: 'Ocimum basilicum',
      image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400',
      waterLevel: 45,
      lightLevel: 78,
      health: 'warning' as const,
      lastWatered: 'Pre 8 sati',
      nextWatering: 'Sada'
    },
    {
      name: 'Krastavac',
      variety: 'Cucumis sativus',
      image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400',
      waterLevel: 72,
      lightLevel: 85,
      health: 'good' as const,
      lastWatered: 'Pre 4 sata',
      nextWatering: 'Za 4 sata'
    },
    {
      name: 'Paprika',
      variety: 'Capsicum annuum',
      image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=400',
      waterLevel: 90,
      lightLevel: 88,
      health: 'excellent' as const,
      lastWatered: 'Pre 1 sat',
      nextWatering: 'Za 7 sati'
    },
    {
      name: 'Salata',
      variety: 'Lactuca sativa',
      image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400',
      waterLevel: 65,
      lightLevel: 70,
      health: 'good' as const,
      lastWatered: 'Pre 3 sata',
      nextWatering: 'Za 5 sati'
    },
    {
      name: 'Ruzmarin',
      variety: 'Rosmarinus officinalis',
      image: 'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=400',
      waterLevel: 30,
      lightLevel: 95,
      health: 'critical' as const,
      lastWatered: 'Pre 12 sati',
      nextWatering: 'Hitno!'
    }
  ];

  const filteredPlants = plants.filter(plant =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plant.variety.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Biljke</h1>
            <p className="text-gray-600">Upravljajte vašim biljkama i pratite njihovo zdravlje</p>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <Plus className="h-4 w-4" />
            <span>Dodaj biljku</span>
          </button>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Pretražite biljke..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter className="h-4 w-4" />
                <span>Filteri</span>
              </button>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-green-100 text-green-600'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list'
                    ? 'bg-green-100 text-green-600'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Plants Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPlants.map((plant, index) => (
              <PlantCard key={index} {...plant} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPlants.map((plant, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center space-x-6">
                  <img 
                    src={plant.image} 
                    alt={plant.name}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{plant.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{plant.variety}</p>
                    <div className="flex items-center space-x-4 text-sm">
                      <span>Vlažnost: {plant.waterLevel}%</span>
                      <span>Svetlo: {plant.lightLevel}%</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        plant.health === 'excellent' ? 'bg-green-100 text-green-800' :
                        plant.health === 'good' ? 'bg-blue-100 text-blue-800' :
                        plant.health === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {plant.health === 'excellent' ? 'Odlično' :
                         plant.health === 'good' ? 'Dobro' :
                         plant.health === 'warning' ? 'Pažnja' : 'Kritično'}
                      </span>
                    </div>
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    <div>Sledeće zalivanje</div>
                    <div className="font-medium">{plant.nextWatering}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredPlants.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">Nema pronađenih biljaka</div>
            <button className="text-green-600 hover:text-green-700">
              Dodajte novu biljku
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Plants;
