import { Producto } from "./producto";

export class CategoriaProductos {

  categoria: string;
  productos: Producto[]

  constructor(categoria: string, productos: Producto[]) {
    this.categoria = categoria;
    this.productos = productos;

  }

}
