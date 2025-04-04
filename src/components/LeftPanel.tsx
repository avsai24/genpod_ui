'use client'

import { useState } from 'react'
import ChatTab from './LeftPanel/ChatTab'
import MetricsTab from './LeftPanel/MetricsTab'
import LogsTab from './LeftPanel/LogsTab'

const TABS = ['Chat', 'Metrics', 'Logs'] as const
type Tab = (typeof TABS)[number]

export default function LeftPanel() {
  const [activeTab, setActiveTab] = useState<Tab>('Chat')

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Chat':
        return <ChatTab />
      case 'Metrics':
        return <MetricsTab />
      case 'Logs':
        return <LogsTab /> 
    }
  }

  return (
    <div className="h-full flex flex-col bg-white text-gray-900">
      {/* Tab Buttons */}
      <div className="flex border-b bg-gray-100 text-sm">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-medium ${
              activeTab === tab
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-700 hover:text-blue-500'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-auto">{renderTabContent()}</div>
    </div>
  )
}