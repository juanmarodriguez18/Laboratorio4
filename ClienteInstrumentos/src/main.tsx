import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App.tsx'
import ListaInstrumentos from './componentes/ListaInstrumentos.tsx'
import DetalleInstrumento from './componentes/DetalleInstrumento.tsx'
import Home from './componentes/Home.tsx'
import DondeEstamos from './componentes/DondeEstamos.tsx'
import Productos from './componentes/Productos.tsx'
import InstrumentoFormulario from './componentes/InstrumentoForm.tsx'
import GrillaInstrumentos from './componentes/GrillaInstrumentos.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route index element={<ListaInstrumentos />} />
      <Route path="/instrumentos" element={<ListaInstrumentos />} />
      <Route path="/instrumento/:id" element={<DetalleInstrumento />} />
      <Route path="/home" element={<Home />} />
      <Route path="/dondeestamos" element={<DondeEstamos />} />
      <Route path="/productos" element={<Productos />} />
      <Route path="/formulario/:instrumento_id" element={<InstrumentoFormulario />}/>
      <Route path="/grilla" element={<GrillaInstrumentos />}/>
      <Route path="/app" element={<App />} />
      <Route path="*" element={<ListaInstrumentos />} />
    </Routes>
  </BrowserRouter>
  </React.StrictMode>,
)
