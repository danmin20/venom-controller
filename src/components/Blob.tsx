import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import MeshComponent from "./Mesh";

const Blob = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <div id="blob">
      <Canvas ref={canvasRef}>
        <perspectiveCamera
          fov={45}
          aspect={1}
          near={0.1}
          far={1000}
          position={[0, 0, 5]}
        />
        <scene>
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
          <ambientLight color="#bfbfbf" />

          <MeshComponent {...{ canvasRef }} />
        </scene>
      </Canvas>
    </div>
  );
};

export default Blob;
