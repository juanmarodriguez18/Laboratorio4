import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Encabezado from './componentes/Encabezado';
import Login from './componentes/Login';
import Register from './componentes/Register';
import { Carrito } from './componentes/Carrito';
import { RutaPrivada } from './controlAcceso/RutaPrivada';
import Home from './componentes/Home';
import DondeEstamos from './componentes/DondeEstamos';
import RolUsuario from './controlAcceso/RolUsuario';
import { Roles } from './entidades/Roles';


const Productos = lazy(() => import('./componentes/Productos'));
const ListaInstrumentos = lazy(() => import('./componentes/ListaInstrumentos'));
const DetalleInstrumento = lazy(() => import('./componentes/DetalleInstrumento'));
const InstrumentoFormulario = lazy(() => import('./componentes/InstrumentoForm'));
const GrillaInstrumentos = lazy(() => import('./componentes/GrillaInstrumentos'));

function App() {
    return (

        <div>
            <Encabezado />
            <main>
                <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        <Route index element={<Home />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/dondeestamos" element={<DondeEstamos />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/carrito" element={<RutaPrivada><Carrito /></RutaPrivada>} />

                        <Route path="/instrumentos" element={<RutaPrivada><ListaInstrumentos /></RutaPrivada>} />
                        <Route path="/instrumento/:id" element={<RutaPrivada><DetalleInstrumento /></RutaPrivada>} />
                        <Route path="/productos" element={<RutaPrivada><Productos /></RutaPrivada>} />
                        <Route path="/formulario/:instrumento_id" element={<RutaPrivada><InstrumentoFormulario /></RutaPrivada>} />

                        <Route element={<RolUsuario rol={[Roles.ADMIN, Roles.OPERADOR]} />}>
                            <Route path="/grilla" element={<RutaPrivada><GrillaInstrumentos /></RutaPrivada>} />
                        </Route>

                        {/* Ruta por defecto si no coincide ninguna */}
                        <Route path="*" element={<Home />} />
                    </Routes>
                </Suspense>
            </main>
        </div>

    );
}

export default App;
