import { createClient } from '@/utils/supabase/server'
import { createPost, deletePost } from '@/actions/posts'

export default async function MuralPage() {
  const supabase = await createClient()

  // READ: Busca direto no banco durante a renderização no servidor
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*, profiles!posts_author_id_fkey(full_name)')
    .order('created_at', { ascending: false })

    console.log(error)

  return (
    <main className="p-8 bg-amber-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">aabu bu ble</h1>

      {/* CREATE: Formulário chamando a Server Action diretamente */}
      <form action={createPost} className="mb-8 p-4 bg-white rounded shadow-md max-w-md">
        <input 
          name="title" 
          placeholder="Título do recado" 
          required 
          className="w-full border p-2 mb-2 rounded" 
        />
        <textarea 
          name="content" 
          placeholder="Escreva algo carinhoso..." 
          required 
          className="w-full border p-2 mb-2 rounded" 
        />
        <input type="hidden" name="color" value="#fef08a" />
        
        <button type="submit" className="bg-amber-500 text-white px-4 py-2 rounded">
          Prender no Quadro
        </button>
      </form>

      {/* LISTAGEM DOS POSTS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {posts?.map((post) => (
          <div key={post.id} className="p-4 rounded shadow">
            <h3 className="font-bold">{post.title}</h3>
            <p className="mt-2 text-sm">{post.content}</p>
            <span className="text-xs text-gray-500 block mt-4">Por: {post.profiles?.full_name}</span>

            {/* DELETE: Formulário compacto disparando a exclusão */}
            <form action={deletePost.bind(null, post.id)} className="mt-2">
              <button type="submit" className="text-red-600 text-xs hover:underline">
                Remover
              </button>
            </form>
          </div>
        ))}
      </div>
    </main>
  )
}