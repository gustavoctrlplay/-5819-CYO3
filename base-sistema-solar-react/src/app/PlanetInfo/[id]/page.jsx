import React from "react";
import planets from "@/app/data/planets.json";
import BackButton from "@/app/components/BackButton";

export default async function page({ params }) {
  const { id } = await params;
  const planet = planets.find((planeta) => planeta.id === Number(id));

  if(!planet){
    return (
        <div className="fixed inset-o bg-black text-white flex items-center justify-center">
            <h1 className="text-3xl">Planeta não encontrado.</h1>
            <BackButton/>
        </div>
    )
  }


  console.log(planet)

  const planetColor = {
    'Mercúrio': '#a9a9a9',
    'Vênus': '#ffd700',
    'Terra': '#09F400',
    'Marte': '#ff4500',
    'Júpiter': '#daa520',
    'Saturno': '#f4a460',
    'Urano': '#4fd0e7',
    'Netuno': '#4169e1'
  }

  const color = planetColor[planet.name] || "#ffffff"

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
      <div
        className="bg-gray-900 rounded-2xl p-8 max-w-lg w-full mx-4"
        style={{ boxShadow: `0 0 40px ${color}` }}
      >
        <div className="flex items-center gap-4 mb-6">
          <img
            src={planet.texture}
            alt="Sol"
            className="w-16 h-16 rounded-full object-cover"
          />
          <h1 className="text-4xl font-bold text-white">{planet.name}</h1>
        </div>

        <p className="text-lg text-gray-300 mb-6 leading-relaxed">
          {planet.info}
        </p>

        <div className="space-y-3 mb-6">
          <div className="flex justify-between py-3 border-b border-gray-700">
            <span className="text-gray-400 font-semibold">Diâmetro:</span>
            <span className="text-white">{planet.diameter}</span>
          </div>
          <div className="flex justify-between py-3 border-b border-gray-700">
            <span className="text-gray-400 font-semibold">
              Temperatura superfície:
            </span>
            <span className="text-white">{planet.temp}</span>
          </div>
          <div className="flex justify-between py-3 border-b border-gray-700">
            <span className="text-gray-400 font-semibold">
              Distância do Sol:
            </span>
            <span className="text-white">{planet.distanceSun}</span>
          </div>
        </div>

            <BackButton/>

      </div>
    </div>
  );
}
