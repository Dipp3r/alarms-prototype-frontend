import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainContent from './pages/MainContent.tsx'
import InputColPage from './pages/InputColPage.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route  path="/" element={<InputColPage/>} />
        <Route path="/home" element={<MainContent/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
