"use client";

// Móvil en 3D real (Three.js vía react-three-fiber): geometría con biselado,
// material metálico/clearcoat y la pantalla texturizada con capturas reales
// de Nexus, que rotan con crossfade. Reacciona al puntero (parallax) y hace
// una leve rotación/flotación automática cuando no se interactúa.

import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { RoundedBox, useTexture } from "@react-three/drei";
import * as THREE from "three";
import styles from "./Phone3D.module.css";

const SHOTS = [
  "/games/nexus/screenshots/01_menu.png",
  "/games/nexus/screenshots/02_campana.png",
  "/games/nexus/screenshots/03_elige_giro.png",
  "/games/nexus/screenshots/04_espejo_gameplay.png",
  "/games/nexus/screenshots/05_congelado_gameplay.png",
  "/games/nexus/screenshots/06_cadena_gameplay.png",
  "/games/nexus/screenshots/07_clasico_progreso.png",
];

const SHOT_ASPECT = 640 / 1422;
const SCREEN_HEIGHT = 3.35;
const SCREEN_WIDTH = SCREEN_HEIGHT * SHOT_ASPECT;
const BEZEL = 0.065;
const BOX_WIDTH = SCREEN_WIDTH + BEZEL * 2;
const BOX_HEIGHT = SCREEN_HEIGHT + BEZEL * 2;
const BOX_DEPTH = 0.16;
const HOLD = 2.8;
const FADE = 0.55;
const CYCLE = HOLD + FADE;

function Screen({ accent }: { accent: string }) {
  const textures = useTexture(SHOTS);
  const [index, setIndex] = useState(0);
  const matRef = useRef<THREE.MeshBasicMaterial>(null);
  const elapsed = useRef(0);

  useFrame((_, delta) => {
    elapsed.current += delta;
    const local = elapsed.current % CYCLE;
    const opacity = local > HOLD ? 1 - (local - HOLD) / FADE : 1;
    if (matRef.current) matRef.current.opacity = opacity;
    if (elapsed.current >= CYCLE) {
      elapsed.current = 0;
      setIndex((i) => (i + 1) % textures.length);
    }
  });

  return (
    <group>
      <mesh position={[0, 0, 0.083]} renderOrder={1}>
        <planeGeometry args={[SCREEN_WIDTH + 0.045, SCREEN_HEIGHT + 0.045]} />
        <meshBasicMaterial color={accent} toneMapped={false} opacity={0.28} transparent depthWrite={false} />
      </mesh>
      <mesh position={[0, 0, 0.086]} renderOrder={2}>
        <planeGeometry args={[SCREEN_WIDTH, SCREEN_HEIGHT]} />
        <meshBasicMaterial
          ref={matRef}
          map={textures[index]}
          transparent
          toneMapped={false}
          depthWrite={false}
        />
      </mesh>
      {/* cámara frontal tipo "punch-hole", integrada en la pantalla */}
      <mesh position={[0, SCREEN_HEIGHT / 2 - 0.16, 0.089]} renderOrder={3}>
        <circleGeometry args={[0.032, 24]} />
        <meshBasicMaterial color="#02040a" />
      </mesh>
    </group>
  );
}

function PhoneModel({ accent }: { accent: string }) {
  const group = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    const targetY = 0.15 + pointer.x * 0.35 + Math.sin(t * 0.22) * 0.03;
    const targetX = 0.05 - pointer.y * 0.18;
    group.current.rotation.y += (targetY - group.current.rotation.y) * 0.08;
    group.current.rotation.x += (targetX - group.current.rotation.x) * 0.08;
    group.current.position.y = Math.sin(t * 0.55) * 0.06;
  });

  return (
    <group ref={group}>
      <RoundedBox args={[BOX_WIDTH, BOX_HEIGHT, BOX_DEPTH]} radius={0.13} smoothness={8}>
        <meshPhysicalMaterial
          color="#15192c"
          roughness={0.42}
          metalness={0.55}
          clearcoat={0.6}
          clearcoatRoughness={0.28}
          envMapIntensity={0.5}
        />
      </RoundedBox>

      <Suspense fallback={null}>
        <Screen accent={accent} />
      </Suspense>

      {/* botón de encendido */}
      <mesh position={[BOX_WIDTH / 2 + 0.008, 0.55, 0]}>
        <boxGeometry args={[0.02, 0.34, 0.05]} />
        <meshStandardMaterial color="#0c0f1e" roughness={0.4} metalness={0.6} />
      </mesh>
      {/* botones de volumen */}
      <mesh position={[-BOX_WIDTH / 2 - 0.008, 0.9, 0]}>
        <boxGeometry args={[0.02, 0.22, 0.05]} />
        <meshStandardMaterial color="#0c0f1e" roughness={0.4} metalness={0.6} />
      </mesh>
      <mesh position={[-BOX_WIDTH / 2 - 0.008, 0.55, 0]}>
        <boxGeometry args={[0.02, 0.22, 0.05]} />
        <meshStandardMaterial color="#0c0f1e" roughness={0.4} metalness={0.6} />
      </mesh>
    </group>
  );
}

export function Phone3D({ accent = "#4fd6c0" }: { accent?: string }) {
  return (
    <div className={styles.canvasWrap}>
      <Canvas
        camera={{ position: [0, 0, 7.8], fov: 29 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.75} />
        <directionalLight position={[3, 4, 5]} intensity={1.3} />
        <directionalLight position={[-4, -2, 2]} intensity={0.2} color={accent} />
        <Suspense fallback={null}>
          <PhoneModel accent={accent} />
        </Suspense>
      </Canvas>
    </div>
  );
}
