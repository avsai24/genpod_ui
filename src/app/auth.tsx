'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { ReactNode, useEffect } from 'react'

export default function AuthGuard({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="h-screen flex items-center justify-center text-gray-400 text-sm">
        Authenticating...
      </div>
    )
  }

  // Session is ready
  if (status === 'authenticated') {
    return <>{children}</>
  }

  // While redirecting
  return null
}