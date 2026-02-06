"use client"
import { OrbitControls, Stars } from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from 'three'
import planets from './data/planets.json'
import Planet from "./components/Planet";


export default function Home() {


  ['Ana', 'Artur', 'Davi', 'Thomas'].map((name) => <p>{name}</p>)



  const [showSunInfo, setShowSunInfo] = useState(false)
  return (
    <div className="w-screen h-screen bg-black">
      <Canvas camera={{position: [0, 20, 35], fov: 60}}>
        <ambientLight intensity={0.9}/>
        <Stars radius={300} depth={60} count={7000} factor={7}/>
        <Sol onClick={()=> setShowSunInfo(true)}/>
        {
          planets.map((planet) => (
            <Planet key={planet.id} planet={planet}/>
          ))
        }
        
       
        <OrbitControls enablePan enableZoom minDistance={10} maxDistance={100}/>

      </Canvas>
        <div className="absolute top-5 left-5 text-white bg-black p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-2">Sistema Solar</h2>
            <p className="text-sm">
              Arrastar para rotacionar <br/>
              Scroll para zoom <br/>
              Clique nos planetas
            </p>
        </div>

    {showSunInfo && <InformacoesSol onClose={()=> setShowSunInfo(false)}/>}
    </div>
  );
}

function Sol({onClick}){
  const sunRef = useRef()
  const [hovered, setHovered] = useState(false)
  const texture = useLoader(THREE.TextureLoader, 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Solarsystemscope_texture_2k_sun.jpg')

  useFrame(()=> {
    sunRef.current.rotation.y += 0.002
    sunRef.current.scale.setScalar(hovered ? 1.1 : 1)
  })

  return (
    <group>
      <mesh 
        ref={sunRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={onClick}
      >
        <sphereGeometry args={[2,32,32]}/>
        <meshBasicMaterial map={texture}/>
      </mesh>

      <pointLight intensity={2} distance={100}/>
    </group>
  )

}

function InformacoesSol({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-2xl p-8 max-w-lg w-full mx-4" style={{ boxShadow: '0 0 40px #fdb813' }}>
        <div className="flex items-center gap-4 mb-6">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/c/cb/Solarsystemscope_texture_2k_sun.jpg" 
            alt="Sol" 
            className="w-16 h-16 rounded-full object-cover" 
          />
          <h1 className="text-4xl font-bold text-white">Sol</h1>
        </div>
        
        <p className="text-lg text-gray-300 mb-6 leading-relaxed">
          A estrela no centro do Sistema Solar, responsável por 99,86% da massa total.
        </p>
        
        <div className="space-y-3 mb-6">
          <div className="flex justify-between py-3 border-b border-gray-700">
            <span className="text-gray-400 font-semibold">Diâmetro:</span>
            <span className="text-white">1.392.700 km</span>
          </div>
          <div className="flex justify-between py-3 border-b border-gray-700">
            <span className="text-gray-400 font-semibold">Temperatura superfície:</span>
            <span className="text-white">5.500°C</span>
          </div>
          <div className="flex justify-between py-3 border-b border-gray-700">
            <span className="text-gray-400 font-semibold">Temperatura núcleo:</span>
            <span className="text-white">15 milhões °C</span>
          </div>
        </div>
        
        <button
          onClick={onClose}
          className="w-full bg-yellow-500 py-3 rounded-lg text-black font-bold text-lg hover:opacity-90 transition"
        >
          Voltar
        </button>
      </div>
    </div>
  )
}