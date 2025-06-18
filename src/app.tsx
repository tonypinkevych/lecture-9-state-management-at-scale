import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { default as BaseApp } from './steps/base'
import { default as ContextApp } from './steps/context'
import { default as ZustandApp } from './steps/zustand'

function App(): React.JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/base" element={<BaseApp />} />
        <Route path="/context" element={<ContextApp />} />
        <Route path="/zustand" element={<ZustandApp />} />
        <Route path="/" element={<Navigate to="/base" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
