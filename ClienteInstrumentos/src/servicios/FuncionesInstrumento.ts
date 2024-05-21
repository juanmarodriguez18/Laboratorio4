import Instrumento from "../entidades/Instrumento";
import CategoriaInstrumento from '../entidades/CategoriaInstrumento';
import PedidoDetalle from "../entidades/PedidoDetalle";
import Pedido from "../entidades/Pedido";

const urlServer = 'http://localhost:8080/instrumentos';
const urlCategorias = 'http://localhost:8080/categorias';
const urlPedidos = 'http://localhost:8080/guardar-pedido';
const urlUltimoPedido = 'http://localhost:8080/pedidos/ultimo';

export async function getInstrumentosJSONFetch(): Promise<Instrumento[]> {
    try {
        const response = await fetch(urlServer, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            mode: 'cors'
        });
        if (!response.ok) {
            throw new Error('Error al obtener la lista de instrumentos');
        }
        return await response.json();
    } catch (error) {
        console.error('Error en getInstrumentosJSONFetch:', error);
        throw new Error('Error al obtener la lista de instrumentos. Por favor, inténtalo de nuevo más tarde.');
    }
}

// Función para obtener todas las categorías desde el backend
export async function getCategorias(): Promise<CategoriaInstrumento[]> {
    try {
        const response = await fetch(urlCategorias, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            mode: 'cors'
        });
        if (!response.ok) {
            throw new Error('Error al obtener la lista de categorías');
        }
        const categorias = await response.json();
        
        // Devuelve directamente los datos recibidos
        return categorias;
    } catch (error) {
        console.error('Error en getCategorias:', error);
        throw new Error('Error al obtener la lista de categorías. Por favor, inténtalo de nuevo más tarde.');
    }
}

export async function getInstrumentoByIdFetch(id: number): Promise<Instrumento> {
    const urlInstrumento = `${urlServer}/${id}`;
    try {
        const response = await fetch(urlInstrumento, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            mode: 'cors'
        });
        if (!response.ok) {
            throw new Error('Error al obtener los detalles del instrumento');
        }
        return await response.json();
    } catch (error) {
        console.error('Error en getInstrumentoByIdFetch:', error);
        throw new Error('Error al obtener los detalles del instrumento. Por favor, inténtalo de nuevo más tarde.');
    }
}

export async function crearInstrumento(instrumento: Instrumento): Promise<void> {
    try {
        const response = await fetch(urlServer, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(instrumento)
        });
        if (!response.ok) {
            throw new Error('Error al crear el instrumento');
        }
    } catch (error) {
        console.error('Error en crearInstrumento:', error);
        throw new Error('Error al crear el instrumento. Por favor, inténtalo de nuevo más tarde.');
    }
}

export async function actualizarInstrumento(instrumento: Instrumento): Promise<void> {
    const urlInstrumento = `${urlServer}/${instrumento.instrumento_id}`;
    try {
        const response = await fetch(urlInstrumento, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(instrumento)
        });
        if (!response.ok) {
            throw new Error('Error al actualizar el instrumento');
        }
    } catch (error) {
        console.error('Error en actualizarInstrumento:', error);
        throw new Error('Error al actualizar el instrumento. Por favor, inténtalo de nuevo más tarde.');
    }
}

export async function borrarInstrumento(id: number): Promise<void> {
    const urlInstrumento = `${urlServer}/${id}`;
    try {
        const response = await fetch(urlInstrumento, {
            method: 'DELETE',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        });
        if (!response.ok) {
            throw new Error('Error al borrar el instrumento');
        }
    } catch (error) {
        console.error('Error en borrarInstrumento:', error);
        throw new Error('Error al borrar el instrumento. Por favor, inténtalo de nuevo más tarde.');
    }
}

// Función para guardar un pedido en la base de datos
export async function guardarPedidoEnBD(detallesPedido: PedidoDetalle[]): Promise<void> {
    try {
        const response = await fetch(urlPedidos, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(detallesPedido) // Enviar directamente el array de PedidoDetalle
        });
        if (!response.ok) {
            throw new Error('Error al guardar el pedido');
        }
    } catch (error) {
        console.error('Error en guardarPedidoEnBD:', error);
        throw new Error('Error al guardar el pedido. Por favor, inténtalo de nuevo más tarde.');
    }
}

// Función para obtener el id del último pedido
export async function recuperarIdPedido(): Promise<number> {
    try {
        const response = await fetch(urlUltimoPedido, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });

        if (!response.ok) {
            throw new Error('Error al recuperar el último pedido');
        }

        // Procesar la respuesta del servidor
        const responseData = await response.json();

        // Verificar si la respuesta contiene el ID del último pedido
        if (!responseData.hasOwnProperty('id')) {
            throw new Error('El servidor no devolvió el ID del último pedido');
        }

        // Extraer el ID del último pedido de la respuesta
        const ultimoPedidoId = responseData.id;

        // Devolver el ID del último pedido
        return ultimoPedidoId;
    } catch (error) {
        console.error('Error en recuperarIdPedido:', error);
        throw new Error('Error al recuperar el ID del último pedido. Por favor, inténtalo de nuevo más tarde.');
    }
}

export async function createPreferenceMP(pedido: Pedido) {
    const response = await fetch('http://localhost:8080/create-preference-mp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(pedido),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    return data;
}

export async function getPreferenceMP(pedido: Pedido) {
    try {
        const preference = await createPreferenceMP(pedido);
        console.log(preference);
    } catch (error) {
        console.error('Error creating preference:', error);
    }
}





