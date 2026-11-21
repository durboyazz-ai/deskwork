import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PointerLockControls } from '@react-three/drei';
import { Suspense, useRef, useState, useEffect } from 'react';
import Workstation from './Workstation';

export default function OfficeScene({ missionId }: { missionId: number }) {
  const [pcOpen, setPcOpen] = useState(false);

  // Basic FPS controller
  const controlsRef = useRef<any>(null);
  useFrame(() => controlsRef.current?.update());

  // Interactable PC – when you click it, open the workstation UI
  const handlePointerDown = (e: any) => {
    if (e.object.name === 'workstation_pc') setPcOpen(true);
  };

  return (
    <>
      <Canvas shadows camera={{ position: [0, 1.6, 5], fov: 75 }}>
        <ambientLight intensity={0.7} />
        <pointLight position={[10, 10, 10]} intensity={0.8} castShadow />

        {/* simple floor */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial color="#eaeaea" />
        </mesh>

        {/* workstation PC – a small cube */}
        <mesh
          position={[-1.5, 0.75, -2]}
          onPointerDown={handlePointerDown}
          name="workstation_pc"
          castShadow
        >
          <boxGeometry args={[1, 0.75, 0.5]} />
          <meshStandardMaterial color="#333" />
        </mesh>

        {/* other office props – keep them simple for now */}
        <Suspense fallback={null}>
          {/* load GLTF models via useGLTF hook if you want */}
        </Suspense>

        {/* FPS controls */}
        <PointerLockControls ref={controlsRef} />
      </Canvas>

      {pcOpen && (
        <Workstation missionId={missionId} onClose={() => setPcOpen(false)} />
      )}
    </>
  );
}
