import Instrumento from "./Instrumento";
import Pedido from "./Pedido";

export default class PedidoDetalle {
    id: number = 0;
    cantidad: number = 0;
    instrumento?: Instrumento;
    pedido?: Pedido;
}