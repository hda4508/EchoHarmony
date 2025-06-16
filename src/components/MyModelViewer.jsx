import React, { Suspense, useEffect, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import "../styles/Model.css";

useGLTF.preload("/noa/noa_v2.glb");
useGLTF.preload("/noa/resblend.glb");
useGLTF.preload("/noa/resblend1.glb");

const modelData = [
  { path: "/noa/noa_v2.glb", label: "NOA – Basic" },
  { path: "/noa/resblend.glb", label: "NOA – Chef" },
  { path: "/noa/resblend1.glb", label: "NOA – Offemployee" },
];

function Model({ path }) {
  const gltf = useGLTF(path);
  return <primitive object={gltf.scene} scale={0.4} position={[0, 0.25, 0]} />;
}

export default function MyModelViewer({ isHovered, setIsHovered }) {
  const [isReady, setIsReady] = useState(false);
  const [modelIndex, setModelIndex] = useState(0);
  const controlsRef = useRef(); // OrbitControls에 접근하기 위한 ref

  useEffect(() => {
    const timeout = setTimeout(() => setIsReady(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    // 모델이 바뀔 때마다 카메라 컨트롤 초기화
    if (controlsRef.current) {
      controlsRef.current.reset(); // 회전 상태 초기화
    }
  }, [modelIndex]);

  const handlePrev = () => {
    setModelIndex((prev) => (prev - 1 + modelData.length) % modelData.length);
  };

  const handleNext = () => {
    setModelIndex((prev) => (prev + 1) % modelData.length);
  };

  const currentModel = modelData[modelIndex];

  return (
    <div className="model-section" style={{ width: "100%", height: "100vh" }}>
      <div
        className="model-view"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ width: "500px", height: "500px" }}
      >
        {isReady && (
          <Canvas
            camera={{ position: [0, 1.5, 5.5], fov: 30 }}
            frameloop="always"
          >
            <Suspense fallback={<span>모델 불러오는 중...</span>}>
              <ambientLight intensity={1.2} />
              <directionalLight position={[3, 5, 2]} intensity={1.5} />
              <Environment preset="sunset" background={false} />
              <Model path={currentModel.path} />
              <OrbitControls
                ref={controlsRef}
                autoRotate={!isHovered}
                autoRotateSpeed={1.5}
                enableZoom={false}
                enablePan={false}
                enableRotate={false}
                target={[0, 0, 0]}
              />
            </Suspense>
          </Canvas>
        )}
      </div>

      <div className="label-row">
        <button className="nav-button" onClick={handlePrev}>←</button>
        <div className="model-label">{currentModel.label}</div>
        <button className="nav-button" onClick={handleNext}>→</button>
      </div>
    </div>
  );
}
