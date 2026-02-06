"use client";
import { useFrame, useLoader } from "@react-three/fiber";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import * as THREE from "three";

export default function Planet({ planet }) {
  const meshRef = useRef();
  const angle = useRef(Math.random() * Math.PI * 2);
  const [hovered, setHovered] = useState(false);
  const router = useRouter();

  const texture = useLoader(THREE.TextureLoader, planet.texture);

  useFrame((_, delta) => {
    angle.current += planet.speed * delta;
    meshRef.current.position.x = Math.cos(angle.current) * planet.distance;
    meshRef.current.position.z = Math.sin(angle.current) * planet.distance;
    meshRef.current.rotation.y += 0.01;
    meshRef.current.scale.setScalar(hovered ? 1.1 : 1);
  });

if (planet.name === "Saturno") {
    return (
      <group ref={meshRef}>
        <mesh
          onClick={() => router.push(`/PlanetInfo/${planet.id}`)}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <sphereGeometry args={[planet.radius, 32, 32]} />
          <meshStandardMaterial
            map={texture}
            emissive={hovered ? "#ffffff" : "#000000"}
            emissiveIntensity={hovered ? 0.2 : 0}
          />
        </mesh>

        <mesh
          rotation={[Math.PI / 2, 0, 0]}
          onClick={() => router.push(`/PlanetInfo/${planet.id}`)}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <ringGeometry args={[planet.radius * 1.2, planet.radius * 2, 64]} />
          <meshStandardMaterial
            color="#c9a869"
            side={THREE.DoubleSide}
            transparent
            opacity={0.8}
            emissive={hovered ? "#ffffff" : "#000000"}
            emissiveIntensity={hovered ? 0.1 : 0}
          />
        </mesh>
      </group>
    );
  }

  return (
    <mesh
      onClick={() => router.push(`/PlanetInfo/${planet.id}`)}
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[planet.radius, 32, 32]} />
      <meshStandardMaterial
        map={texture}
        emissive={hovered ? "#ffffff" : "#000000"}
        emissiveIntensity={hovered ? 0.2 : 0}
      />
    </mesh>
  );
}
