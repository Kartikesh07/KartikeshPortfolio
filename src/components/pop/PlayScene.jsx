import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei/core/RoundedBox";
import * as THREE from "three";

const palette = {
  pink: "#ed70a4",
  darkPink: "#c73f77",
  green: "#174c3d",
  yellow: "#ffc843",
  blue: "#3d63ce",
  cream: "#fff2ce",
};

function Block({ size, color, radius = 0.08, ...props }) {
  return (
    <RoundedBox args={size} radius={radius} smoothness={3} {...props}>
      <meshStandardMaterial color={color} roughness={0.36} metalness={0.05} />
    </RoundedBox>
  );
}

function FlowerSculpture({ color, ...props }) {
  return (
    <group {...props}>
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i * Math.PI) / 4;
        return (
          <mesh
            key={i}
            position={[Math.sin(angle) * 0.29, Math.cos(angle) * 0.29, 0]}
            rotation={[0, 0, -angle]}
            scale={[0.17, 0.31, 0.13]}
          >
            <sphereGeometry args={[1, 16, 12]} />
            <meshStandardMaterial color={color} roughness={0.42} />
          </mesh>
        );
      })}
      <mesh position={[0, 0, 0.14]}>
        <sphereGeometry args={[0.2, 20, 16]} />
        <meshStandardMaterial color={palette.cream} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0, 0.31]}>
        <sphereGeometry args={[0.07, 16, 12]} />
        <meshStandardMaterial color={palette.green} />
      </mesh>
    </group>
  );
}

function PaperKite() {
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0.62);
    shape.lineTo(0.42, 0);
    shape.lineTo(0, -0.6);
    shape.lineTo(-0.42, 0);
    shape.closePath();
    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.035,
      bevelEnabled: true,
      bevelSegments: 1,
      steps: 1,
      bevelSize: 0.01,
      bevelThickness: 0.01,
    });
  }, []);
  const tail = useMemo(
    () =>
      new THREE.TubeGeometry(
        new THREE.CatmullRomCurve3([
          new THREE.Vector3(0, -0.6, 0),
          new THREE.Vector3(0.12, -0.85, 0),
          new THREE.Vector3(-0.1, -1.1, 0),
          new THREE.Vector3(0.08, -1.4, 0),
        ]),
        24,
        0.012,
        5,
        false,
      ),
    [],
  );
  useEffect(
    () => () => {
      geometry.dispose();
      tail.dispose();
    },
    [geometry, tail],
  );
  return (
    <group position={[1.48, 1.21, -0.18]} rotation={[0.1, -0.28, -0.28]}>
      <mesh geometry={geometry}>
        <meshStandardMaterial color={palette.blue} roughness={0.8} />
      </mesh>
      <mesh position={[0, 0, 0.045]}>
        <planeGeometry args={[0.026, 1.17]} />
        <meshStandardMaterial color={palette.cream} />
      </mesh>
      <mesh position={[0, 0, 0.045]}>
        <planeGeometry args={[0.83, 0.022]} />
        <meshStandardMaterial color={palette.cream} />
      </mesh>
      <mesh position={[0, 0, 0.06]} rotation={[0, 0, Math.PI / 4]}>
        <planeGeometry args={[0.28, 0.28]} />
        <meshStandardMaterial color={palette.yellow} side={THREE.DoubleSide} />
      </mesh>
      <mesh geometry={tail}>
        <meshStandardMaterial color={palette.green} />
      </mesh>
      <mesh position={[0.06, -0.85, 0]} rotation={[0, 0, 0.4]}>
        <boxGeometry args={[0.25, 0.09, 0.025]} />
        <meshStandardMaterial color={palette.pink} />
      </mesh>
      <mesh position={[-0.06, -1.14, 0]} rotation={[0, 0, -0.35]}>
        <boxGeometry args={[0.2, 0.08, 0.025]} />
        <meshStandardMaterial color={palette.yellow} />
      </mesh>
    </group>
  );
}

function Console({ theme, screen, onPlay }) {
  const patterns = [
    [
      "00100100",
      "01111110",
      "11111111",
      "01100110",
      "01100110",
      "11111111",
      "01111110",
      "00100100",
    ],
    [
      "00011000",
      "00111100",
      "01111110",
      "11111111",
      "01111110",
      "00111100",
      "00011000",
      "00010000",
    ],
    [
      "01100110",
      "11111111",
      "11111111",
      "11111111",
      "01111110",
      "00111100",
      "00011000",
      "00000000",
    ],
  ];
  const pixels = patterns[screen];
  return (
    <group rotation={[-0.08, -0.29, -0.17]}>
      <Block
        size={[2.17, 3.1, 0.45]}
        color={theme.edge}
        radius={0.2}
        position={[0.015, 0, -0.1]}
      />
      <Block size={[2.12, 3.04, 0.32]} color={theme.shell} radius={0.18} />
      <Block
        size={[1.78, 1.52, 0.075]}
        color={palette.green}
        radius={0.12}
        position={[0, 0.5, 0.185]}
      />
      <Block
        size={[1.49, 1.21, 0.025]}
        color="#c9df82"
        radius={0.07}
        position={[0, 0.51, 0.23]}
      />
      <group position={[-0.385, 0.88, 0.25]}>
        {pixels.flatMap((row, y) =>
          [...row].map(
            (pixel, x) =>
              pixel === "1" && (
                <mesh key={`${x}-${y}`} position={[x * 0.109, -y * 0.109, 0]}>
                  <planeGeometry args={[0.097, 0.097]} />
                  <meshBasicMaterial color={palette.green} />
                </mesh>
              ),
          ),
        )}
      </group>
      <mesh position={[-0.72, 1.36, 0.18]}>
        <sphereGeometry args={[0.038, 12, 8]} />
        <meshStandardMaterial
          color={palette.yellow}
          emissive={palette.yellow}
          emissiveIntensity={0.4}
        />
      </mesh>
      <Block
        size={[0.29, 0.76, 0.14]}
        color={palette.green}
        radius={0.035}
        position={[-0.56, -0.64, 0.25]}
      />
      <Block
        size={[0.76, 0.29, 0.145]}
        color={palette.green}
        radius={0.035}
        position={[-0.56, -0.64, 0.26]}
      />
      <mesh
        position={[0.48, -0.75, 0.28]}
        rotation={[Math.PI / 2, 0, 0]}
        onClick={(event) => {
          event.stopPropagation();
          onPlay();
        }}
      >
        <cylinderGeometry args={[0.2, 0.21, 0.17, 28]} />
        <meshStandardMaterial color={palette.blue} roughness={0.3} />
      </mesh>
      <mesh
        position={[0.82, -0.44, 0.28]}
        rotation={[Math.PI / 2, 0, 0]}
        onClick={(event) => {
          event.stopPropagation();
          onPlay();
        }}
      >
        <cylinderGeometry args={[0.2, 0.21, 0.17, 28]} />
        <meshStandardMaterial color={palette.yellow} roughness={0.3} />
      </mesh>
      {[-0.15, 0.17].map((x) => (
        <Block
          key={x}
          size={[0.21, 0.065, 0.03]}
          radius={0.02}
          color={palette.darkPink}
          position={[x, -1.08, 0.18]}
          rotation={[0, 0, 0.15]}
        />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <Block
          key={i}
          size={[0.035, 0.22, 0.03]}
          radius={0.01}
          color={palette.darkPink}
          position={[0.43 + i * 0.1, -1.21, 0.18]}
          rotation={[0, 0, -0.22]}
        />
      ))}
    </group>
  );
}

