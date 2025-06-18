import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { default as BaseApp } from './steps/1-base'
import { default as ContextApp } from './steps/2-context'
import { default as ZustandApp } from './steps/3-zustand'
import { default as RtkApp } from './steps/4-rtk'

function App(): React.JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/base" element={<BaseApp />} />
        <Route path="/context" element={<ContextApp />} />
        <Route path="/zustand" element={<ZustandApp />} />
        <Route path="/rtk" element={<RtkApp />} />
        <Route path="/" element={<Navigate to="/base" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
