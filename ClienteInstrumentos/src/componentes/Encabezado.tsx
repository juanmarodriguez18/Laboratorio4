import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../context/CarritoContext';
import carritoIcono from '../../img/carrito-icono.png';

function Encabezado() {
  const { cart } = useContext(CartContext);

  const totalItemsEnCarrito = cart.reduce((total, item) => total + item.cantidad, 0);

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
          <Link className="nav-link" to="/productos">Productos</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/grilla">Grilla</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/carrito">
            <img src={carritoIcono} alt="Carrito" style={{ width: '24px', height: '24px', marginRight: '5px' }} />
            Carrito ({totalItemsEnCarrito})
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Encabezado;

