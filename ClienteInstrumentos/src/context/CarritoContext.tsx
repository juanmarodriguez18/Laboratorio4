import { ReactNode, createContext, useEffect, useState } from 'react';
import Instrumento from '../entidades/Instrumento';

interface CartItem {
  instrumento: Instrumento;
  cantidad: number;
}

// Definimos el tipo de dato que se almacenará en el contexto del carrito
interface CartContextType {
  cart: CartItem[];
  addCarrito: (product: Instrumento) => void;
  removeCarrito: (product: Instrumento) => void;
  removeItemCarrito: (product: Instrumento) => void;
  limpiarCarrito: () => void;
  updateCarrito: (instrumento: Instrumento, cantidad: number) => void;
  totalPedido?: number;
}

// Crear contexto
export const CartContext = createContext<CartContextType>({
  cart: [],
  addCarrito: () => {},
  removeCarrito: () => {},
  removeItemCarrito: () => {},
  limpiarCarrito: () => {},
  updateCarrito: () => {},
  totalPedido: 0
});

// Crear provider, encargado de proveer acceso al contexto
export function CarritoContextProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [totalPedido, setTotalPedido] = useState<number>(0);

  // Cargar el carrito desde localStorage una vez cuando el componente se monta
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Actualizar localStorage y recalcular el total cuando el carrito cambie
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    calcularTotalCarrito();
  }, [cart]);

  const addCarrito = (product: Instrumento) => {
    const existingItemIndex = cart.findIndex(item => item.instrumento.instrumento_id === product.instrumento_id);
    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].cantidad += 1;
      setCart(updatedCart);
    } else {
      setCart(prevCart => [...prevCart, { instrumento: product, cantidad: 1 }]);
    }
  };

  const updateCarrito = (instrumento: Instrumento, cantidad: number) => {
    setCart((prevCarrito) => {
      if (cantidad <= 0) {
        return prevCarrito.filter((item) => item.instrumento.instrumento_id !== instrumento.instrumento_id);
      }
      return prevCarrito.map((item) =>
        item.instrumento.instrumento_id === instrumento.instrumento_id ? { ...item, cantidad } : item
      );
    });
  };

  const removeCarrito = (product: Instrumento) => {
    setCart(prevCart => prevCart.filter(item => item.instrumento.instrumento_id !== product.instrumento_id));
  };

  const removeItemCarrito = (product: Instrumento) => {
    const existingItem = cart.find(item => item.instrumento.instrumento_id === product.instrumento_id);
    if (existingItem) {
      if (existingItem.cantidad > 1) {
        const updatedCart = cart.map(item => {
          if (item.instrumento.instrumento_id === product.instrumento_id) {
            return { ...item, cantidad: item.cantidad - 1 };
          }
          return item;
        });
        setCart(updatedCart);
      } else {
        setCart(prevCart => prevCart.filter(item => item.instrumento.instrumento_id !== product.instrumento_id));
      }
    }
  };

  const limpiarCarrito = () => {
    setCart([]);
  };

  const calcularTotalCarrito = () => {
    let total = 0;
    cart.forEach(item => {
      total += item.instrumento.precio * item.cantidad;
    });
    setTotalPedido(total);
  };

  return (
    <CartContext.Provider value={{ cart, addCarrito, updateCarrito, limpiarCarrito, removeCarrito, removeItemCarrito, totalPedido }}>
      {children}
    </CartContext.Provider>
  );
}
