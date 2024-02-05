export class Producto {

  productoId: number;
  nombreProducto: string;
  precioEUR: number;
  descripcion: string;
  categoria: string;
  stock: number;

  constructor(productoId: number, nombreProducto: string, precioEUR: number, descripcion: string, categoria: string, stock: number) {
    this.productoId = productoId;
    this.nombreProducto = nombreProducto;
    this.precioEUR = precioEUR;
    this.descripcion = descripcion;
    this.categoria = categoria;
    this.stock = stock;
  }

}