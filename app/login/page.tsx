// app/login/page.tsx
'use client'

import Script from 'next/script'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClient()

  async function handleSignInWithGoogle(response: any) {
    const { data, error } = await supabase.auth.signInWithIdToken({
      provider: 'google',
      token: response.credential,
    })

    if (error) {
      console.error('Erro ao logar com Google:', error)
      return
    }

    // login deu certo, redireciona
    router.push('/dashboard')
  }

  // expõe a função no escopo global, pois o Google chama ela via callback
  if (typeof window !== 'undefined') {
    ;(window as any).handleSignInWithGoogle = handleSignInWithGoogle
  }

  return (
    <>
      <Script src="https://accounts.google.com/gsi/client" strategy="afterInteractive" />
      <div
        id="g_id_onload"
        data-client_id={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
        data-context="signin"
        data-ux_mode="popup"
        data-callback="handleSignInWithGoogle"
        data-auto_select="true"
        data-itp_support="true"
        data-use_fedcm_for_prompt="true"
      />
      <div
        className="g_id_signin"
        data-type="standard"
        data-shape="pill"
        data-theme="outline"
        data-text="signin_with"
        data-size="large"
        data-logo_alignment="left"
      />
    </>
  )
}