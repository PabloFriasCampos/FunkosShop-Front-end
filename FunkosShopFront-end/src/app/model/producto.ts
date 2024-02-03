export class Producto {

  productoID: number;
  nombreProducto: string;
  precioEUR: number;
  descripcion: string;
  categoria: string;
  Stock: number;

  constructor(productoID: number, nombreProducto: string, precioEUR: number, descripcion: string, categoria: string, stock: number) {
    this.productoID = productoID;
    this.nombreProducto = nombreProducto;
    this.precioEUR = precioEUR;
    this.descripcion = descripcion;
    this.categoria = categoria;
    this.Stock = stock;
  }

}
