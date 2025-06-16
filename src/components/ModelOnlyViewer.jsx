import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, Clone } from "@react-three/drei";

function ClonedModel() {
  const { scene } = useGLTF("/noa/noa_v2.glb");
  return <Clone object={scene} scale={0.6} position={[0, -0.5, 0]} />;
}

export default function ModelOnlyViewer() {
  return (
    <div style={{ width: "400px", height: "400px" }}>
      <Canvas camera={{ position: [0, 1.3, 7], fov: 35 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 5, 5]} intensity={1.2} />
        <Environment preset="sunset" />
        <Suspense fallback={null}>
          <ClonedModel />
        </Suspense>
        <OrbitControls
          autoRotate={false}
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
          target={[0, 0, 0]}
        />
      </Canvas>
    </div>
  );
}
