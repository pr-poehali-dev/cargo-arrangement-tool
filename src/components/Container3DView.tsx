import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid, Box, Text } from '@react-three/drei';
import { useState } from 'react';
import * as THREE from 'three';

interface CargoItem {
  id: string;
  name: string;
  length: number;
  width: number;
  height: number;
  weight: number;
  quantity: number;
  color: string;
}

interface PlacedCargo {
  item: CargoItem;
  position: [number, number, number];
  index: number;
}

interface Container3DViewProps {
  containerLength: number;
  containerWidth: number;
  containerHeight: number;
  cargoItems: CargoItem[];
  onCargoPositionChange?: (cargoId: string, position: [number, number, number]) => void;
}

const CargoBox = ({
  cargo,
  position,
  onClick,
  isSelected,
}: {
  cargo: CargoItem;
  position: [number, number, number];
  onClick: () => void;
  isSelected: boolean;
}) => {
  return (
    <group position={position}>
      <Box
        args={[cargo.length, cargo.height, cargo.width]}
        onClick={onClick}
      >
        <meshStandardMaterial
          color={cargo.color}
          opacity={0.8}
          transparent
          emissive={isSelected ? cargo.color : '#000000'}
          emissiveIntensity={isSelected ? 0.3 : 0}
        />
      </Box>
      <Text
        position={[0, cargo.height / 2 + 0.1, 0]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {cargo.name}
      </Text>
      <Text
        position={[0, cargo.height / 2 + 0.3, 0]}
        fontSize={0.15}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {cargo.weight}kg
      </Text>
    </group>
  );
};

export const Container3DView = ({
  containerLength,
  containerWidth,
  containerHeight,
  cargoItems,
}: Container3DViewProps) => {
  const [selectedCargoId, setSelectedCargoId] = useState<string | null>(null);
  
  const sortedCargo = [...cargoItems].sort((a, b) => b.weight - a.weight);
  
  const placeCargo = (): PlacedCargo[] => {
    const placed: PlacedCargo[] = [];
    const layers: { height: number; items: PlacedCargo[] }[] = [];
    
    let currentLayer = { height: 0, items: [] as PlacedCargo[] };
    let currentX = 0;
    let currentZ = 0;
    let maxHeightInRow = 0;
    
    sortedCargo.forEach((item) => {
      for (let i = 0; i < item.quantity; i++) {
        if (currentX + item.length > containerLength) {
          currentX = 0;
          currentZ += maxHeightInRow;
          maxHeightInRow = 0;
          
          if (currentZ + item.width > containerWidth) {
            layers.push(currentLayer);
            currentLayer = { 
              height: currentLayer.height + (currentLayer.items.length > 0 
                ? Math.max(...currentLayer.items.map(p => p.item.height)) 
                : 0), 
              items: [] 
            };
            currentX = 0;
            currentZ = 0;
            maxHeightInRow = 0;
          }
        }
        
        const position: [number, number, number] = [
          currentX + item.length / 2 - containerLength / 2,
          currentLayer.height + item.height / 2,
          currentZ + item.width / 2 - containerWidth / 2,
        ];
        
        currentLayer.items.push({
          item: { ...item, name: `${item.name} #${i + 1}` },
          position,
          index: placed.length,
        });
        
        currentX += item.length;
        maxHeightInRow = Math.max(maxHeightInRow, item.width);
      }
    });
    
    if (currentLayer.items.length > 0) {
      layers.push(currentLayer);
    }
    
    layers.forEach(layer => {
      placed.push(...layer.items);
    });
    
    return placed;
  };
  
  const placedCargo = placeCargo();
  
  return (
    <div className="w-full h-[600px] bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg overflow-hidden">
      <Canvas
        camera={{ position: [containerLength * 1.2, containerHeight * 1.2, containerWidth * 1.2], fov: 50 }}
        shadows
      >
        <color attach="background" args={['#0f172a']} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        <pointLight position={[-10, -10, -5]} intensity={0.5} />
        
        <group position={[0, -0.1, 0]}>
          <Grid
            args={[containerLength * 1.5, containerWidth * 1.5]}
            cellSize={1}
            cellThickness={0.5}
            cellColor="#3a8dd8"
            sectionSize={5}
            sectionThickness={1}
            sectionColor="#2d7a1f"
            fadeDistance={50}
            fadeStrength={1}
            followCamera={false}
            infiniteGrid={false}
          />
        </group>
        
        <Box
          args={[containerLength, containerHeight, containerWidth]}
          position={[0, containerHeight / 2, 0]}
        >
          <meshStandardMaterial
            color="#1a3a5c"
            transparent
            opacity={0.1}
            side={THREE.BackSide}
            wireframe={false}
          />
        </Box>
        
        <lineSegments>
          <edgesGeometry
            attach="geometry"
            args={[new THREE.BoxGeometry(containerLength, containerHeight, containerWidth)]}
          />
          <lineBasicMaterial attach="material" color="#3a8dd8" linewidth={2} />
        </lineSegments>
        
        {placedCargo.map((placed) => (
          <CargoBox
            key={`${placed.item.id}-${placed.index}`}
            cargo={placed.item}
            position={placed.position}
            onClick={() => setSelectedCargoId(placed.item.id)}
            isSelected={selectedCargoId === placed.item.id}
          />
        ))}
        
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={5}
          maxDistance={50}
        />
      </Canvas>
    </div>
  );
};
