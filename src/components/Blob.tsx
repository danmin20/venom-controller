import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, Scene } from "three";
import MeshComponent from "./Mesh";

const Blob = () => {
  const sceneRef = useRef<Scene>(null);
  const cameraRef = useRef<PerspectiveCamera>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestAnimationRef = useRef(0);

  return (
    <div id="blob">
      <Canvas id="blob-canvas" ref={canvasRef}>
        <perspectiveCamera
          ref={cameraRef}
          fov={45}
          aspect={1}
          near={0.1}
          far={1000}
          position={[0, 0, 5]}
        />
        <scene ref={sceneRef}>
          <directionalLight
            color="#fff"
            intensity={0.7}
            castShadow={true}
            position={[0, 500, 200]}
          />
          <directionalLight
            color="#fff"
            intensity={0.25}
            castShadow={true}
            position={[0, -500, 400]}
          />
          <ambientLight color="#798296" />

          <MeshComponent
            {...{ canvasRef, sceneRef, cameraRef, requestAnimationRef }}
          />
        </scene>
      </Canvas>
    </div>
  );
};

export default Blob;
