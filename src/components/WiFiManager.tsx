
import React, { useState } from 'react';
import { Wifi, WifiOff, Lock, Eye, EyeOff, RefreshCw, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

interface WiFiNetwork {
  ssid: string;
  strength: number;
  secured: boolean;
  connected: boolean;
}

const WiFiManager = () => {
  const { toast } = useToast();
  const [isScanning, setIsScanning] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [selectedNetwork, setSelectedNetwork] = useState<WiFiNetwork | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const [networks, setNetworks] = useState<WiFiNetwork[]>([
    { ssid: 'SmartGarden_Network', strength: 95, secured: true, connected: true },
    { ssid: 'Home_WiFi_5G', strength: 78, secured: true, connected: false },
    { ssid: 'TP-Link_2024', strength: 65, secured: true, connected: false },
    { ssid: 'GuestNetwork', strength: 45, secured: false, connected: false },
    { ssid: 'Neighbor_WiFi', strength: 32, secured: true, connected: false }
  ]);

  const getSignalStrengthColor = (strength: number) => {
    if (strength >= 70) return 'text-green-600';
    if (strength >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getSignalBars = (strength: number) => {
    if (strength >= 80) return '▇▇▇▇';
    if (strength >= 60) return '▇▇▇▁';
    if (strength >= 40) return '▇▇▁▁';
    if (strength >= 20) return '▇▁▁▁';
    return '▁▁▁▁';
  };

  const handleScan = async () => {
    setIsScanning(true);
    // Simulacija skeniranja
    setTimeout(() => {
      toast({
        title: "Skeniranje završeno",
        description: `Pronađeno je ${networks.length} WiFi mreža`,
      });
      setIsScanning(false);
    }, 2000);
  };

  const handleNetworkSelect = (network: WiFiNetwork) => {
    if (network.connected) return;
    
    setSelectedNetwork(network);
    setPassword('');
    if (network.secured) {
      setIsDialogOpen(true);
    } else {
      handleConnect(network, '');
    }
  };

  const handleConnect = async (network: WiFiNetwork, pwd: string) => {
    setIsConnecting(true);
    
    // Simulacija povezivanja
    setTimeout(() => {
      const updatedNetworks = networks.map(n => ({
        ...n,
        connected: n.ssid === network.ssid
      }));
      setNetworks(updatedNetworks);
      
      toast({
        title: "Uspešno povezano",
        description: `Povezani ste na mrežu ${network.ssid}`,
      });
      
      setIsConnecting(false);
      setIsDialogOpen(false);
      setPassword('');
    }, 3000);
  };

  const handleDisconnect = (network: WiFiNetwork) => {
    const updatedNetworks = networks.map(n => ({
      ...n,
      connected: false
    }));
    setNetworks(updatedNetworks);
    
    toast({
      title: "Prekinuta veza",
      description: `Prekinuta je veza sa mrežom ${network.ssid}`,
      variant: "destructive"
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Wifi className="h-5 w-5 text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">WiFi upravljanje</h2>
        </div>
        <Button 
          onClick={handleScan} 
          disabled={isScanning}
          variant="outline"
          size="sm"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isScanning ? 'animate-spin' : ''}`} />
          {isScanning ? 'Skeniram...' : 'Skeniraj'}
        </Button>
      </div>

      <div className="space-y-3">
        {networks.map((network) => (
          <div 
            key={network.ssid}
            className={`p-4 border rounded-lg cursor-pointer transition-colors ${
              network.connected 
                ? 'border-green-300 bg-green-50' 
                : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
            }`}
            onClick={() => handleNetworkSelect(network)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  {network.connected ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : network.secured ? (
                    <Lock className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Wifi className="h-4 w-4 text-gray-500" />
                  )}
                  <span className="font-medium text-gray-900">{network.ssid}</span>
                  {network.connected && (
                    <span className="text-xs text-green-600 font-medium">Povezano</span>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className={`text-sm font-mono ${getSignalStrengthColor(network.strength)}`}>
                    {getSignalBars(network.strength)}
                  </span>
                  <span className="text-sm text-gray-600">{network.strength}%</span>
                </div>
                
                {network.connected && (
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDisconnect(network);
                    }}
                    variant="outline"
                    size="sm"
                  >
                    Prekini vezu
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Password Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Povezivanje na {selectedNetwork?.ssid}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lozinka za WiFi mrežu
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Unesite lozinku"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                disabled={isConnecting}
              >
                Otkaži
              </Button>
              <Button
                onClick={() => selectedNetwork && handleConnect(selectedNetwork, password)}
                disabled={isConnecting || !password.trim()}
              >
                {isConnecting ? 'Povezujem...' : 'Poveži se'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WiFiManager;