function Composition({ running, theme, screen, spin, onPlay }) {
  const viewportWidth = useThree((state) => state.viewport.width);
  const group = useRef(null);
  const elapsed = useRef(0);
  const spinAngle = useRef(0);
  const lastSpin = useRef(spin);
  const flower = useRef(null);
  const ring = useRef(null);
  useEffect(() => {
    spinAngle.current += (spin - lastSpin.current) * Math.PI * 2;
    lastSpin.current = spin;
  }, [spin]);
  useEffect(() => {
    if (!running && group.current) {
      // Keep the pixel display facing the visitor when motion is paused.
      spinAngle.current = 0;
      group.current.rotation.set(0, 0, 0);
      group.current.position.y = 0;
    }
  }, [running]);
  useFrame((state, delta) => {
    if (!running) return;
    elapsed.current += Math.min(delta, 0.05);
    group.current.position.y = Math.sin(elapsed.current * 0.7) * 0.07;
    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      spinAngle.current + state.pointer.x * 0.3,
      4,
      delta,
    );
    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      -state.pointer.y * 0.16,
      3,
      delta,
    );
    flower.current.rotation.z = elapsed.current * 0.16;
    ring.current.rotation.z = -0.4 + Math.sin(elapsed.current * 0.6) * 0.25;
  });
  return (
    <group ref={group} scale={Math.min(1, viewportWidth / 4.2)}>
      <Console theme={theme} screen={screen} onPlay={onPlay} />
      <PaperKite />
      <group ref={flower} position={[-1.49, 1.28, 0.3]}>
        <FlowerSculpture
          color={palette.yellow}
          rotation={[0.2, -0.15, 0.1]}
          scale={0.78}
        />
      </group>
      <mesh
        ref={ring}
        position={[-1.27, -0.98, 0.2]}
        rotation={[0.65, 0.4, -0.4]}
      >
        <torusGeometry args={[0.34, 0.095, 16, 40]} />
        <meshStandardMaterial color={palette.blue} roughness={0.26} />
      </mesh>
      <FlowerSculpture
        color={palette.green}
        position={[1.36, -1.15, 0.2]}
        rotation={[0.15, 0.25, -0.2]}
        scale={0.65}
      />
      <mesh position={[0.84, 1.85, 0.1]}>
        <sphereGeometry args={[0.1, 16, 12]} />
        <meshStandardMaterial color={palette.pink} />
      </mesh>
      <mesh position={[-1.64, -0.07, -0.1]} rotation={[0.3, 0.3, 0.5]}>
        <boxGeometry args={[0.17, 0.17, 0.17]} />
        <meshStandardMaterial color={palette.yellow} />
      </mesh>
    </group>
  );
}

function ContextMonitor({ onFailure, onReady }) {
  const { gl, invalidate } = useThree();
  useEffect(() => {
    const canvas = gl.domElement;
    const lost = (event) => {
      event.preventDefault();
      onFailure();
    };
    canvas.addEventListener("webglcontextlost", lost);
    invalidate();
    onReady();
    return () => canvas.removeEventListener("webglcontextlost", lost);
  }, [gl, invalidate, onFailure, onReady]);
  return null;
}

export default function PlayScene({
  running,
  onReady,
  onFailure,
  theme,
  screen,
  spin,
  onPlay,
}) {
  return (
    <Canvas
      className="play-canvas"
      camera={{ position: [0, 0, 7.5], fov: 37 }}
      dpr={[1, 1.5]}
      frameloop={running ? "always" : "demand"}
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
    >
      <ambientLight intensity={1.4} />
      <directionalLight position={[-3, 6, 6]} intensity={3.2} />
      <directionalLight position={[3, -2, 2]} intensity={0.6} color="#e3d4ff" />
      <Composition
        running={running}
        theme={theme}
        screen={screen}
        spin={spin}
        onPlay={onPlay}
      />
      <ContextMonitor onReady={onReady} onFailure={onFailure} />
    </Canvas>
  );
}
