"use client"
import React from 'react'

export default function BackButton() {
  return (
    <button 
    className='w-full py-3 text-white font-bold text-lg hover:opacity-90 transition'
    onClick={()=> history.back()}
    >
      Voltar
    </button>
  )
}
