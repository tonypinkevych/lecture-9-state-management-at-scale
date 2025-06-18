import React, { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
}

export const Container: React.FC<ContainerProps> = ({ children }) => (
  <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex flex-col items-center justify-center p-4">
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 w-full max-w-lg border border-white/20">
      {children}
    </div>
  </div>
)
