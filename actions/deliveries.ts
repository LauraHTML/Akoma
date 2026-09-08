'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'

// CREATE: Enviar um pacote para alguém
export async function sendPackage(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) throw new Error('Você precisa estar logado!')

  const receiver_id = formData.get('receiver_id') as string
  const content_type = formData.get('content_type') as string // 'text', 'image', 'music'
  const payload = formData.get('payload') as string

  await supabase.from('deliveries').insert({
    sender_id: user.id,
    receiver_id: receiver_id,
    content_type: content_type,
    payload: payload,
    is_opened: false // Todo pacote começa fechado
  });

  // Atualiza a tela de quem vai receber
  revalidatePath('/correio');
};

// UPDATE: Mudar o status de fechado para aberto
export async function openPackage(deliveryId: string) {
  const supabase = await createClient()
  
  await supabase
    .from('deliveries')
    .update({ is_opened: true })
    .eq('id', deliveryId)

  revalidatePath('/correio');
}