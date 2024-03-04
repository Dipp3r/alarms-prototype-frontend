import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import MainContent from './pages/MainContent.tsx'
import InputColPage from './pages/InputColPage.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <InputColPage></InputColPage>
    {/* <MainContent /> */}
  </React.StrictMode>,
)
