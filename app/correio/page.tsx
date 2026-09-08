import { createClient } from '@/utils/supabase/server'
import PacoteInterativo from '@/components/molecules/PacoteInterativo'
import FormularioEnvio from '@/components/molecules/Formulario'

export default async function CorreioPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // READ: Busca todos os pacotes onde o receiver_id é o meu usuário
  const { data: deliveries,error } = await supabase
    .from('deliveries')
    .select('*, sender:profiles!sender_id(full_name), receiver:profiles!receiver_id(full_name)')
    .eq('receiver_id', user?.id)
    .order('created_at', { ascending: false })

    const { data: familiares } = await supabase
    .from('profiles')
    .select('id, full_name')
    .order('full_name')

    console.log(error)

  return (
    <main className="p-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Minhas Correspondências</h1>

      <FormularioEnvio familiares={familiares || []} />
      
      <div className="flex gap-6 flex-wrap">
        {deliveries?.map((delivery) => (
          // Passamos os dados para um Client Component cuidar da animação
          <PacoteInterativo key={delivery.id} delivery={delivery} />
        ))}
      </div>
    </main>
  )
}