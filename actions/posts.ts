'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'

// CREATE: Criar um novo recado
export async function createPost(formData: FormData) {
    try{
    const supabase = await createClient()
    
    const title = formData.get('title') as string
    const content = formData.get('content') as string
    const color = formData.get('color') as string

    // Pega o usuário logado atualmente
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        throw new Error('Você precisa estar logado para postar!')
    }

    await supabase.from('posts').insert({
        author_id: user.id,
        title,
        content
    })
    // Avisa o Next.js para atualizar os dados da tela do mural instantaneamente
    revalidatePath('/mural')
    }
    catch(err){
        console.error("Erro ao criar post: ", err);
        
    };
  
};

// DELETE: Excluir um recado
export async function deletePost(postId: string) {
  const supabase = await createClient()
  
  await supabase.from('posts').delete().eq('id', postId)

  revalidatePath('/mural')
};
