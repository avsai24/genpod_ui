'use client'

import { useState } from 'react'

const TABS = ['Code', 'Preview', 'Configure', 'Insights'] as const
type Tab = (typeof TABS)[number]

export default function RightPanel() {
  const [activeTab, setActiveTab] = useState<Tab>('Code')

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Code':
        return <div className="p-4 text-gray-800">🧠 Code view (files will be shown here)</div>
      case 'Preview':
        return <div className="p-4 text-gray-800">👁 Code execution preview will go here</div>
      case 'Configure':
        return <div className="p-4 text-gray-800">⚙️ Configuration logs/details</div>
      case 'Insights':
        return <div className="p-4 text-gray-800">📈 System insights / analysis output</div>
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