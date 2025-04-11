'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { ReactNode, useEffect } from 'react'

export default function AuthGuard({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    console.log('[AuthGuard]', { status, session }) // Debug

    if (status === 'unauthenticated') {
      router.replace('/login')
    }
  }, [status, router, session])

  if (status === 'loading') {
    return (
      <div className="h-screen flex items-center justify-center text-gray-400 text-sm">
        Checking authentication...
      </div>
    )
  }

  if (status === 'unauthenticated') return null

  return <>{children}</>
}