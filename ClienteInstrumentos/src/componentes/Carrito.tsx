import React from 'react';
import Instrumento from '../entidades/Instrumento.ts';
import PedidoDetalle from '../entidades/PedidoDetalle.ts';
import { useCarrito } from '../hooks/useCarrito.tsx';
import { guardarPedidoEnBD, recuperarIdPedido } from '../servicios/FuncionesInstrumento.ts';
import './css/Carrito.css';

interface CartItemProps {
  instrumento: Instrumento;
  cantidad: number;
  onRemove: () => void;
}

function CartItem({ instrumento, cantidad, onRemove }: CartItemProps) {
  return (
    <div className="cart-item" key={instrumento.instrumento_id}>
      <img width={50} height={50} src={instrumento.imagen} alt={instrumento.instrumento} />
      <div className="cart-item-info">
        <strong>{instrumento.instrumento}</strong> - ${instrumento.precio}
        <div>
          <b>{cantidad} {cantidad === 1 ? 'unidad' : 'unidades'} </b>
        </div>
      </div>
      <button className="eliminar" onClick={onRemove}>Eliminar</button>
      <hr />
    </div>
  );
}

export function Carrito() {
  const { cart, removeCarrito, limpiarCarrito, totalPedido } = useCarrito();

  const mostrarCarritoJSON = () => {
    console.log(cart);
  };

  const confirmarCompra = async () => {
    if (cart.length === 0) {
      alert('El carrito está vacío. Por favor, añade productos antes de confirmar la compra.');
      return;
    }

    try {
      // Guardar el pedido
      await guardarPedidoEnBD(cart as PedidoDetalle[]);

      // Obtener el ID del último pedido guardado
      const pedidoId = await recuperarIdPedido();

      // Mostrar el mensaje de éxito con el ID del pedido
      alert(`El pedido con id: ${pedidoId} se guardó correctamente.`);

      // Limpiar el carrito después de confirmar la compra
      limpiarCarrito();
    } catch (error) {
      console.error('Error al confirmar la compra:', error);
      alert('Ocurrió un error al confirmar la compra. Inténtalo de nuevo más tarde.');
    }
  };

  return (
    <>
      <aside className='cart'>
        <ul>
          {cart.map(({ instrumento, cantidad }) => (
            <CartItem
              key={instrumento.instrumento_id}
              instrumento={instrumento}
              cantidad={cantidad}
              onRemove={() => removeCarrito(instrumento)}
            />
          ))}
        </ul>
        <div>
          <h3>Total Pedido: ${totalPedido}</h3>
        </div>
        <button className="limpiar" onClick={limpiarCarrito} title='Limpiar Todo'>
          <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' strokeWidth='1' stroke='currentColor' fill='none' strokeLinecap='round' strokeLinejoin='round'>
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0' />
            <path d='M17 17a2 2 0 1 0 2 2' />
            <path d='M17 17h-11v-11' />
            <path d='M9.239 5.231l10.761 .769l-1 7h-2m-4 0h-7' />
            <path d='M3 3l18 18' />
          </svg>
          Limpiar Carrito
        </button>
        <br />
        <button className="mostrarJson" onClick={mostrarCarritoJSON}>
          Mostrar Cart Json
        </button>
        <br />
        <button className="confirmar" onClick={confirmarCompra}>
          Confirmar Compra
        </button>
      </aside>
    </>
  );
}
