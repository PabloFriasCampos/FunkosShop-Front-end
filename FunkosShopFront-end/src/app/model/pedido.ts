import { ProductoCarrito } from "./producto-carrito";

export class Pedido {

  pedidoID: number = 0;
  fechaPedido: string = '';
  totalPedidoEUR: number = 0;
  totalPedidoETH: number = 0;
  listaProductosPedido: ProductoCarrito[] = []

}
