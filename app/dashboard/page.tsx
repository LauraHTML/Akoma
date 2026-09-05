'use client'
import { useRouter } from 'next/navigation'

const Dashboard = () => {
  const router = useRouter()
  return (
    <div>
        <p>bem vindo ao dashboard</p>
        <button onClick={() => router.push('/chat')}>Ir para chat</button>
    </div>
  )
}

export default Dashboard
