import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { default as BaseApp } from './steps/base'

function App(): React.JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/base" element={<BaseApp />} />
        <Route path="/" element={<Navigate to="/base" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
