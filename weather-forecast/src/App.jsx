import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Clima from './Clima'

function App() {
  const [cityName, setCityName] = useState("")
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  async function searchWeather() {
    if(!cityName.trim()){
      setError("Informe uma cidade válida!")
      setWeather(null)
      return 
    }

    setLoading(true)
    setError(null)
    setWeather(null)
    try {
       const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=6fa075125c2a4a329ff707c1f429ddf0&units=metric&lang=pt`
      );

      if(!response.ok){
        if(response.status === 404){
          setError("404 - NOT FOUND")
        } else {
          setError("Aconteceu um erro. Tente novamente mais tarde.")
        }
      }
      const data = await response.json()
      setWeather({
        name: data.name, 
        temperature: data.main.temp,
        description: data.weather[0].description,
        icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
      })
    } catch (error) {
      setError(error.message)
    } finally { 
      setLoading(false)
    }
  }

  let ana = { 
    nome: "Ana",
    idade: 13
  }

  return (
    <div className="bg-teal-500 min-h-screen
    flex flex-col items-center p-6
    ">
      <div>
        <h1 className='text-3xl font-black
        text-teal-800 mb-3
        '
        >😎 PREVISÃO DO TEMPO</h1>
      </div>
      <div className='bg-teal-50 shadow-lg 
      rounded-xl p-5
      '>
        <input
        className='p-2 border
         border-teal-300 rounded-xl
         focus:outline-none 
         focus:ring-2
         focus:ring-teal-500
         '
        placeholder='Informe uma cidade'
        onChange={(event)=> setCityName(event.target.value)}
        />
        <button
        className='bg-teal-600 ms-5 rounded-xl
        p-2 text-teal-50 font-bold
        hover:bg-teal-400
        transition duration-300
        '
        onClick={searchWeather}
        >Pesquisar</button>
      </div>

    {
      weather && 
          <Clima weather={weather}
    />
    }
    {error && <p className='text-red-500'>{error}</p>}
    {loading && <p className='text-teal-800'>Carregando...</p>}



    </div>
  )
}

export default App
