import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei/core/RoundedBox";
import * as THREE from "three";
function Rosette() {
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    for (let i = 0; i <= 192; i++) {
      const angle = i / 192 * Math.PI * 2;
      const radius = 1.25 + 0.17 * Math.cos(angle * 8);
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      if (i === 0) shape.moveTo(x, y);else shape.lineTo(x, y);
    }
    const hole = new THREE.Path();
    hole.absarc(0, 0, 0.55, 0, Math.PI * 2, true);
    shape.holes.push(hole);
    const result = new THREE.ExtrudeGeometry(shape, {
      depth: 0.32,
      bevelEnabled: true,
      bevelSegments: 5,
      steps: 1,
      bevelSize: 0.12,
      bevelThickness: 0.12,
      curveSegments: 48
    });
    result.center();
    return result;
  }, []);
  useEffect(() => () => geometry.dispose(), [geometry]);
  return <mesh geometry={geometry}>
    <meshStandardMaterial color="#ef598d" roughness={0.28} metalness={0.12} />
  </mesh>;
}
function Composition({
  running
}) {
  const group = useRef(null);
  const ring = useRef(null);
  const time = useRef(0);
  const width = useThree(state => state.viewport.width);
  useFrame((_, delta) => {
    if (!running) return;
    time.current += Math.min(delta, 0.05);
    const t = time.current;
    group.current.position.y = Math.sin(t * 0.65) * 0.065;
    group.current.rotation.y = -0.28 + Math.sin(t * 0.3) * 0.12;
    group.current.rotation.z = -0.17 + Math.sin(t * 0.4) * 0.045;
    ring.current.rotation.z = t * 0.045;
  });
  useEffect(() => {
    if (!running && group.current) {
      group.current.position.y = 0;
      group.current.rotation.set(0.08, -0.28, -0.17);
    }
  }, [running]);
  return <group ref={group} scale={Math.min(1.12, width / 4.6)} rotation={[0.08, -0.28, -0.17]}>
    <group ref={ring} rotation={[0, 0, -0.1]}>
      <Rosette />
    </group>
    <mesh position={[0, 0, 0.06]}>
      <sphereGeometry args={[0.46, 48, 32]} />
      <meshStandardMaterial color="#284ce4" roughness={0.22} metalness={0.15} />
    </mesh>
    <mesh rotation={[1.12, 0.18, -0.5]}>
      <torusGeometry args={[1.8, 0.105, 20, 112]} />
      <meshStandardMaterial color="#ffcb46" metalness={0.22} roughness={0.26} />
    </mesh>
    <mesh position={[1.13, 1.48, -0.1]}>
      <sphereGeometry args={[0.38, 40, 28]} />
      <meshStandardMaterial color="#ffcb46" roughness={0.3} metalness={0.1} />
    </mesh>
    <RoundedBox args={[0.54, 0.54, 0.54]} radius={0.055} smoothness={3} position={[-1.46, 1.13, 0.12]} rotation={[0.4, 0.5, -0.15]}>
      <meshStandardMaterial color="#284ce4" roughness={0.28} metalness={0.12} />
    </RoundedBox>
    <mesh position={[1.55, -1.18, 0.2]} rotation={[0.7, 0.45, 0.2]}>
      <torusGeometry args={[0.32, 0.12, 20, 48]} />
      <meshStandardMaterial color="#087457" roughness={0.28} metalness={0.15} />
    </mesh>
    <mesh position={[-1.02, -1.52, -0.2]}>
      <sphereGeometry args={[0.17, 24, 16]} />
      <meshStandardMaterial color="#087457" roughness={0.3} />
    </mesh>
  </group>;
}
function ContextMonitor({
  onReady,
  onFailure
}) {
  const {
    gl,
    invalidate
  } = useThree();
  useEffect(() => {
    const canvas = gl.domElement;
    const lost = event => {
      event.preventDefault();
      onFailure();
    };
    canvas.addEventListener("webglcontextlost", lost);
    invalidate();
    onReady();
    return () => canvas.removeEventListener("webglcontextlost", lost);
  }, [gl, invalidate, onReady, onFailure]);
  return null;
}
export default function PlayScene({
  running,
  onReady,
  onFailure
}) {
  return <Canvas className="play-canvas" camera={{
    position: [0, 0, 7.8],
    fov: 38
  }} dpr={[1, 1.5]} frameloop={running ? "always" : "demand"} gl={{
    alpha: true,
    antialias: true,
    powerPreference: "low-power"
  }}>
    <ambientLight intensity={1.3} />
    <hemisphereLight args={["#fff4df", "#83788e", 1.3]} />
    <directionalLight position={[-3, 6, 5]} intensity={3.5} color="#fff6e5" />
    <directionalLight position={[4, 0, -2]} intensity={2.2} color="#d8e7ff" />
    <Composition running={running} />
    <ContextMonitor onReady={onReady} onFailure={onFailure} />
  </Canvas>;
}
