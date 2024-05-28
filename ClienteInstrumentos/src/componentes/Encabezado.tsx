import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
 // Importamos el hook useAuth
import { CartContext } from '../context/CarritoContext';
import carritoIcono from '../../img/carrito-icono.png';
import { RutaPrivada } from '../controlAcceso/RutaPrivada';
import { useAuth } from '../controlAcceso/AuthContext';

interface Usuario {
  nombreUsuario: string;
}

const Encabezado: React.FC = () => {
  const { cart } = useContext(CartContext);
  const totalItemsEnCarrito = cart.reduce((total, item) => total + item.cantidad, 0);
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth(); // Usamos el hook useAuth

  const handleLogout = () => {
    // Llamamos a la función logout del contexto de autenticación
    logout();
    navigate('/login');
  };

  return (
    <div className="detalle-header">
      <ul className="nav tabs detalle-header-tabs">
        <li className="nav-item">
          <Link className="nav-link" to="/home">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/dondeestamos">Donde Estamos</Link>
        </li>
        <li className="nav-item">
          <RutaPrivada>
            <Link className="nav-link" to="/productos">Productos</Link>
          </RutaPrivada>
        </li>
        <li className="nav-item">
          <RutaPrivada>
            <Link className="nav-link" to="/grilla">Grilla</Link>
          </RutaPrivada>
        </li>
        <li className="nav-item">
          <RutaPrivada>
            <Link className="nav-link" to="/carrito">
              <img src={carritoIcono} alt="Carrito" style={{ width: '24px', height: '24px', marginRight: '5px' }} />
              Carrito ({totalItemsEnCarrito})
            </Link>
          </RutaPrivada>
        </li>
        {isLoggedIn ? (
          <>
            <li className="nav-item">
              <span className="nav-link">Bienvenido {localStorage.getItem('usuario')}</span>
            </li>
            <li className="nav-item">
              <button className="nav-link btn-link" onClick={handleLogout}>Cerrar sesión</button>
            </li>
          </>
        ) : (
          <>
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">Registrarse</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Encabezado;
