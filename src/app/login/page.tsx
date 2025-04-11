'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff } from 'lucide-react'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await signIn('credentials', {
      redirect: false,
      username,
      password,
    })

    if (res?.error) {
      setError('Invalid credentials')
    } else {
      router.push('/')
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white px-4 overflow-hidden">
      {/* Background placeholder */}
      <div className="absolute inset-0 opacity-10 pointer-events-none z-0">
        {/* Add illustration/video later if needed */}
      </div>

      <form
        onSubmit={handleLogin}
        className="relative z-20 w-full max-w-md rounded-xl border border-[#2a2a2a] bg-[#1a1a1a]/80 backdrop-blur p-8 shadow-xl space-y-5"
      >
        <div className="text-center space-y-1">
          <h2 className="text-3xl font-bold">🔐 Genpod Login</h2>
          <p className="text-sm text-gray-400">Secure access to your Genpod workspace</p>
        </div>

        {error && <div className="text-red-500 text-sm">{error}</div>}

        <div className="space-y-3">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 rounded bg-[#0a0a0a] border border-[#2a2a2a] focus:outline-none focus:border-[#14b8a6] text-sm"
            autoFocus
          />

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded bg-[#0a0a0a] border border-[#2a2a2a] focus:outline-none focus:border-[#14b8a6] text-sm pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-white transition"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Remember Me + Forgot */}
        <div className="flex items-center justify-between text-sm text-gray-400 mt-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="accent-[#14b8a6] rounded-sm"
            />
            Remember Me
          </label>
          <button
            type="button"
            className="text-[#14b8a6] hover:text-[#0d9488] transition"
            onClick={() => alert('Forgot Password?')}
          >
            Forgot Password?
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-[#14b8a6] hover:bg-[#0d9488] text-white py-2 rounded font-medium transition"
        >
          Sign In
        </button>
      </form>
    </div>
  )
}