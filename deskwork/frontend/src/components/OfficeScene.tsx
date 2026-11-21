import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useState } from 'react';

export const OfficeScene = () => {
  const [showPC, setShowPC] = useState(false);

  // Handle interaction: when player clicks on the PC
  const handleClick = (event) => {
    if (event.object.name === "workstation_pc") {
      setShowPC(true);
    }
  };

  return (
    <>
      <Canvas onPointerMissed={() => setShowPC(false)}>
        <PerspectiveCamera makeDefault position={[0, 2, -6]} />
        <OrbitControls enablePan={false} enableZoom={false} />
        {/* floor */}
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial color="#f0f0f0" />
        </mesh>
        {/* workstation PC */}
        <mesh
          position={[-1, 0.5, -2]}
          onClick={handleClick}
          name="workstation_pc"
        >
          <boxGeometry args={[1, 0.75, 0.5]} />
          <meshStandardMaterial color="#333" />
        </mesh>
        {/* ...other objects */}
      </Canvas>

      {showPC && <Workstation missionId={1} onClose={() => setShowPC(false)} />}
    </>
  );
};
