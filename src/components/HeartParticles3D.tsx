import React, { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function HeartParticles({ count = 500 }) {
  const mesh = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // Tạo vị trí các hạt theo hình trái tim 3D
  const particles = useMemo(() => {
    const positions = [];
    for (let i = 0; i < count; i++) {
      const t = Math.PI * 2 * (i / count);
      // Công thức trái tim 3D
      const x = 16 * Math.pow(Math.sin(t), 3) / 8;
      const y = (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) / 8;
      const z = (Math.sin(t * 2) * 1.5); // tạo chiều sâu
      positions.push([x, y, z]);
    }
    return positions;
  }, [count]);

  // Quay nhẹ trái tim
  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.003;
    }
  });

  return (
    <group
      ref={mesh}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onPointerDown={() => setHovered(true)}
      onPointerUp={() => setHovered(false)}
    >
      {particles.map(([x, y, z], i) => (
        <mesh
          key={i}
          position={[x, y, z]}
          scale={hovered ? [1.7, 1.7, 1.7] : [1, 1, 1]}
        >
          <sphereGeometry args={[0.13, 10, 10]} />
          <meshStandardMaterial color="#ff69b4" emissive={hovered ? "#fff" : "#ff69b4"} />
        </mesh>
      ))}
    </group>
  );
}

export default function HeartParticles3D() {
  return (
    <Canvas camera={{ position: [0, 0, 16], fov: 60 }} style={{ width: "100vw", height: "100vh", background: "#181c2b" }}>
      <ambientLight intensity={0.7} />
      <pointLight position={[10, 10, 10]} />
      <HeartParticles />
    </Canvas>
  );
} 