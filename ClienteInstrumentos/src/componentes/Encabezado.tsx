import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import carritoIcono from '../../img/carrito-icono.png';
import { useAuth } from '../controlAcceso/AuthContext';

const Encabezado: React.FC = () => {
    const { isLoggedIn, usuario, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
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
                
                {isLoggedIn ? (
                    <>
                        <li className="nav-item">    
                          <Link className="nav-link" to="/productos">Productos</Link>                
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link" to="/grilla">Grilla</Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link" to="/carrito">
                            <img src={carritoIcono} alt="Carrito" style={{ width: '24px', height: '24px', marginRight: '5px' }} />
                              Carrito
                          </Link>
                        </li>
                        <li className="nav-item">
                            <span className="nav-link">Bienvenido {usuario?.nombreUsuario}</span>
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
