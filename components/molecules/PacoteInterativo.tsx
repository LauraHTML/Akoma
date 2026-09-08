'use client' 

import { useState } from 'react'
import { openPackage } from '@/actions/deliveries'

export default function PacoteInterativo({ delivery }: { delivery: any }) {
  // Guarda no estado visual do React se a caixa já foi aberta
  const [aberto, setAberto] = useState(delivery.is_opened)

  const handleAbrirPacote = async () => {
    // 1. Atualiza o visual IMEDIATAMENTE para o usuário (sua animação vai aqui)
    setAberto(true)
    
    // 2. Chama a Server Action em background para atualizar o banco de dados
    await openPackage(delivery.id)
  }

  return (
    <div className="border p-4 w-64 text-center rounded shadow-lg bg-white relative">
      <p className="text-sm text-gray-500 mb-4">
        De: {delivery.sender.name}
      </p>

      {!aberto ? (
        // VISUAL DO PACOTE FECHADO
        <button 
          onClick={handleAbrirPacote}
          className="bg-purple-600 text-white px-4 py-2 rounded-full hover:scale-105 transition-transform"
        >
          🎁 Clique para Abrir
        </button>
      ) : (
        // VISUAL DO PACOTE ABERTO (O CONTEÚDO)
        <div className="animate-in fade-in zoom-in duration-500">
          {delivery.content_type === 'text' && (
            <p className="italic font-serif text-lg">"{delivery.payload}"</p>
          )}

          {delivery.content_type === 'image' && (
             // eslint-disable-next-line @next/next/no-img-element
            <img src={delivery.payload} alt="Foto enviada" className="rounded" />
          )}

          {delivery.content_type === 'music' && (
            <iframe 
              src={`https://open.spotify.com/embed/track/${delivery.payload}`} 
              width="100%" 
              height="80" 
              allow="encrypted-media"
              className="rounded"
            ></iframe>
          )}
        </div>
      )}
    </div>
  )
}