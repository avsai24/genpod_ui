'use client'

import Split from 'react-split'
import React from 'react'

export default function SplitLayout({
  left,
  right,
}: {
  left: React.ReactNode
  right: React.ReactNode
}) {
  return (
    <Split
      className="flex w-full h-screen"
      sizes={[50, 50]}
      minSize={200}
      gutterSize={6}
      direction="horizontal"
      style={{ display: 'flex' }}
    >
      <div className="h-full overflow-auto bg-gray-100 border-r">{left}</div>
      <div className="h-full overflow-auto bg-white">{right}</div>
    </Split>
  )
}