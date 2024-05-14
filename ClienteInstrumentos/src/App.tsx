import { Route, Routes } from 'react-router-dom';
import ListaInstrumentos from './componentes/ListaInstrumentos';
import DetalleInstrumento from './componentes/DetalleInstrumento';
import Home from './componentes/Home';
import DondeEstamos from './componentes/DondeEstamos';
import Productos from './componentes/Productos';
import InstrumentoFormulario from './componentes/InstrumentoForm';
import GrillaInstrumentos from './componentes/GrillaInstrumentos';
import { Carrito } from './componentes/Carrito';
import Encabezado from './componentes/Encabezado';

function App() {
  return (
    <>
      <Encabezado />
      <main>
        <Routes>
          <Route index element={<ListaInstrumentos />} />
          <Route path="/instrumentos" element={<ListaInstrumentos />} />
          <Route path="/instrumento/:id" element={<DetalleInstrumento />} />
          <Route path="/home" element={<Home />} />
          <Route path="/dondeestamos" element={<DondeEstamos />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/formulario/:instrumento_id" element={<InstrumentoFormulario />} />
          <Route path="/grilla" element={<GrillaInstrumentos />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/app" element={<ListaInstrumentos />} />
          <Route path="*" element={<ListaInstrumentos />} />
        </Routes>
      </main>
    </>
  );
}

export default App;

