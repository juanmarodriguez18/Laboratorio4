import {  useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import ListaInstrumentos from './componentes/ListaInstrumentos';
import DetalleInstrumento from './componentes/DetalleInstrumento';
import Home from './componentes/Home';
import DondeEstamos from './componentes/DondeEstamos';
import Productos from './componentes/Productos';
import InstrumentoFormulario from './componentes/InstrumentoForm';
import GrillaInstrumentos from './componentes/GrillaInstrumentos';
import Encabezado from './componentes/Encabezado';
import Login from './componentes/Login';
import Register from './componentes/Register';
import { Carrito } from './componentes/Carrito';
import { RutaPrivada } from './controlAcceso/RutaPrivada';
import { login } from './servicios/authService';

function App() {
  const [usuarioLogueado, setUsuarioLogueado] = useState<any | null>(null);

  // Función para manejar el logout
  const handleLogout = () => {
    setUsuarioLogueado(null);
  };

  // Función para manejar el login
  const handleLogin = async (nombreUsuario: string, clave: string) => {
    try {
      const usuarioLogueado = await login(nombreUsuario, clave);
      setUsuarioLogueado(usuarioLogueado);
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw new Error('Usuario y/o Clave incorrectos, vuelva a intentar');
    }
  };

  return (
    <>
      <Encabezado/>
      <main>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/dondeestamos" element={<DondeEstamos />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/app" element={<Login onLogin={handleLogin} />} />
          <Route path="*" element={<Login onLogin={handleLogin} />} />

          <Route path="/instrumentos" element={<RutaPrivada><ListaInstrumentos /></RutaPrivada>} />
          <Route path="/instrumento/:id" element={<RutaPrivada><DetalleInstrumento /></RutaPrivada>} />
          <Route path="/productos" element={<RutaPrivada><Productos /></RutaPrivada>} />
          <Route path="/formulario/:instrumento_id" element={<RutaPrivada><InstrumentoFormulario /></RutaPrivada>} />
          <Route path="/grilla" element={<RutaPrivada><GrillaInstrumentos /></RutaPrivada>} />
          <Route path="/carrito" element={<RutaPrivada><Carrito /></RutaPrivada>} />
        </Routes>
      </main>
    </>
  );
}

export default App;
