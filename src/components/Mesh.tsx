import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import { processState, speedState, spikeState } from "../atoms/slider-atom";
import { Mesh } from "three";
import { createNoise3D } from "simplex-noise";

type Props = {
  canvasRef: any;
  sceneRef: any;
  cameraRef: any;
  requestAnimationRef: any;
};

const MeshComponent = ({
  canvasRef,
  sceneRef,
  cameraRef,
  requestAnimationRef,
}: Props) => {
  const ref = useRef<Mesh>(null);
  const noise3D = createNoise3D();

  const speedValue = useRecoilValue(speedState);
  const spikeValue = useRecoilValue(spikeState);
  const processValue = useRecoilValue(processState);

  const canvas = canvasRef.current as unknown as HTMLCanvasElement;

  useFrame(() => {
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      context: canvas?.getContext("webgl2") || undefined,
      antialias: true,
      alpha: true,
    });

    renderer.render(sceneRef.current, cameraRef.current);

    renderer.setSize(600, 600);
    renderer.setPixelRatio(window.devicePixelRatio || 1);

    const time =
      performance.now() * 0.00001 * speedValue * Math.pow(processValue, 3);
    const spikes = spikeValue * processValue;

    const positions = ref.current?.geometry.attributes.position
      .array as Array<number>;

    for (let i = 0; i < positions.length; i += 3) {
      const vector = new THREE.Vector3(
        positions[i],
        positions[i + 1],
        positions[i + 2]
      );

      vector
        .normalize()
        .multiplyScalar(
          1 +
            0.3 *
              noise3D(
                vector.x * spikes,
                vector.y * spikes,
                vector.z * spikes + time
              )
        );

      positions[i] = vector.x;
      positions[i + 1] = vector.y;
      positions[i + 2] = vector.z;
    }

    ref.current?.geometry.computeVertexNormals();

    if (sceneRef.current && cameraRef.current) {
      renderer.render(sceneRef.current, cameraRef.current);
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.8, 128, 128]} />
      <meshPhongMaterial color="#e4ecfa" shininess={100} />
    </mesh>
  );
};

export default MeshComponent;
