import { useEffect, useRef } from "react";
import * as THREE from "three";
import { PerspectiveCamera, useHelper, OrbitControls } from "@react-three/drei";

import gsap from "gsap";
import { useThree } from "@react-three/fiber";
import { useControls, folder } from "leva";

const povs = [
  {
    position: [1, 4, 10],
    lookAt: [-3, 0, 4],
  },
  {
    position: [-6, 10, -5],
    lookAt: [3, 0, 0],
  },
];

function Foo({ camera }) {
  const { camera: defaultCamera } = useThree();
  camera ??= defaultCamera;

  const orbitRef = useRef();
  const camARef = useRef();
  const camBRef = useRef();

  const iRef = useRef(0);

  useEffect(() => {
    camARef.current.lookAt(...povs[0].lookAt);
    camBRef.current.lookAt(...povs[1].lookAt);
  }, []);

  useHelper(camARef, THREE.CameraHelper, "cyan");
  useHelper(camBRef, THREE.CameraHelper, "yellow");

  const { duration } = useControls({
    gsap: folder({
      duration: {
        value: 1,
        step: 0.1,
        min: 0,
      },
    }),
  });

  const handleClick = (e) => {
    console.log("click", iRef.current);

    const cams = [camARef.current, camBRef.current];
    const i = iRef.current % cams.length;

    gsap.to(camera.position, {
      ...cams[i].position,
      duration,
    });

    const target = povs.map(({ lookAt }) =>
      new THREE.Vector3().fromArray(lookAt)
    )[i];

    gsap.to(orbitRef.current.target, {
      ...target,
      duration,
    });

    iRef.current++;
  };

  return (
    <>
      <OrbitControls ref={orbitRef} camera={camera} />

      <PerspectiveCamera
        ref={camARef}
        position={povs[0].position}
        near={1}
        far={20}
      />
      <PerspectiveCamera
        ref={camBRef}
        position={povs[1].position}
        near={1}
        far={20}
      />

      <mesh position={povs[0].lookAt} castShadow onClick={handleClick}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="blue" />
      </mesh>

      <mesh position={povs[1].lookAt} castShadow onClick={handleClick}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="red" />
      </mesh>
    </>
  );
}

export default Foo;
