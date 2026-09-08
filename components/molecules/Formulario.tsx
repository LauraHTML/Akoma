'use client'

import { useState } from 'react'
import { sendPackage } from '@/actions/deliveries'

export default function FormularioEnvio({ familiares }: { familiares: any[] }) {
  // Guardamos o tipo de conteúdo escolhido para mudar o input da tela
  const [tipo, setTipo] = useState('text')

  return (
    <form action={sendPackage} className="flex flex-col gap-5 bg-white p-6 rounded-lg shadow-md border">
      
      {/* 1. CAIXA DE SELEÇÃO: DESTINATÁRIO */}
      <div className="flex flex-col gap-1">
        <label htmlFor="receiver_id" className="font-semibold text-gray-700">Para quem é?</label>
        <select 
          name="receiver_id" 
          id="receiver_id" 
          required
          className="p-2 border rounded bg-gray-50 focus:ring-2 focus:ring-purple-500"
        >
          <option value="">Selecione um familiar...</option>
          {familiares.map((pessoa) => (
            <option key={pessoa.id} value={pessoa.id}>
              {pessoa.full_name}
            </option>
          ))}
        </select>
      </div>

      {/* 2. OPÇÕES DE TIPO DE CONTEÚDO (Radio Buttons são melhores que Select aqui) */}
      <div className="flex flex-col gap-1">
        <span className="font-semibold text-gray-700">O que você vai enviar?</span>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="radio" 
              name="content_type" 
              value="text" 
              checked={tipo === 'text'}
              onChange={() => setTipo('text')}
            /> 📝 Recado
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="radio" 
              name="content_type" 
              value="image" 
              onChange={() => setTipo('image')}
            /> 🖼️ Imagem
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="radio" 
              name="content_type" 
              value="music" 
              onChange={() => setTipo('music')}
            /> 🎵 Música
          </label>
        </div>
      </div>

      {/* 3. CAMPO DINÂMICO DO CONTEÚDO (PAYLOAD) */}
      <div className="flex flex-col gap-1">
        <label htmlFor="payload" className="font-semibold text-gray-700">
          {tipo === 'text' && 'Escreva seu recado:'}
          {tipo === 'image' && 'Cole o link da imagem (URL):'}
          {tipo === 'music' && 'Cole o ID da música do Spotify:'}
        </label>
        
        {tipo === 'text' ? (
          <textarea 
            name="payload" 
            id="payload" 
            required 
            rows={4}
            className="p-2 border rounded resize-none focus:ring-2 focus:ring-purple-500"
            placeholder="Digite algo carinhoso..."
          />
        ) : (
          <input 
            type="text" 
            name="payload" 
            id="payload" 
            required 
            className="p-2 border rounded focus:ring-2 focus:ring-purple-500"
            placeholder={tipo === 'image' ? 'https://exemplo.com/foto.jpg' : 'Ex: 4uLU6hMCjMI75M1A2tKUQC'}
          />
        )}
      </div>

      {/* 4. BOTÃO DE ENVIO */}
      <button 
        type="submit" 
        className="mt-4 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded transition-colors"
      >
        Embalar e Enviar 🎁
      </button>

    </form>
  )
}