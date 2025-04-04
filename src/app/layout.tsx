// src/app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'
import SplitLayout from '@/components/layouts/SplitLayout'
import LeftPanel from '@/components/LeftPanel'
import RightPanel from '@/components/RightPanel'

export const metadata: Metadata = {
  title: 'Genpod UI',
  description: 'Frontend for Genpod',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <SplitLayout
          left={<LeftPanel />}
          right={<RightPanel />}
        />
      </body>
    </html>
  )
}