import * as THREE from "three";
import { createNoise3D } from "simplex-noise";
import { useRecoilValue } from "recoil";
import { processState, speedState, spikeState } from "../atoms/slider-atom";
import { useEffect, useRef } from "react";

const Blob = () => {
  const speedValue = useRecoilValue(speedState);
  const spikeValue = useRecoilValue(spikeState);
  const processValue = useRecoilValue(processState);

  const canvasRef = useRef(null);
  const requestAnimationRef = useRef(0);
  const noise3D = createNoise3D();

  useEffect(() => {
    const canvas = canvasRef.current as unknown as HTMLCanvasElement;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      context: canvas?.getContext("webgl2") || undefined,
      antialias: true,
      alpha: true,
    });

    renderer.setSize(600, 600);
    renderer.setPixelRatio(window.devicePixelRatio || 1);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      canvas.width / canvas.height,
      0.1,
      1000
    );

    camera.position.z = 5;

    const geometry = new THREE.SphereGeometry(0.8, 128, 128);

    const material = new THREE.MeshPhongMaterial({
      color: 0xe4ecfa,
      shininess: 100,
    });

    const sphere = new THREE.Mesh(geometry, material);

    const lightTop = new THREE.DirectionalLight(0xffffff, 0.7);
    lightTop.position.set(0, 500, 200);
    lightTop.castShadow = true;
    scene.add(lightTop);

    const lightBottom = new THREE.DirectionalLight(0xffffff, 0.25);
    lightBottom.position.set(0, -500, 400);
    lightBottom.castShadow = true;
    scene.add(lightBottom);

    const ambientLight = new THREE.AmbientLight(0x798296);
    scene.add(ambientLight);

    scene.add(sphere);

    const update = () => {
      const time =
        performance.now() * 0.00001 * speedValue * Math.pow(processValue, 3);
      const spikes = spikeValue * processValue;

      const positions = sphere.geometry.attributes.position
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

      sphere.geometry.computeVertexNormals();
      sphere.geometry.attributes.position.needsUpdate = true;
    };

    const animate = () => {
      update();
      renderer.render(scene, camera);
      requestAnimationRef.current = requestAnimationFrame(animate);
    };
    requestAnimationRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(requestAnimationRef.current);
    };
  }, [speedValue, spikeValue, processValue]);

  return (
    <div id="blob">
      <canvas id="blob-canvas" ref={canvasRef} />
    </div>
  );
};

export default Blob;
